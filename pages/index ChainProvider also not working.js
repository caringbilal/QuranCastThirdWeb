import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract, useClaimToken, useTokenBalance, useTokenSupply, useChainId } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { ethers } from 'ethers'; //importing to fetch the selected network
import { addresses } from './addresses'; // Assuming your addresses file is named "addresses.js"
import { ChainContext } from '../context/Chain'; // Assuming your context is in a folder named "context"

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
  //Amount variable for BASE Seploia Section
  const [amountBSP, setAmountBSP] = useState(0); //adding 0 here shows 0 in input field + I have to add 3 more Amounts for other Chains Input Sliders


  //adding below constants as per youtube tutorial
  const address = useAddress(); //address of the connected user wallet

  //The Below is the Optimism Contract
  const tokenDropOP = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyOP } = useTokenSupply(tokenDropOP);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceOP } = useTokenBalance(tokenDropOP, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensOP, isLoading: isLoadingOP } = useClaimToken(tokenDropOP);

  //The Below is the BASE Contract
  const tokenDropBASE = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBASE } = useTokenSupply(tokenDropBASE);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBASE } = useTokenBalance(tokenDropBASE, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBASE, isLoading: isLoadingBASE } = useClaimToken(tokenDropBASE);

  //The Below is the BNB Contract
  const tokenDropBSC = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBSC } = useTokenSupply(tokenDropBSC);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBSC } = useTokenBalance(tokenDropBSC, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBSC, isLoading: isLoadingBSC } = useClaimToken(tokenDropBSC);

  //The Below is the BASE Sepolia Contract - Contract not loading from Thirdweb - 15-APR-24
  //working fine using the sample contract on deployed contract page button
  const tokenDropBSP = useContract("0x1d495dEaD290df87bFc28834981379bE0DD14Bb5", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBSP } = useTokenSupply(tokenDropBSP);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBSP } = useTokenBalance(tokenDropBSP, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBSP, isLoading: isLoadingBSP } = useClaimToken(tokenDropBSP);

  //Setting up Sold Tokens Slider for Optimism Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleOPTier1 = 347;
  const tokensSoldOP = tokenSupplyOP?.displayValue;
  const percentageSoldOP = (tokensSoldOP / totalTokensForSaleOPTier1) * 100;

  //Setting up Sold Tokens Slider for Base Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleBASETier1 = 207;
  const tokensSoldBASE = tokenSupplyBASE?.displayValue;
  const percentageSoldBASE = (tokensSoldBASE / totalTokensForSaleBASETier1) * 100;

  //Setting up Sold Tokens Slider for BSC Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleBSCTier1 = 147;
  const tokensSoldBSC = tokenSupplyBSC?.displayValue;
  const percentageSoldBSC = (tokensSoldBSC / totalTokensForSaleBSCTier1) * 100;

  //Setting up Sold Tokens Slider for BASE Seploia Chain for 1st Tier - 15-APR-24
  const totalTokensForSaleBSPTier1 = 1437;
  const tokensSoldBSP = tokenSupplyBSP?.displayValue;
  const percentageSoldBSP = (tokensSoldBSP / totalTokensForSaleBSPTier1) * 100;

//   //Setting up the constant for storing the selected network
//   const [setAddress] = useState(null);
//   const [connectedWallet, setConnectedWallet] = useState(null); // Use a more descriptive name
//   const [networkName, setNetworkName] = useState(null);
//   const [chainId, setChainId] = useState(null); //will store chainId of the selected network
//   const [isLoading, setIsLoading] = useState(true); // Add a loading state
//   const [errorMessage, setErrorMessage] = useState(null); // Add error handling

//   // First useEffect hook to fetch network information using ethers
//   useEffect(() => {
//     const getNetwork = async () => {
//     try {
//       setIsLoading(true); // Indicate loading start
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const network = await provider.getNetwork();
//         setNetworkName(network.name);
//         setChainId(network.chainId);
//         setConnectedWallet(provider.getSigner().address); // Update connected wallet address
//       } else {
//         console.log("window.ethereum is not available");
//         setErrorMessage('Please install MetaMask or a compatible wallet'); // Guide user
//       }
//     } catch (error) {
//       setErrorMessage('Error fetching network information');
//       console.error('Network error:', error);
//     } finally {
//       setIsLoading(false); // Indicate loading completion
//     }
//   };

//     getNetwork();

//   // Add event listener for network change (optional, for dynamic updates)
//   window.ethereum?.on('chainChanged', getNetwork);

//   return () => {
//   // Cleanup function to remove event listener on unmount
//     window.ethereum?.removeListener('chainChanged', getNetwork);
//   };

// }, [connectedWallet]); // Run only when connected wallet address changes

// Network information using Thirdweb
const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state
const [error, setErrorMessage] = useState(null); // Initialize error state

// Network information using Thirdweb - 18-APR-24
const chainId = useChainId(); // Get the entire object from Thirdweb
const networkName = chainId?.data ? getNetworkNameFromChainId(chainId.data) : null;

