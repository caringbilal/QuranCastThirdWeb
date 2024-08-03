import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract, useClaimToken, useTokenBalance, useTokenSupply, useChainId } from "@thirdweb-dev/react";
import { useState, useEffect, useRef } from "react";
import { ethers } from 'ethers'; //importing to fetch the selected network
import { addresses } from './addresses.js'; // Assuming your addresses file is named "addresses.js"
import { ChainContext } from '../context/Chain'; // Assuming your context is in a folder named "context"
import React from "react";
import Swal from 'sweetalert2';

export default function Home() {

  //setting state for the claiming process
  //Amount variable for Arbitrum Section
  const [amountARB, setAmountARB] = useState(0); //adding 0 here shows 0 in input field + I have to add 3 more Amounts for other Chains Input Sliders
  //Amount variable for Optimism Section
  const [amountOP, setAmountOP] = useState(0); //adding 0 here shows 0 in input field + I have to add 3 more Amounts for other Chains Input Sliders
  //Amount variable for Optimism Section
  const [amountBASE, setAmountBASE] = useState(0); //adding 0 here shows 0 in input field + I have to add 3 more Amounts for other Chains Input Sliders
  //Amount variable for Optimism Section
  const [amountBSC, setAmountBSC] = useState(0); //adding 0 here shows 0 in input field + I have to add 3 more Amounts for other Chains Input Sliders


  //adding below constants as per youtube tutorial
  const address = useAddress(); //address of the connected user wallet

  //The Below is the Optimism Contract
  const tokenDropOP = useContract("0xFC9C5A4Db2b21cBDC92574ca9daccA5645A7EC18", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyOP } = useTokenSupply(tokenDropOP);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceOP } = useTokenBalance(tokenDropOP, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensOP, isLoading: isLoadingOP } = useClaimToken(tokenDropOP);
  //printing in console the details of the loaded contract
  console.log("tokenDropOP Loaded:", tokenDropOP);//this returns the whole contract object
  console.log("tokenDropOP tokenSupply:", tokenSupplyOP);//this returns the tokenSupplyOP
  console.log("tokenDropOP tokenBalanceOP:", tokenBalanceOP);//this returns the tokenBalanceOP

  //The Below is the BASE Contract
  const tokenDropBASE = useContract("0x26fEA66d1962566f6D4Fb7BDFF653b7D6159F41A", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBASE } = useTokenSupply(tokenDropBASE);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBASE } = useTokenBalance(tokenDropBASE, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBASE, isLoading: isLoadingBASE } = useClaimToken(tokenDropBASE);

  //The Below is the BNB Contract
  const tokenDropBSC = useContract("0x26fEA66d1962566f6D4Fb7BDFF653b7D6159F41A", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBSC } = useTokenSupply(tokenDropBSC);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBSC } = useTokenBalance(tokenDropBSC, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBSC, isLoading: isLoadingBSC } = useClaimToken(tokenDropBSC);

  //Setting up Sold Tokens Slider for Optimism Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleOPTier1 = 35000000;//changing value to show 0% on the progress bar
  const tokensSoldOP = tokenSupplyOP?.displayValue;
  const percentageSoldOP = (tokensSoldOP / totalTokensForSaleOPTier1) * 100;

  //Setting up Sold Tokens Slider for Base Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleBASETier1 = 35000000;//changing value to show 0% on the progress bar
  const tokensSoldBASE = tokenSupplyBASE?.displayValue;
  const percentageSoldBASE = (tokensSoldBASE / totalTokensForSaleBASETier1) * 100;

  //Setting up Sold Tokens Slider for BSC Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleBSCTier1 = 35000000;//changing value to show 0% on the progress bar
  const tokensSoldBSC = tokenSupplyBSC?.displayValue;
  const percentageSoldBSC = (tokensSoldBSC / totalTokensForSaleBSCTier1) * 100;


// Network information using Thirdweb
const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state
const [error, setErrorMessage] = useState(null); // Initialize error state

// Network information using Thirdweb - 18-APR-24
const chainId = useChainId(); // Get the entire object from Thirdweb

console.log("Chain ID:", chainId);


// Helper function to map chainId to network name
//network names are not being fetched on 18-APR-24
const getNetworkNameFromChainId = (chainId) => {
  switch (chainId) {
    case 11155111:
      return "Sepolia";
    case 42161:
      return "Arbitrum";
    case 56:
      return "BSC";
    case 10:
      return "Optimism";
    case 8453:
      return "Base";
    case 84532:
      return "Base-seploia";
    case 1:
        return "Ethereum";      
        // Add mappings for other supported chains here
    default:
      return "Unknown Network";
  }
};

