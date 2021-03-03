import { useSession } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const [session] = useSession();

  return(
    <div className={styles.container}>
      <img src={session.user.image} alt="Evan Marinho"/>
      <div>
        <strong>{session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}