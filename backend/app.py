import tornado
import tornado.websocket
import asyncio
import os
import json

static_path = os.path.join(os.path.dirname(__file__), "static")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open(f"{static_path}/index.html", "r").read())

class MessageSocketHandler(tornado.websocket.WebSocketHandler):
    clients = set()
    backlog = []

    def open(self):
        MessageSocketHandler.clients.add(self)
        print("WEBSOCKET OPENED")

    def on_message(self, message):
        print("RECEIVED MESSAGE:", message)
        if message == "get_backlog":
            print("SENDING BACKLOG")
            for msg in MessageSocketHandler.backlog:
                self.write_message({ "backlog": MessageSocketHandler.backlog })
            return

        try:
            command = json.loads(message)
        except:
            return

        if "nickname" in command and "message" in command:
            if len(command["nickname"]) == 0 or len(command["message"]) == 0:
                return

            msg = { "nickname": command["nickname"], "message": command["message"] }
            MessageSocketHandler.backlog.append(msg)
            MessageSocketHandler.send_message(msg)

    def on_close(self):
        MessageSocketHandler.clients.remove(self)
        print("WEBSOCKET CLOSED")

    @staticmethod
    def send_message(message):
        for client in MessageSocketHandler.clients:
            client.write_message(message)

def make_app():
    return tornado.web.Application([
        (r"/api/websocket", MessageSocketHandler),
        (r"/(assets/.*)", tornado.web.StaticFileHandler, dict(path=static_path)),
        (r"/.*", IndexHandler)
    ])

async def main():
    app = make_app()
    app.listen(5000)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
