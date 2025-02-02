// Start.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Start.css';

const Start: React.FC = () => {
  const [level, setLevel] = useState('日常会話レベル'); // 初期値を設定
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/chat', { state: { level } }); // 選択したレベルをチャット画面に渡す
  };

  return (
    <div className="start-container">
      <h1>　　　　　　　　　　へ ようこそ！</h1>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>英語レベルを選択</InputLabel>
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          label="英語レベルを選択"
        >
          <MenuItem value="中学英語レベル">中学英語レベル</MenuItem>
          <MenuItem value="高校英語レベル">高校英語レベル</MenuItem>
          <MenuItem value="大学英語レベル">大学英語レベル</MenuItem>
          <MenuItem value="日常会話レベル">日常会話レベル</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleStart}>
        Let's Start
      </Button>
    </div>
  );
};

export default Start;
