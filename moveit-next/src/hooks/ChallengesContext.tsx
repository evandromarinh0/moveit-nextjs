import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { CountdownContext } from './CountdownContext';

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
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  // useEffect(() => {
  //   Notification.requestPermission();
  // }, []);

  function levelUp(){
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    // if(Notification.permission === 'granted') {
    //   new Notification('Novo desafio', {
    //     body: `Valendo ${challenge.amount}xp!`
    //   })
    // }
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
      value={{ level, levelUp, currentExp, completedChallenges, startNewChallenge, 
        activeChallenge, resetChallenge, expToNextLevel, completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}