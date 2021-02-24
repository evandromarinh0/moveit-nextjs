import { useContext } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return(
    <div className={styles.container}>
      <img src="https://github.com/evandromarinh0.png" alt="Evan Marinho"/>
      <div>
        <strong>Evandro Marinho</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}