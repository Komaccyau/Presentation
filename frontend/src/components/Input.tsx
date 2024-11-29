// Input.tsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './Input.css';

interface InputProps {
  onSendMessage: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className='input_message' onSubmit={handleSubmit}>
      <TextField
        label="メッセージを入力"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '8px' }}>
        送信
      </Button>
    </form>
  );
};

export default Input;
