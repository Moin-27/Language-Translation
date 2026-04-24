from flask import Flask, request, jsonify, send_from_directory
from deep_translator import GoogleTranslator
import os

app = Flask(__name__, static_folder=".", static_url_path="")

# ---------- Cache for translations ----------
translation_cache = {}

# ---------- Routes ----------
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data["text"]
    source = data["source"]
    target = data["target"]

    # Check cache first — avoids repeated API calls for same text
    cache_key = f"{text}|{source}|{target}"
    if cache_key in translation_cache:
        return jsonify({"translatedText": translation_cache[cache_key]})

    try:
        translated = GoogleTranslator(source=source, target=target).translate(text)

        # Store in cache
        translation_cache[cache_key] = translated

        return jsonify({"translatedText": translated})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)