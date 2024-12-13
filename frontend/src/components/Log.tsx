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
        <div key={index}>
          {msg.user} <strong className='chat'>:あなた</strong>
          <br />
          <br />
          <strong className='chat'>ボット:</strong> {msg.bot}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Log;
