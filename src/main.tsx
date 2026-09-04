import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import 'katex/dist/katex.min.css';
import { initBackgroundOfflineBible } from './utils/offlineBibleManager';

// Background cache all 66 books of the Bible for offline reading
initBackgroundOfflineBible();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
