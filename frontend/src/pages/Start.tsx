// Start.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Start.css';

const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/chat');
  };

  return (
    <div className="start-container">
      <h1>英会話アプリへようこそ！</h1>
      <Button variant="contained" color="primary" onClick={handleStart}>
        スタート
      </Button>
      {/* <div className='difficulty-level'>
        <Button variant="contained" color="primary">基礎知識レベル</Button>
        <Button variant="contained" color="primary">高校入試レベル</Button>
        <Button variant="contained" color="primary">大学入試レベル</Button>
      </div> */}
    </div>
  );
};

export default Start;
