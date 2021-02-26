import Head from 'next/head';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from '../hooks/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../hooks/ChallengesContext';
import { GetServerSideProps } from 'next';

interface HomeProps {
  level: number;
  currentExp: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExp={props.currentExp} 
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
        
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { level, currentExp, completedChallenges } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      completedChallenges: Number(completedChallenges)
    }
  }
}