import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import styles from '../styles/components/LoginForm.module.css';
import { signIn } from 'next-auth/client';
import axios from 'axios';

export function LoginForm() {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!user){
      setError('Digite um username válido')
      return
    }

    try{
      const response = await axios.get(`https://api.github.com/users/${user}`)
      if(response.status == 200){
        signIn('github');
      }
    }catch{
      setError('Digite um username válido!');
    }
  }

  return(
    <>
      <Head>
        <title>Login | Github</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.background}>
          <img src="icons/background-logo.svg" alt="Background"/>
        </div>
        <div className={styles.content}>
          <img src="logo-full.svg" alt="Logo"/>
          <strong>Bem-vindo</strong>
          <div className={styles.login}>
            <img src="icons/github.svg" alt="Github"/>
            <span>Faça login com seu Github <br/>para começar</span>
          </div>
          <form>
            <div className={styles.input}>
              <input 
                placeholder='Digite seu username' 
                type="text"
                onChange={e => setUser(e.target.value)}
              />
              <button onClick={handleSubmit} type='submit'>
                <img src="icons/arrow-right.svg" alt="Submit"/>
              </button>
            </div>
          </form>
          {error && <span style={{ color: '#d03851', marginTop: '0.5rem' }}>{error}</span> }
        </div>
      </section>
    </>
  );
}