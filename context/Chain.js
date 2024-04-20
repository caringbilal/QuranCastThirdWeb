import React, { createContext, useState } from 'react';

const ChainContext = createContext({
  selectedChain: 'sepolia', // Replace with your default chain
  setSelectedChain: () => {},
});

const ChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState('sepolia'); // Replace with your default chain

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
};

export { ChainContext, ChainProvider };
