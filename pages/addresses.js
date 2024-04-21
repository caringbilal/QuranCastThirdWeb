// addresses.js
import React from 'react';

export const addresses = {
	//[Base-Sepolia]: "0x1d495dEaD290df87bFc28834981379bE0DD14Bb5", // Base Sepolia
  	[11155111]: "0xFA101ec963573964f3c5D34a899842E34409C1c8", // Replace with your actual Sepolia contract address
	[10]: "Optimism Contract in Future", // Replace with your Optimism contract address
	[8453]: "Base Contract in Future", // Replace with your Base Mainnet contract address
	[42161]: "Arbitrum Contract in Future", // Replace with your Arbitrum Mainnet contract address
	[56]: "BNB Contract in Future", // Replace with your BNB Mainnet contract address
	[84532]: "0x1d495dEaD290df87bFc28834981379bE0DD14Bb5" // Replace with your Base Mainnet contract address
	// Add more chains and addresses
  };

  const Addresses = () => {
	// Use the addresses object here for UI rendering
	return (
	  <div>
		{/* Display contract addresses based on logic */}
	  </div>
	);
  };
  
  export default Addresses;