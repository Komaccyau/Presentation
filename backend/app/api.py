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
        return jsonify({"error": str(e)}), 500  # エラーメッセージを返す


def get_bot_response(user_input, level):
    # プロンプトを設定
    prompt = (
        f"You are a helpful assistant. "
        f"Please respond to the following question in English: {user_input} "
        f"Then, provide two possible follow-up responses that could continue the conversation."
    )

    # Gemini APIを使ってボットの返答を取得
    response = gemini_pro.generate_content(prompt)  # プロンプトを使って応答を生成

    if response:
        return format_response_data(response.text)  # フォーマットされたデータを返す
    else:
        return "Failed to retrieve bot response."

def format_response_data(response_text):
    # 返答を分割して、返信とその返信の返信を取得します
    responses = response_text.split("\n")  # 改行で分割と仮定
    reply = responses[0] if len(responses) > 0 else "No reply."
    follow_up_1 = responses[1] if len(responses) > 1 else "No follow-up response 1."
    follow_up_2 = responses[2] if len(responses) > 2 else "No follow-up response 2."

    formatted_response = {
        "reply": reply,
        "follow_up_1": follow_up_1,
        "follow_up_2": follow_up_2
    }
    
    return formatted_response
