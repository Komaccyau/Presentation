# api.py
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# Gemini APIのエンドポイント
GEMINI_API_URL = "https://api.gemini.com/v1/your_endpoint"  # エンドポイントは適宜変更してください

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')
    bot_response = get_bot_response(user_input)
    return jsonify({'response': bot_response})

def get_bot_response(user_input):
    # Gemini APIを使ってボットの返答を取得
    payload = {
        "input": user_input
    }
    response = requests.post(GEMINI_API_URL, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        return data['response']  # APIのレスポンスから返答を取得
    else:
        return "ボットの応答を取得できませんでした。"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
