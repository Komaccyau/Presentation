// Start.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/chat');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>英語学習アプリへようこそ！</h1>
      <Button variant="contained" color="primary" onClick={handleStart}>
        スタート
      </Button>
    </div>
  );
};

export default Start;
