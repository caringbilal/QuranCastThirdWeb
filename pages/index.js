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
            Welcome to{" "}
            <span className={styles.gradientText0}>
              <a
                href="https://qurancast.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                QuranCast
              </a>
            </span> ThanksPass Campaign.
          </h1>

          <p className={styles.description}>
            <b>Official Links:</b>{' '}
            <a href="https://qurancast.co/" target="_blank" rel="noopener noreferrer">
              Website
            </a> |{' '}
            <a href="https://discord.gg/D8UA5n3Czu" target="_blank" rel="noopener noreferrer">
              Discord
            </a> |{' '}
            <a href="https://twitter.com/quran_cast" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <br />
            <b>Official Web3 Addresses:</b>{' '}
            <a href="https://etherscan.io/address/qurancast.eth" target="_blank" rel="noopener noreferrer">
              qurancast.eth
            </a> |{' '}
            <a href="https://explorer.solana.com/address/B48Pw11GoLomJ4F3xWQN5x3afBxcmSFyHfQgbKTXTCrQ" target="_blank" rel="noopener noreferrer">
              qurancat.sol
            </a>
            <br /><br />
            Total Planned Raised Amount: 7 Million USDC<br />
            By participating in this campaign, your Ajar is secured, the moment your transaction is confirmed on Blockchain! <br /><br />
            
            <b>Raised funds will help in:</b>{' '} <br />1. App Development <br />
            2. App Maintenance<br />
            3. App Marketing<br />
            4. Sponsoring free Quran Classes <br />
            6. Rewards for Content Viewers, Content Creators and Content Moderators<br /><br />
            
            We plan to raise these funds in 3 Tiers, i.e.<br /><br />

            {" "}<code className={styles.code}>Founder&apos;s Club - In Progress:</code>
            1,400,000 Thanks Passes at $0.714 to raise $1M USDC.<br />
            <br />
            { /* Planned message to be part of each transaction too "Thank you for believing! Your Ajar is secured! May your participation blossom into a future filled with worldly rewards." */}
            {" "}<code className={styles.codeDisabled}>Early Adopter Club:</code>
            1,680,000 Thanks Passes at $1.191 to raise $2M USDC.<br />
            <br />
            {" "}<code className={styles.codeDisabled}>Genesis Club:</code>
            3,500,000 Thanks Passes at $1.275 to raise $5M USDC.<br />
          </p>

          {/* Trying to add Tabs here */}

          {/* Below section for connecting Wallet */}
          <div className={styles.connect}>

          {isLoading ? (
  <p>Loading network information...</p>
) : error ? (
  <p>Error fetching network information: {error.message}</p>
) : networkName ? (
  <p>Connected to {networkName} network</p>
) : (
  <p>Please connect your wallet</p>
)}

            <ConnectWallet
              theme="dark"
              btnTitle="Connect Wallet"
              termsOfServiceUrl="https://qurancast.co/legal.html"
            />
            {/*<p>Your address: {address}</p>*/}

            {/* ... rest of your component JSX */}
            {address && (
              <p>
                Connected wallet address: {address}
                {networkName && (
                  <span style={{ marginLeft: 10 }}>
                    (Network: {networkName})
                  </span>
                )}
                {chainId?.isLoading && <p>Fetching network information...</p>}
                
              </p>
              
            )}
            {/* Below I will try to show Native ETH or BNB or ARB Token Balance of connected wallet */}

          </div>

        </div> { /* Div ending for Header Div Started Above */}

        { /* Below section for trying to showcase other PreSales in 3 Sections on OP, BSC & BASE */}
        {/* Below is a section for Showing 4 separate Grids for different chains minting */}
        <div className={styles.grid}>



          {/* Below is a section for Minting on Optimism */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 10 ? (
              <Image
                src="/images/OpBKG.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            ) : (
              <Image
                src="/images/OpBKGGrey.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            )}
            <div className={styles.cardText}>
              <h2 className={styles.gradientText2}>Mint on Optimism ➜</h2>
              <p style={{ fontSize: "14px" }}>Founder&#39;s Club Tier-1: Optimism</p>
              <p><b> Founder&#39;s Club OP Thanks Passes: 350,000 </b></p>
              <p>Total Passes Minted on Optimism: {tokenSupplyOP?.displayValue} {tokenSupplyOP?.symbol}</p>
              {/*Trying to show a nice loading percenatge bar to show how much tokens have been sold*/}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentageSoldOP}%` }}>
                  { /* Here I will try to display the percentage of progress on top of my progress bar */}
                  <div className="progress-label" style={{ color: 'black', fontSize: '14px', marginLeft: '7px' }}>{percentageSoldOP.toFixed(2)}%</div> {/* Display percentage label */}
                </div> {/*I had to move the Dive down to make the progress label inside the Bar*/}
              </div><br />
              {/*Percentage Slider Bar end here*/}
              <p>Your Passes: {tokenBalanceOP?.displayValue} {tokenBalanceOP?.symbol}</p>
              <h1>Mint on Optimism</h1>
              <input
                type="number"
                value={amountOP}
                onChange={e => setAmountOP(e.target.value)}
                className="nice-input"
              />
              {/*Revised Button based on updated button of Arbitrum/Sepolia Testing*/}

              <button className={`nice-button ${chainId !== 10 ? 'disabled' : ''}`} //also checking here if selected network is arbitrum or not? TESTING with SEPOLIA ID
                onClick={() => claimTokensOP(
                  { amount: amountOP, to: address },
                  
                    { onSuccess: handleClaimOP }, // Call handleClaimARB on success

                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingOP || chainId !== 10} //also checking here if selected network is arbitrum or not? or if transaction loading, then making the button disabled.
              >
                {isLoadingOP ? (
                  <span>Minting Your Thanks Passes on Blockchain...</span> // Replace with your custom loading indicator (e.g., spinner)
                ) : (
                  <>
                    Mint {amountOP} {tokenBalanceOP?.symbol} <br />
                    for {(amountOP * 0.714).toFixed(4)} USDC
                  </>
                )}
              </button>
            </div>
          </div>


          {/* Below is a section for Minting on Arbitrum+testing with Sepolia ID 11155111 */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 0 ? (
              <Image
                src="/images/ArbBKG.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            ) : (
              <Image
                src="/images/ArbBKGGrey.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            )}
            <div className={styles.cardText}>
              <h2 className={styles.gradientText1}>Mint on Arbitrum ➜</h2>
              <p style={{ fontSize: "14px" }}>Founder&#39;s Club Tier-2: Arbitrum</p>
              <p><b> Founder&#39;s Club ARB Thanks Passes: 350,000 </b></p>
              {/* <p>Total Passes Minted on Arbitrum: {tokenSupplyARB?.displayValue} {tokenSupplyARB?.symbol}</p> */}
              <p>Total Passes Minted on Arbitrum: 0</p>
              {/*Trying to show a nice loading percenatge bar to show how much tokens have been sold*/}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentageSoldARB}%` }}>
                  { /* Here I will try to display the percentage of progress on top of my progress bar */}
                  <div className="progress-label" style={{ color: 'black', fontSize: '14px', marginLeft: '7px' }}>{percentageSoldARB.toFixed(2)}%</div> {/* Display percentage label */}
                </div> {/*I had to move the Dive down to make the progress label inside the Bar*/}
              </div><br />
              {/*Percentage Slider Bar end here*/}
              {/* <p>Your Passes: {tokenBalanceARB?.displayValue} {tokenBalanceARB?.symbol}</p> */}
              <p>Your Passes: 0</p>
              <h1>Mint on Arbitrum</h1>
              <input
                type="number"
                value={amountARB}
                onChange={e => setAmountARB(e.target.value)}
                className="nice-input"
              />
              {/*Added 0 as ChainId to hide this till next phase*/}
              <button className={`nice-button ${chainId !== 0 ? 'disabled' : ''}`} //also checking here if selected network is arbitrum or not? TESTING with SEPOLIA ID
                onClick={() => claimTokensARB(
                  { amount: amountARB, to: address },
                  
                    { onSuccess: handleClaimARB }, // Call handleClaimARB on success

                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingARB || chainId !== 0} //also checking here if selected network is arbitrum or not? or if transaction loading, then making the button disabled.
              >
                {isLoadingARB ? (
                  <span>Minting Your Thanks Passes on Blockchain...</span> // Replace with your custom loading indicator (e.g., spinner)
                ) : (
                  <>
                    Mint {amountARB} {tokenBalanceARB?.symbol} <br />
                    for {(amountARB * 0.714).toFixed(4)} USDC
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on Base */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 0 ? (
              <Image
                src="/images/BaseBKG.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            ) : (
              <Image
                src="/images/BaseBKGGrey.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            )}
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Mint on Base ➜</h2>
              <p style={{ fontSize: "14px" }}>Founder&#39;s Club Tier-3: Base</p>
              <p><b> Founder&#39;s Club BASE Thanks Passes: 350,000 </b></p>
              {/* <p>Total Passes Minted on Base: {tokenSupplyBASE?.displayValue} {tokenSupplyBASE?.symbol}</p> */}
              <p>Total Passes Minted on Arbitrum: 0</p>
              {/*Trying to show a nice loading percenatge bar to show how much tokens have been sold*/}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentageSoldBASE}%` }}>
                  { /* Here I will try to display the percentage of progress on top of my progress bar */}
                  <div className="progress-label" style={{ color: 'black', fontSize: '14px', marginLeft: '7px' }}>{percentageSoldBASE.toFixed(2)}%</div> {/* Display percentage label */}
                </div> {/*I had to move the Dive down to make the progress label inside the Bar*/}
              </div><br />
              {/*Percentage Slider Bar end here*/}
              {/* <p>Your Passes: {tokenBalanceBASE?.displayValue} {tokenBalanceBASE?.symbol}</p> */}
              <p>Your Passes: 0</p>
              <h1>Mint on Base</h1>
              <input
                type="number"
                value={amountBASE}
                onChange={e => setAmountBASE(e.target.value)}
                className="nice-input"
              />
              {/*Added 0 as ChainId to hide this till next phase*/}
              <button className={`nice-button ${chainId !== 0 ? 'disabled' : ''}`} //also checking here if selected network is base or not?
                onClick={() => claimTokensBASE(
                  { amount: amountBASE, to: address },
                  { onSuccess: () => setAmountBASE('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBASE || chainId !== 0} //also checking here if selected network is base or not? or if transaction loading, then making the button disabled.
              >Mint {amountBASE} {tokenBalanceBASE?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountBASE * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on Binance Smart Chain */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 56 ? (
              <Image
                src="/images/BscBKG.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            ) : (
              <Image
                src="/images/BscBKGGrey.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
            )}
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Mint on Binance Smart Chain ➜</h2>
              <p style={{ fontSize: "14px" }}>Founder&#39;s Club Tier-4: BSC</p>
              <p><b> Founder&#39;s Club BSC Thanks Passes: 350,000 </b></p>
              {/* <p>Total Passes Minted on BSC: {tokenSupplyBSC?.displayValue} {tokenSupplyBSC?.symbol}</p> */}
              <p>Total Passes Minted on BSC: 0</p>
              {/*Trying to show a nice loading percenatge bar to show how much tokens have been sold*/}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentageSoldBSC}%` }}>
                  { /* Here I will try to display the percentage of progress on top of my progress bar */}
                  <div className="progress-label" style={{ color: 'black', fontSize: '14px', marginLeft: '7px' }}>{percentageSoldBSC.toFixed(2)}%</div> {/* Display percentage label */}
                </div> {/*I had to move the Dive down to make the progress label inside the Bar*/}
              </div><br />
              {/*Percentage Slider Bar end here*/}
              {/* <p>Your Passes: {tokenBalanceBSC?.displayValue} {tokenBalanceBSC?.symbol}</p> */}
              <p>Your Passes: 0</p>
              <h1>Mint on BSC</h1>
              <input
                type="number"
                value={amountBSC}
                onChange={e => setAmountBSC(e.target.value)}
                className="nice-input"
              />
              {/*Added 0 as ChainId to hide this till next phase*/}
              <button className={`nice-button ${chainId !== 0 ? 'disabled' : ''}`} //also checking here if selected network is bnb or not?
                onClick={() => claimTokensBSC(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountBSC('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBSC || chainId !== 0} //also checking here if selected network is bnb or not? or if transaction loading, then making the button disabled.
              >Mint {amountBSC} {tokenBalanceBSC?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountBSC * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

        </div> { /* Ending of the Div for Tabs based on Grid Layout */}


      </div>
      
      { /* FAQ Section */}
      <div className={styles.description}>

      <b>Frequently Asked Questions (FAQs)</b><br />

            <ul>
              <li>
                What is Qurancast and how does it differ from other social media apps?
                <ul>
                  <li>Qurancast has many features which differentiates it from other Social Media Platforms, i.e. </li>
                  <li>Unlike other platforms where dubbed videos are created, we give our users options to practice within our app and then submit their own improved recitation videos.</li>
                  <li>In other platofrms, Quran Recitations videos are mixed with all kinds of music or other videos, but our platform is only dedicated to Holy Quran Recitation Videos.</li>
                  <li>We reward all kinds of users in our app, i.e. if you are only viewing videos, if you are creating videos, or if you are supporting our platform as Quran Teachers.</li>
                  <li>Our platform is free to use for everyone.</li>
                </ul>
              </li>
              <li>
                What are Thanks Passes?
                <ul>
                  <li>Thanks Passes are simply digital receipts issued to your wallet for your support to our project.</li>
                  <li>In the future these digital receipts may be used within our application for different purposes, so keep these receipts safe in your web-3 wallets.</li>
                </ul>
              </li>
              <li>
                How can I participate in the ThanksPass generation event and what are the benefits of supporting our project?
                <ul>
                  <li>ThanksPass generation event is comprised of 3 Tiers, i.e. Founder&#39;ss Club, Early Adopter&#39;ss Club, and Genesis Club</li>
                  <li>Each of the 3 Tiers is further divided into 4 Sub Tiers launched on 4 EVM Compatible Chains, i.e. Optimism, Arbitrum, Base and BSC Chain.</li>
                  <li>Based on the current in-progress Tier, you need to select that chain in metamask and then you can mint any number of Thanks Passes on that chain</li>
                  <li>With these raised funds, you are helping us to scale our project to new heights, supporting free Quran Classes for everyone and also converting our project into a DAO.</li>
                </ul>
              </li>
              <li>
                When is the Qurancast application expected to launch, and what can the users anticipate?
                <ul>
                  <li>Our Application is Live since 2019 with more than 350,000 downloads.</li>
                  <li>You can download our app and start benefiting from the app by either, simply watching videos, or creating recitation videos or you can also apply through our website to become part of our teaching team.</li>
                </ul>
              </li>
              <li>
                6. How can I stay updated on Qurancast&#39;ss latest news and developments?
                <ul>
                  <li>You can follow us on all the official social media handles mentioned on our <a href="https://qurancast.co/" target="_blank" rel="noopener noreferrer">
              website</a>.</li>
                  <li>Or you can join our <a href="https://discord.gg/D8UA5n3Czu" target="_blank" rel="noopener noreferrer">Discord</a> Community and become an active community member.<br />
                  </li>
                </ul>
              </li>
            </ul>

          </div>

    </main >

  );
}