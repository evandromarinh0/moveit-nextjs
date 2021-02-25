import React, { createContext, ReactNode, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type: 'info';
  description: string;
  title: string;
}

interface ToastContextData {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  function addToast({ type, title, description }: Omit<ToastMessage, 'id'>) {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }
    setMessages([...messages, toast])
  }

  function removeToast(id: string) {
    setMessages(state => state.filter(message => message.id !== id))
  }

  return(
    <ToastContext.Provider 
      value={{ addToast, removeToast }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}