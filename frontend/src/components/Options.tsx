// Options.tsx
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const Options: React.FC = () => {
  const handleOptionClick = (option: string) => {
    // オプションボタンがクリックされたときの処理
    console.log(`Option selected: ${option}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '1vh' }}>
      <TextField variant="outlined" placeholder="オプションを入力" />
      <Button variant="contained" onClick={() => handleOptionClick("Option 1")}>
        オプション 1
      </Button>
      <Button variant="contained" onClick={() => handleOptionClick("Option 2")}>
        オプション 2
      </Button>
    </Box>
  );
};

export default Options;
