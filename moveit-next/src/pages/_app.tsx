import '../styles/global.css';
import { Provider } from 'next-auth/client'
import { ToastProvider } from '../hooks/ToastContext';

function MyApp({ Component, pageProps }) {
  return(
    <ToastProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ToastProvider>
  );
}

export default MyApp
