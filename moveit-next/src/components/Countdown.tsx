import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteOnTheLeft, minuteOnTheRight] = String(minutes).padStart(2, '0').split('');
  const [secondOnTheLeft, secondOnTheRight] = String(seconds).padStart(2, '0').split('');

  const toggleCountDown = useCallback(() => {
    setActive(!active)
  }, [active]);

  useEffect(() => {
    if(active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    }
  }, [active, time]);

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
      {active ? (
        <button onClick={toggleCountDown} type='button' className={styles.stopCountdownButton}>Pause countdown</button>
      ) : (
        <button onClick={toggleCountDown} type='button' className={styles.startCountdownButton}>Ignite</button>
      )}
    </div>
  );
}