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
        f"英会話アプリケーションです。\n"
        f"{level}に合わせた会話をしてください。\n"
        f"{user_input}に対する返答を英語で考えてください。\n"
        f"返答は教師の名前を含めず、具体的な内容を英語で答えてください。\n"
        f"また、返答に対する返答の例を英語で答えてください。"
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
    follow_up = responses[1] if len(responses) > 1 else "No follow-up response."

    formatted_response = {
        "answer": answer.strip(),  # 余分な空白を削除
        "follow_up": follow_up.strip()  # 余分な空白を削除
    }
    
    return formatted_response
