import '../styles/global.css';

import { ToastProvider } from '../hooks/ToastContext';

function MyApp({ Component, pageProps }) {
  return(
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
    
  );
}

export default MyApp
