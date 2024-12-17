// Input.tsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import './Input.css';

interface InputProps {
  onSendMessage: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const startVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // 英語を設定
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSubmit(new Event('submit')); // 音声入力後にメッセージを送信
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };
    recognition.start();
  };

  return (
    <form className='input_message' onSubmit={handleSubmit}>
      <Button variant="contained" color="secondary" onClick={startVoiceInput} style={{ marginRight: '8px' }}>
        <KeyboardVoiceIcon />
      </Button>
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
