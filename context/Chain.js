import React, { createContext, useState } from 'react';

const ChainContext = createContext({
  selectedChain: 'optimism', // Replace with your default chain
  setSelectedChain: () => {},
});

const ChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState('optimism'); // Replace with your default chain

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
};

export { ChainContext, ChainProvider };
