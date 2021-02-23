import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  return(
    <div className={styles.container}>
      <span>Completed Challenges</span>
      <span>12</span>
    </div>
  );
}