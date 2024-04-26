import tornado
import asyncio
import os

static_path = os.path.join(os.path.dirname(__file__), "static")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(open(f"{static_path}/index.html", "r").read())

def make_app():
    return tornado.web.Application([
        (r"/(assets/.*)", tornado.web.StaticFileHandler, dict(path=static_path)),
        (r"/.*", IndexHandler)
    ])

async def main():
    app = make_app()
    app.listen(5000)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
