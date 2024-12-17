// Options.tsx
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface OptionsProps {
  toggleApiUsage: () => void; // APIの使用を切り替えるための関数
  useDummyApi: boolean;        // 現在のAPI使用状況
}

const Options: React.FC<OptionsProps> = ({ toggleApiUsage, useDummyApi }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '1vh' }}>
      <TextField sx={{ width: '30vw' }} variant="outlined" placeholder="オプションを入力" />
      <TextField sx={{ width: '30vw' }} variant="outlined" placeholder="オプションを入力" />
      
      <Button variant="contained" onClick={toggleApiUsage}>
        {useDummyApi ? 'チャットAPIを使用' : 'ダミーAPIを使用'}
      </Button>
    </Box>
  );
};

export default Options;
