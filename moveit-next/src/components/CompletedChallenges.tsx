import { useContext } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';

import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { completedChallenges } = useContext(ChallengesContext);

  return(
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span>{completedChallenges}</span>
    </div>
  );
}