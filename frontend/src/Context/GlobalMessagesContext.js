// GlobalMessagesContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalMessagesContext = createContext();

export const GlobalMessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <GlobalMessagesContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </GlobalMessagesContext.Provider>
  );
};

export const useGlobalMessages = () => useContext(GlobalMessagesContext);
