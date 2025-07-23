import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';

console.log('React root mounted');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);