// Helper function to map chainId to network name
//network names are not being fetched on 18-APR-24
const getNetworkNameFromChainId = (chainId) => {
  switch (chainId) {
    case 1:
      return "Mainnet";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 42:
      return "Kovan";
    // Add mappings for other supported chains here
    default:
      return "Unknown Network";
  }
};

// ... rest of your component logic (unchanged)

//useEffect hook to handle loading and errors
//Effect 1 (Network Change Detection):
useEffect(() => {
  // Update isLoading and error based on Thirdweb object properties
  setIsLoading(chainId?.isLoading);
  setErrorMessage(chainId?.error);
}, [chainId]); // Use chainId as a single dependency


//trying to link separate contracts for each network
const [contractAddress, setContractAddress] = useState(null);

// Contract address mapping for different networks ALL in ONE PLACE
const contractAddressMap = {
  84532: "0x1d495dEaD290df87bFc28834981379bE0DD14Bb5", // Base Sepolia
  11155111: "0xFA101ec963573964f3c5D34a899842E34409C1c8", // Replace with your actual Sepolia contract address
  10: "YOUR_OPTIMISM_CONTRACT_ADDRESS", // Replace with your Optimism contract address
  8453: "YOUR_BASE_MAINNET_CONTRACT_ADDRESS", // Replace with your Base Mainnet contract address
  42161: "YOUR_ARBITRUM_MAINNET_CONTRACT_ADDRESS", // Replace with your Arbitrum Mainnet contract address
  56: "YOUR_BNB_MAINNET_CONTRACT_ADDRESS", // Replace with your BNB Mainnet contract address
};

// Effect to set contract address based on chain ID
useEffect(() => {
  if (chainId?.data) {
    const mappedAddress = contractAddressMap[chainId.data];
    if (mappedAddress) {
      setContractAddress(mappedAddress);
    } else {
      console.error("Contract address not found for network:", chainId.data);
    }
  }
}, [chainId]);

// Use tokenDrop variable for all contract interactions
////const tokenDrop = useContract(contractAddress, "token-drop").contract;
//above line was not working hence I am trying thirdweb's approach and creating a new addresses.js file 
const tokenDrop = useContract(addresses[chainId?.data], "token-drop").contract;
//even the new above approach didn't work yet -19-APR-24

