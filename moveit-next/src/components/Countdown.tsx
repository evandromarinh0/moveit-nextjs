import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteOnTheLeft, minuteOnTheRight] = String(minutes).padStart(2, '0').split('');
  const [secondOnTheLeft, secondOnTheRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  };

  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  };

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return(
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteOnTheLeft}</span>
          <span>{minuteOnTheRight}</span>
        </div>

        <span>:</span>
        
        <div>
          <span>{secondOnTheLeft}</span>
          <span>{secondOnTheRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button disabled className={styles.disabledCountdownButton}>
          Ciclo encerrado
          <img src="icons/check_circle.svg" alt="Check"/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button onClick={resetCountdown} type='button' className={styles.stopCountdownButton}>
              Abandonar ciclo
              <img src="icons/cancel_x.svg" alt="Cancel"/>
            </button>
          ) : (
            <button onClick={startCountdown} type='button' className={styles.startCountdownButton}>
              Iniciar um ciclo
              <img src="icons/play_arrow.svg" alt="Play"/>
            </button>
          )}
        </>
      )}
    </div>
  );
}