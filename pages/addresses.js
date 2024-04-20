import { Arbitrum, Base, Bnb, Optimism, Sepolia } from "@thirdweb-dev/chains";

// addresses.js
export const addresses = {
	//[Base-Sepolia]: "0x1d495dEaD290df87bFc28834981379bE0DD14Bb5", // Base Sepolia
  	[11155111]: "0xFA101ec963573964f3c5D34a899842E34409C1c8", // Replace with your actual Sepolia contract address
	[Optimism]: "YOUR_OPTIMISM_CONTRACT_ADDRESS", // Replace with your Optimism contract address
	[Base]: "0x1d495dEaD290df87bFc28834981379bE0DD14Bb5", // Replace with your Base Mainnet contract address
	[Arbitrum]: "YOUR_ARBITRUM_MAINNET_CONTRACT_ADDRESS", // Replace with your Arbitrum Mainnet contract address
	[Bnb]: "YOUR_BNB_MAINNET_CONTRACT_ADDRESS" // Replace with your BNB Mainnet contract address
	// Add more chains and addresses
  };
  
  export default addresses; // Now addresses is the default export