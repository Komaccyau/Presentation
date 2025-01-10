// Options.tsx
import React from 'react';
import { Button, Box } from '@mui/material';

interface OptionsProps {
  toggleApiUsage: () => void; // APIの使用を切り替えるための関数
  useDummyApi: boolean;        // 現在のAPI使用状況
}

const Options: React.FC<OptionsProps> = ({ toggleApiUsage, useDummyApi }) => {
  return (
    <Box sx={{ marginLeft: '20vh',width: '80vw' , display: 'flex', justifyContent: 'space-around', padding: '1vh' }}>
      {/* <TextField sx={{ width: '30vw' }} variant="outlined" placeholder="返答を表示" />
      <TextField sx={{ width: '30vw' }} variant="outlined" placeholder="返答を表示" /> */}
      <Button variant="contained" onClick={toggleApiUsage}>
        {useDummyApi ? '中学生レベル(ChatAPI)' : '高校生レベル(DummyAPI)'}
      </Button>
    </Box>
  );
};

export default Options;
