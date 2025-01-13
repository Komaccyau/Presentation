// Chat.tsx
import React, { useState } from 'react';
import Input from './Input';
import Log from './Log';
import Options from './Options';
import { Box } from '@mui/material';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [useDummyApi, setUseDummyApi] = useState(false); // ダミーAPIを使用するかの状態管理

  const handleSendMessage = async (message: string) => {
    const botReply = await fetchBotResponse(message);
    setMessages(prevMessages => [...prevMessages, { user: message, bot: botReply }]);
  };

  const fetchBotResponse = async (message: string) => {
    try {
      const endpoint = useDummyApi ? 'http://localhost:5000/dummy' : 'http://localhost:5000/chat'; // 使用するAPIを選択
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: message }),
      });

      const data = await response.json();
      return data.response || "エラーが発生しました。"; // ダミーAPIの応答を処理
    } catch {
      return "通信エラーが発生しました。"; // エラーハンドリングの追加
    }
  };

  const toggleApiUsage = () => {
    setUseDummyApi(prev => !prev); // ダミーAPIの使用を切り替える
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
      <Box sx={{ paddingBottom: '1vh' , backgroundColor: 'white'}}>
        <Options toggleApiUsage={toggleApiUsage} useDummyApi={useDummyApi} /> {/* オプションにAPI選択機能を追加 */}
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
