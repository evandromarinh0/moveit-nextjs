import '../styles/global.css';

import { ChallengesProvider } from '../hooks/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return(
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
