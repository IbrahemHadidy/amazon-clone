import { createRoot } from 'react-dom/client';

import { ToastContainer } from 'react-toastify';

import App from './App';
import StoreProvider from './app/StoreProvider';

import '@styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <App />
    <ToastContainer position="bottom-right" />
  </StoreProvider>
);
