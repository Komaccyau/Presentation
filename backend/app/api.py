# api.py
from flask import Blueprint, request, jsonify
from .config import gemini_pro  # gemini_proをインポート
from .utils import format_response, handle_error

api_bp = Blueprint('api', __name__)

@api_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the chatbot API!"})

@api_bp.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')
    level = request.json.get('level')

    if not user_input:
        return jsonify({"error": "Input is required"}), 400

    try:
        bot_response = get_bot_response(user_input, level)
        return jsonify(bot_response)
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # エラーメッセージをログに出力
        return jsonify({"error": str(e)}), 500  # エラーメッセージを返す

def get_bot_response(user_input, level):
    # プロンプトを設定
    prompt = (
        f"You are an experienced English teacher from the UK who has been teaching English to Japanese people for 20 years. Please reply to {user_input} in English. Please reply with a topic that extends the conversation to make it easier for the user to send you another message. Please match the difficulty level of the conversation content to {level}."
    )

    # Gemini APIを使ってボットの返答を取得
    response = gemini_pro.generate_content(prompt)

    if response:
        return format_response_data(response.text)  # フォーマットされたデータを返す
    else:
        return {"error": "Failed to retrieve bot response."}

def format_response_data(response_text):
    # 返答を分割して、返信とその返信の返信を取得します
    responses = response_text.split("\n")  # 改行で分割と仮定
    answer = responses[0] if len(responses) > 0 else "No reply."
    

    formatted_response = {
        "answer": answer,  # user_inputに対する返答を設定
    }
    
    return formatted_response
