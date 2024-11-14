# __init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # CORSを有効にする

    # モジュールのインポート
    from .api import api_bp
    app.register_blueprint(api_bp)

    return app