const networkName = chainId ? getNetworkNameFromChainId(chainId) : null;
console.log("Network Name:", networkName);

// ... rest of your component logic (unchanged)

//useEffect hook to handle loading and errors
//Effect 1 (Network Change Detection):
useEffect(() => {
  if (chainId) { // Check if chainId exists before accessing its properties
    setIsLoading(chainId.isLoading);
    setErrorMessage(chainId.error);
  }
}, [chainId, networkName]); // Use chainId as a single dependency


// Use tokenDrop variable for all contract interactions
////const tokenDrop = useContract(contractAddress, "token-drop").contract;
//above line was not working hence I am trying thirdweb's approach and creating a new addresses.js file 
////const tokenDrop = useContract(addresses[chainId], "token-drop").contract;
//directly trying to access SepoliaContract from the addresses.js file
//even the new above approach didn't work yet -19-APR-24

//moving all Constants after the contract is set into one single variable
  //this is to store my created contract address from ThirdWeb = The Below is the Arbitrum Contract
  const tokenDropARB = useContract("0x26fEA66d1962566f6D4Fb7BDFF653b7D6159F41A", "token-drop").contract;
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyARB } = useTokenSupply(tokenDropARB);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceARB } = useTokenBalance(tokenDropARB, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensARB, isLoading: isLoadingARB } = useClaimToken(tokenDropARB);
  //printing in console the details of the loaded contract
  console.log("tokenDropARB Loaded:", tokenDropARB);//this returns the whole contract object
  console.log("tokenDropARB tokenSupply:", tokenSupplyARB);//this returns the tokenSupplyOP
  console.log("tokenDropARB tokenBalanceOP:", tokenBalanceARB);//this returns the tokenBalanceOP
  //printing below the contract address in console and also used the same command to display on HTML Page
  //below line doesn't work if the page is loading for the first time
  //console.log("tokenDropARB:", tokenDropARB.contractWrapper.address);

  //Setting up Sold Tokens Slider for Arbitrun Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleARBTier1 = 35000000;
  const tokensSoldARB = tokenSupplyARB?.displayValue;
  const percentageSoldARB = (tokensSoldARB / totalTokensForSaleARBTier1) * 100;

  //adding confetti styling on the successful claiming of tokens - will work on this later - 22-APR-24

  //trying to add Sound Effect on successful claiming of tokens
  const SUCCESS_SOUND = useRef(null); // Initialize as null
  useEffect(() => {
    try {
      // Create the Audio object within the effect
      SUCCESS_SOUND.current = new Audio([
        './congrats.mp3', // Your primary MP3 source
      ]);
      console.log("Congratulations sound loaded successfully!");
    } catch (error) {
      console.error("Error loading congratulations sound:", error);
    }
  }, []); // Empty dependency array to run only once after initial render
  
  //handling Confetti Animation + Playing congrats sound + Displaying success message
  const handleClaimARB = async () => {
    // ... logic for claiming tokens on Arbitrum

    SUCCESS_SOUND.current.play().catch(error => console.error('Audio playback error:', error));

    Swal.fire({
      title: 'Mint Successful!',
      text: "You've successfully minted " + amountARB + " " + tokenBalanceARB?.symbol + "!\n" +
            "\nAdd below Contract to MetaMask Wallet to view your passes:\n" +
            tokenDropARB.contractWrapper.address,
      icon: 'success',
      customClass: {
        confirmButton: 'swal-button success-button',
      },
      showCancelButton: false,
    });
  };

  //handling Confetti Animation + Playing congrats sound + Displaying success message
    const handleClaimOP = async () => {
      // ... logic for claiming tokens on Arbitrum
  
      SUCCESS_SOUND.current.play().catch(error => console.error('Audio playback error:', error));
  
      Swal.fire({
        title: 'Mint Successful!',
        text: "You've successfully minted " + amountOP + " " + tokenBalanceOP?.symbol + "!\n" +
              "\nAdd below Contract to MetaMask Wallet to view your passes:\n" +
              tokenDropOP.contractWrapper.address,
        icon: 'success',
        customClass: {
          confirmButton: 'swal-button success-button',
        },
        showCancelButton: false,
      });
    };

    //trying to add visitor counter to the webpage = added environment variable into VERCEL first
    //const visitorCounterKV = new KVNamespace(process.env.VERCEL_KV_VISITOR_COUNTER);

  return (

    <main className={styles.main}>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            We are planning to build world first DAO soon {" "}
            
          </h1>

          </div>
          </div>

    </main >

  );
}