import '../styles/global.css';

import { ChallengesProvider } from '../hooks/ChallengesContext';
import { ToastProvider } from '../hooks/ToastContext';

function MyApp({ Component, pageProps }) {
  return(
    <ToastProvider>
      <ChallengesProvider>
        <Component {...pageProps} />
      </ChallengesProvider>
    </ToastProvider>
    
  );
}

export default MyApp
