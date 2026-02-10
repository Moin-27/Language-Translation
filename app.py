from flask import Flask, request, jsonify, send_file
import requests

app = Flask(__name__)

# ---------- Routes ----------
@app.route("/")
def home():
    return send_file("index.html")

@app.route("/style.css")
def style():
    return send_file("style.css")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data["text"]
    source = data["source"]
    target = data["target"]

    url = f"https://api.mymemory.translated.net/get?q={text}&langpair={source}|{target}"
    response = requests.get(url).json()

    translated = response["responseData"]["translatedText"]
    return jsonify({"translatedText": translated})

if __name__ == "__main__":
    app.run(debug=True)
