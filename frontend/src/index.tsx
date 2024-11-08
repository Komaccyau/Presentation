// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material'; // MUIのリセットCSS
import { ThemeProvider, createTheme } from '@mui/material/styles';

// MUIのテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// ルート要素を取得
const rootElement = document.getElementById('root') as HTMLElement;

// Reactアプリケーションをレンダリング
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
