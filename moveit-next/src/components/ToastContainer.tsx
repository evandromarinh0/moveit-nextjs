import React, { useContext } from 'react';
import { ToastContext, ToastMessage } from '../hooks/ToastContext';

import styles from '../styles/components/ToastContainer.module.css';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export function ToastContainer({ messages }: ToastContainerProps){
  const { removeToast } = useContext(ToastContext);

  return(
    <div className={styles.container}>
      {messages.map(message => (
        <div className={styles.toast}>
          <img src="/icons/info.svg" alt="Information"/>

          <div>
            <strong>{message.title}</strong>
            <p>{message.description}</p>
          </div>

          <button onClick={() => {removeToast(message.id)}} type="button">
            <img src="/icons/x.svg" alt="Cancel"/>
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;