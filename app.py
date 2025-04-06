from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

# Load API key from .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Flask app
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{"parts": [{"text": user_input}]}]
    }

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

    try:
        response = requests.post(gemini_url, json=payload, headers=headers)
        result = response.json()
        reply = result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print("Error:", e)
        reply = "Sorry, I couldn't understand that."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
