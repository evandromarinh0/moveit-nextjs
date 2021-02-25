import { useContext } from 'react';
import { CountdownContext } from '../hooks/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { 
    seconds, 
    minutes, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext);

  const [minuteOnTheLeft, minuteOnTheRight] = String(minutes).padStart(2, '0').split('');
  const [secondOnTheLeft, secondOnTheRight] = String(seconds).padStart(2, '0').split('');
  
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