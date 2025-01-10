# api.py
from flask import Blueprint, request, jsonify
import requests
from .config import GEMINI_API_URL
from .utils import format_response, handle_error

api_bp = Blueprint('api', __name__)

@api_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the chatbot API!"})

@api_bp.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')
    level = request.json.get('level')  # レベルを取得
    if not user_input:
        return jsonify(handle_error("Input is required")), 400

    bot_response = get_bot_response(user_input, level)  # レベルを渡す
    return jsonify(format_response(bot_response))

@api_bp.route('/dummy', methods=['POST'])
def dummy_api():
    user_input = request.json.get('input')
    return jsonify({"response": "This is a dummy API."})

def get_bot_response(user_input, level):
    # Gemini APIを使ってボットの返答を取得
    payload = {
        "input": user_input,
        "level": level  # レベルをペイロードに追加
    }
    response = requests.post(GEMINI_API_URL, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        return format_response_data(data)  # フォーマットされたデータを返す
    else:
        return "Failed to retrieve bot response."

def format_response_data(data):
    question = data.get('question', "What is your question?")
    answer = data.get('answer', "I don't know the answer.")
    follow_up_1 = data.get('follow_up_1', "What do you think?")
    follow_up_2 = data.get('follow_up_2', "Can you elaborate on that?")

    formatted_response = {
        "question": question,
        "answer": answer,
        "follow_up_1": follow_up_1,
        "follow_up_2": follow_up_2
    }
    
    return formatted_response