//moving all Constants after the contract is set into one single variable
  //this is to store my created contract address from ThirdWeb = The Below is the Arbitrum Contract
  ////const tokenDropARB = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract;
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyARB } = useTokenSupply(tokenDrop);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceARB } = useTokenBalance(tokenDrop, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensARB, isLoading: isLoadingARB } = useClaimToken(tokenDrop);

  //Setting up Sold Tokens Slider for Arbitrun Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleARBTier1 = 1370;
  const tokensSoldARB = tokenSupplyARB?.displayValue;
  const percentageSoldARB = (tokensSoldARB / totalTokensForSaleARBTier1) * 100;

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
            Total Planned Raised Amount: 7 Million USDC (7-4-24 Update)<br />
            By participating in this campaign, your Ajar is secured, the moment your transaction is confirmed on Blockchain! May your participation blossom into a future filled with worldly rewards. <br /><br />
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
                {/*{errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>} THIS LINE was to show errormessage when I had implemented Ethers Library instead of Thirdweb*/}
                {chainId && <span style={{ marginLeft: 10 }}>(Chain ID: {chainId})</span>}
                {contractAddress ? (
                  <span style={{ marginLeft: 10 }}>
                    (Contract Address: {contractAddress})
                  </span>
                ) : (
                  <span style={{ marginLeft: 10, color: "red" }}>
                    Contract not found for this network
                  </span>
                )}
              </p>
              
            )}
            {/* Below I will try to show Native ETH or BNB or ARB Token Balance of connected wallet */}

          </div>

        </div> { /* Div ending for Header Div Started Above */}

        { /* Below section for trying to showcase other PreSales in 3 Sections on OP, BSC & BASE */}
        {/* Below is a section for Showing 4 separate Grids for different chains minting */}
        <div className={styles.grid}>

          {/* Below is a section for Minting on Base */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 8453 ? (
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
              <p style={{ fontSize: '12px' }}>Contract: 0xFA101ec963573964f3c5D34a899842E34409C1c8</p>
              <p><b> Founder&apos;s Club Thanks Pass on Base: 350,000 </b></p>
              <p>Total Passes Minted on Base: {tokenSupplyBASE?.displayValue} {tokenSupplyBASE?.symbol}</p>
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
              <p>Your Passes: {tokenBalanceBASE?.displayValue} {tokenBalanceBASE?.symbol}</p>
              <h1>Mint on Base</h1>
              <input
                type="number"
                value={amountBASE}
                onChange={e => setAmountBASE(e.target.value)}
                className="nice-input"
              />
              <button className={`nice-button ${chainId !== 8453 ? 'disabled' : ''}`} //also checking here if selected network is base or not?
                onClick={() => claimTokensBASE(
                  { amount: amountBASE, to: address },
                  { onSuccess: () => setAmountBASE('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBASE || chainId !== 8453} //also checking here if selected network is base or not? or if transaction loading, then making the button disabled.
              >Mint {amountBASE} {tokenBalanceBASE?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountBASE * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

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
              <p style={{ fontSize: '12px' }}>Contract: 0xFA101ec963573964f3c5D34a899842E34409C1c8</p>
              <p><b> Founder&apos;s Club Thanks Pass on Optimism: 350,000 </b></p>
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
              {/*Revised Button code with help of chatGPT*/}
              <button
                className={`nice-button ${chainId !== 10 ? 'disabled' : ''}`} //also checking here if selected network is optimism or not?
                onClick={() => claimTokensOP(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountOP('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingOP || chainId !== 10} //also checking here if selected network is optimism or not? or if transaction loading, then making the button disabled.
              >
                Mint {amountOP} {tokenBalanceOP?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountOP * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>


          {/* Below is a section for Minting on Arbitrum+testing with Sepolia ID 11155111 */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 11155111 ? (
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
              <p style={{ fontSize: '12px' }}>Contract: 0xFA101ec963573964f3c5D34a899842E34409C1c8</p>
              <p><b> Founder&apos;s Club Thanks Pass on Arbitrum: 350,000 </b></p>
              <p>Total Passes Minted on Arbitrum: {tokenSupplyARB?.displayValue} {tokenSupplyARB?.symbol}</p>
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
              <p>Your Passes: {tokenBalanceARB?.displayValue} {tokenBalanceARB?.symbol}</p>
              <h1>Mint on Arbitrum</h1>
              <input
                type="number"
                value={amountARB}
                onChange={e => setAmountARB(e.target.value)}
                className="nice-input"
              />
              <button className={`nice-button ${chainId !== 11155111 ? 'disabled' : ''}`} //also checking here if selected network is arbitrum or not? TESTING with SEPOLIA ID
                onClick={() => claimTokensARB(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountARB('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingARB || chainId !== 11155111} //also checking here if selected network is arbitrum or not? or if transaction loading, then making the button disabled.
              >Mint {amountARB} {tokenBalanceARB?.symbol} <br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountARB * 0.00238).toFixed(4)} USDC
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
              <p style={{ fontSize: '12px' }}>Contract: 0xFA101ec963573964f3c5D34a899842E34409C1c8</p>
              <p><b> Founder&apos;s Club Thanks Pass on BSC: 350,000 </b></p>
              <p>Total Passes Minted on BSC: {tokenSupplyBSC?.displayValue} {tokenSupplyBSC?.symbol}</p>
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
              <p>Your Passes: {tokenBalanceBSC?.displayValue} {tokenBalanceBSC?.symbol}</p>
              <h1>Mint on BSC</h1>
              <input
                type="number"
                value={amountBSC}
                onChange={e => setAmountBSC(e.target.value)}
                className="nice-input"
              />
              <button className={`nice-button ${chainId !== 56 ? 'disabled' : ''}`} //also checking here if selected network is bnb or not?
                onClick={() => claimTokensBSC(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountBSC('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBSC || chainId !== 56} //also checking here if selected network is bnb or not? or if transaction loading, then making the button disabled.
              >Mint {amountBSC} {tokenBalanceBSC?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountBSC * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on BASE Seploia Chain */}
          <div className={styles.card}>
            {/* I am changing the bkg picture based on selected network */}
            {chainId === 84532 ? (
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
              <h2 className={styles.gradientText3}>Mint on BASE Sepolia Chain ➜</h2>
              <p style={{ fontSize: '12px' }}>Contract: 0x1d495dEaD290df87bFc28834981379bE0DD14Bb5</p>
              <p><b> Founder&apos;s Club Thanks Pass on Base Sepolia: 1,437 </b></p>
              <p>Total Passes Minted on Base Sepolia: {tokenSupplyBSP?.displayValue} {tokenSupplyBSP?.symbol}</p>
              {/*Trying to show a nice loading percenatge bar to show how much tokens have been sold*/}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentageSoldBSP}%` }}>
                  { /* Here I will try to display the percentage of progress on top of my progress bar */}
                  <div className="progress-label" style={{ color: 'black', fontSize: '14px', marginLeft: '7px' }}>{percentageSoldBSC.toFixed(2)}%</div> {/* Display percentage label */}
                </div> {/*I had to move the Dive down to make the progress label inside the Bar*/}
              </div><br />
              {/*Percentage Slider Bar end here*/}
              <p>Your Passes: {tokenBalanceBSP?.displayValue} {tokenBalanceBSP?.symbol}</p>
              <h1>Mint on Base Sepolia</h1>
              <input
                type="number"
                value={amountBSP}
                onChange={e => setAmountBSP(e.target.value)}
                className="nice-input"
              />
              <button className={`nice-button ${chainId !== 84532 ? 'disabled' : ''}`} //also checking here if selected network is bnb or not?
                onClick={() => claimTokensBSP(
                  { amount: amountBSP, to: address },
                  { onSuccess: () => setAmountBSP('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBSP || chainId !== 84532} //also checking here if selected network is bnb or not? or if transaction loading, then making the button disabled.
              >Mint {amountBSP} {tokenBalanceBSP?.symbol}<br /> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountBSP * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

        </div> { /* Ending of the Div for Tabs based on Grid Layout */}


      </div>
    </main >

  );
}
