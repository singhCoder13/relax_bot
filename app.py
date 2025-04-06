from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("✅ Loaded Gemini API Key:", GEMINI_API_KEY)  # TEMPORARY DEBUG LINE

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/chat', methods=['POST'])
def get_gemini_reply():
    data = request.get_json()
    user_input = data.get('message')

    payload = {
        "contents": [{
            "parts": [{"text": user_input}]
        }]
    }

    try:
        response = requests.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}",
            headers={"Content-Type": "application/json"},
            json=payload
        )

        print("Gemini API Status Code:", response.status_code)
        print("Gemini API Response:", response.text)

        if response.ok:
            result = response.json()
            reply = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({'reply': reply})
        else:
            return jsonify({'reply': 'Error connecting to Gemini API'}), 500
    except Exception as e:
        print("Error calling Gemini API:", str(e))
        return jsonify({'reply': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
