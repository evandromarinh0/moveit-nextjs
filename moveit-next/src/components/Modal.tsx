import { useContext } from 'react';
import { ChallengesContext } from '../hooks/ChallengesContext';
import styles from '../styles/components/Modal.module.css';

export function Modal() {
  const { level, closeModal } = useContext(ChallengesContext);

  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type='button' onClick={closeModal}>
          <img src="/icons/close.svg" alt="Close Modal"/>
        </button>
      </div>
    </div>
    
  );
}