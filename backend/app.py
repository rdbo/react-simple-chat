import tornado
import tornado.websocket
import asyncio
import os

static_path = os.path.join(os.path.dirname(__file__), "static")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open(f"{static_path}/index.html", "r").read())

class MessageSocketHandler(tornado.websocket.WebSocketHandler):
    clients = set()

    def open(self):
        MessageSocketHandler.clients.add(self)
        print("WEBSOCKET OPENED")

    def on_message(self, message):
        print("RECEIVED MESSAGE:", message)
        if message == "get_backlog":
            self.write_message({ "nickname": 'h4xx0r', "message": 'you got h@xx0r3d n00b' })

    def on_close(self):
        MessageSocketHandler.clients.remove(self)
        print("WEBSOCKET CLOSED")

    @classmethod
    def send_message(clients, message):
        for client in clients:
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
