# config.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

# .envファイルの読み込み
load_dotenv()

# API-KEYの設定
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

gemini_pro = genai.GenerativeModel("gemini-pro")
prompt = "英語で返答をして、さらにその返答の返答を2種類考えて"
response = gemini_pro.generate_content(prompt)
print(response.text)

GEMINI_API_URL = os.getenv('GEMINI_API_URL', 'https://api.gemini.com/v1/your_endpoint')
