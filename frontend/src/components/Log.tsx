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
        <div key={index} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10vw' }}>
            <strong>{msg.user}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '10vw' }}>
            <strong>{msg.bot}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Log;
