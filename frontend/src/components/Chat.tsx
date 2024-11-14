// Chat.tsx
import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
import { Box } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSendMessage = async (message: string) => {
    const botReply = await fetchBotResponse(message);
    setMessages([...messages, { user: message, bot: botReply }]);
  };

  const fetchBotResponse = async (message: string) => {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    });
    const data = await response.json();
    return data.response;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>チャット</h2>
      <Log messages={messages} />
      <Input onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default Chat;