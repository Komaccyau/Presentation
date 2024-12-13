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
          {msg.user} <strong>:あなた</strong>
          <br />
          <strong>ボット:</strong> {msg.bot}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Log;
