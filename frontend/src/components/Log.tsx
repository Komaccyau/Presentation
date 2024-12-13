// Log.tsx
import React from 'react';

interface Message {
  user: string;
  bot: string;
}

interface LogProps {
  messages: Message[];
}

const Log: React.FC<LogProps> = ({ messages }) => {
  return (
    <div className='log_message'>
      {messages.map((msg, index) => (
        <div className='chat_log' key={index}>
          <div className='input_log'>
            <strong>{msg.user}</strong>
          </div>
          <div className='bot_log'>
            <strong>{msg.bot}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Log;
