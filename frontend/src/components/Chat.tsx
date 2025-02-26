import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
import './Chat.css'
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Chat: React.FC = () => {
  const location = useLocation();
  const { level } = location.state; // Start.tsxから渡されたレベルを取得
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSendMessage = async (message: string) => {
    const botReply = await fetchBotResponse(message);
    setMessages(prevMessages => [...prevMessages, { user: message, bot: botReply }]);
  };

  const fetchBotResponse = async (message: string) => {
    const endpoint = 'http://127.0.0.1:5000/chat'; // バックエンドのチャットエンドポイントを修正

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: message, // ユーザーの入力
                level: level, // 選択されたレベルを含める
            }),
        });

        // ステータスコードを確認
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})); // ここでエラー時のデフォルト値を設定
            console.error('Backend error:', errorData); // バックエンドのエラーをコンソールに出力
            return `エラーが発生しました: ${errorData.error || '不明なエラー'}`; // エラーメッセージを返す
        }

        const data = await response.json();
        if (data.answer) {
            return `${data.answer}`; // フォーマットされた応答を返す
        } else {
            console.warn('Unexpected response format:', data); // 予期しないレスポンス形式の警告
            return "エラーが発生しました。"; // エラーハンドリング
        }
    } catch (error) {
        console.error('Fetch error:', error); // 通信エラーをコンソールに出力
        return "通信エラーが発生しました。"; // 通信エラーのハンドリング
    }
  };

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw',
    }}>
      <Box className="log-color" sx={{ flex: 1, overflowY: 'auto' }}>
        <Log messages={messages} />
      </Box>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'auto',
        width: '100%',
      }}>
        <Box className="input-color" sx={{ width: '80vw', marginTop: '2vh', marginBottom: '2vh' }}>
          <Input onSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
