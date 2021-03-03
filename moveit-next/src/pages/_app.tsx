import '../styles/global.css';
import { Provider } from 'next-auth/client'
import { ToastProvider } from '../hooks/ToastContext';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return(
    <ToastProvider>
      <Provider session={pageProps.session}>
        <ThemeProvider defaultTheme='dark'>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ToastProvider>
  );
}

export default MyApp