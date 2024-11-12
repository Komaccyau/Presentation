// Chat.tsx
import React, { useState } from 'react';
import Input from '../components/Input';
import Log from '../components/Log';
import { Box } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

  const handleSendMessage = (message: string) => {
    const botReply = `あなたのメッセージは「${message}」ですね。`; // サンプルのボットの返答
    setMessages([...messages, { user: message, bot: botReply }]);
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
