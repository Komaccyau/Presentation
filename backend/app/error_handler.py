# error_handler.py
from flask import jsonify

def handle_error(error):
    return jsonify({"error": str(error)}), 500
