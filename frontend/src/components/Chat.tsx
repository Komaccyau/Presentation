// Chat.tsx
import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
import Options from './Options'
import { Box } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSendMessage = async (message: string) => {
    const botReply = await fetchBotResponse(message);
    setMessages([...messages, { user: message, bot: botReply }]);
  };

  const fetchBotResponse = async (message: string) => {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    });
    
    const data = await response.json();
    if (data.status === "success") {
      return data.data; // 成功時のボットの応答
    } else {
      return "エラーが発生しました。"; // エラー時のメッセージ
    }
  };

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw',
      position: 'relative' // 位置を相対的にする
    }}>
      <Box sx={{ flex: 1, overflowY: 'auto', backgroundColor: '#e6e6fa' }}>
        <Log messages={messages} />
      </Box>
      <Box>
        <Options />
      </Box>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center', // 中央に配置
        marginTop: 'auto',
        width: '100%', // 幅を100%に設定
      }}>
        <Box sx={{ width: '80vw' , marginBottom: '2vh' }}> {/* Inputの幅を指定 */}
          <Input onSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
