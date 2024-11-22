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
          <strong>あなた:</strong> {msg.user}
          <br />
          <strong>ボット:</strong> {msg.bot}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Log;
