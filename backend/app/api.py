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
        f"English Conversation Application. Have a conversation with {level}. Answer to {user_input} in English. Also, give an example of a response to the {user_input}."
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
    follow_up = responses[1] if len(responses) > 1 else "No follow-up response."  # フォローアップレスポンスを1つに変更

    formatted_response = {
        "answer": answer,  # user_inputに対する返答を設定
        "follow_up": follow_up  # フォローアップレスポンスを1つに変更
    }
    
    return formatted_response
