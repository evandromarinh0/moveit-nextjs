import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json';
import { Modal } from '../components/Modal';
import { ToastContext } from './ToastContext';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  activeChallenge: Challenge;
  completedChallenges: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExp: number;
  completedChallenges: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const { addToast } = useContext(ToastContext);

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExp', String(currentExp));
    Cookie.set('completedChallenges', String(completedChallenges));
  }, [level, currentExp, completedChallenges]);

  function levelUp(){
    setLevel(level + 1);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    addToast({
      type: 'info',
      title: `Hora de exercitar-se! (${challenge.amount}xp)`,
      description: 'Leia o desafio para realizar os exercícios'
    });
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExp = currentExp + amount;

    if(finalExp >= expToNextLevel) {
      levelUp();
      finalExp = finalExp - expToNextLevel
    }

    setCurrentExp(finalExp);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  return(
    <ChallengesContext.Provider 
      value={{ 
        level, levelUp, currentExp, completedChallenges, startNewChallenge,
        activeChallenge, resetChallenge, expToNextLevel, completeChallenge, closeModal
      }}
    >
      {children}
      {isModalOpen && <Modal />}
    </ChallengesContext.Provider>
  );
}