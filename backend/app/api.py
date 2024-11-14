# api.py
from flask import Blueprint, request, jsonify
import requests
from .config import GEMINI_API_URL

api_bp = Blueprint('api', __name__)

@api_bp.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')
    if not user_input:
        return jsonify({"error": "Input is required"}), 400

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
        return data.get('response', "ボットの応答を取得できませんでした。")
    else:
        return "ボットの応答を取得できませんでした。"
