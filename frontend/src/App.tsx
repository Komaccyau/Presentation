import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'; // ホームページコンポーネント
import Quiz from './pages/Quiz'; // クイズページコンポーネント
import NotFound from './pages/NotFound'; // 404ページコンポーネント
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // MUIテーマ設定

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/quiz" component={Quiz} />
          <Route component={NotFound} /> {/* 404ページ */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
