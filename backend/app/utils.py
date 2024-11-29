# utils.py

def generate_choices(prompt):
    """
    質問に基づいて選択肢を生成します。
    
    Args:
        prompt (str): ユーザーからの入力や質問のプロンプト。
        
    Returns:
        list: 生成された選択肢のリスト。
    """
    choices = [
        f"{prompt}の選択肢1",
        f"{prompt}の選択肢2"
    ]
    return choices

def format_response(data):
    """
    レスポンスを整形するための関数。
    
    Args:
        data (any): 整形したいデータ。
        
    Returns:
        dict: 整形されたレスポンス。
    """
    return {
        "status": "success",
        "data": data
    }

def handle_error(error):
    """
    エラーハンドリング用の関数。
    
    Args:
        error (Exception): 発生したエラー。
        
    Returns:
        dict: エラーに関する情報を含むレスポンス。
    """
    return {
        "status": "error",
        "message": str(error)
    }
