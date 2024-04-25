from flask import Flask, send_file, send_from_directory

app = Flask("react-simple-chat")

@app.route("/assets/<path:path>", methods = ["GET", "POST"])
def assets(path):
    return send_from_directory("static/assets", path)

@app.route("/")
def index():
    return send_file("static/index.html")

@app.route("/<path:path>")
def webapp(path):
    return send_file("static/index.html")

app.run()
