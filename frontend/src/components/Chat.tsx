// Chat.tsx
import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
import Options from './Options';
import { Box } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSendMessage = async (message: string) => {
    const botReply = await fetchBotResponse(message);
    setMessages(prevMessages => [...prevMessages, { user: message, bot: botReply }]);
  };

  const fetchBotResponse = async (message: string) => {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: message }),
      });

      const data = await response.json();
      return data.status === "success" ? data.data : "エラーが発生しました。";
    } catch {
      return "通信エラーが発生しました。"; // エラーハンドリングの追加
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
      <Options />
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
