import { useContext } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';
import { CountdownContext } from '../hooks/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
  }

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountdown();
  }

  return(
    <div className={styles.container}>
      { activeChallenge ? (
        <div className={styles.challenge}>
          <header>Ganhe {activeChallenge.amount} XP</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button onClick={handleChallengeFailed} className={styles.challengeFailedButton} type='button'>Deu ruim</button>
            <button onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton} type='button'>Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.content}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Complete-os e ganhe XP e avance de level.
          </p>
        </div>
      )}
    </div>
  );
}