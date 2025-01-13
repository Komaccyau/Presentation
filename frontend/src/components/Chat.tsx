// Chat.tsx
import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
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
    const endpoint = 'http://localhost:5000/chat'; // バックエンドのチャットエンドポイント

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

      const data = await response.json();
      if (data.reply) {
        return `${data.reply}\n\n返信の返信①: ${data.follow_up_1}\n返信の返信②: ${data.follow_up_2}`; // フォーマットされた応答を返す
      } else {
        return "エラーが発生しました。"; // エラーハンドリング
      }
    } catch {
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
      <Box sx={{ flex: 1, overflowY: 'auto', backgroundColor: '#e6e6fa' }}>
        <Log messages={messages} />
      </Box>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'auto',
        width: '100%',
      }}>
        <Box sx={{ width: '80vw', marginBottom: '2vh' }}>
          <Input onSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
