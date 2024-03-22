import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract, useClaimToken, useDisconnect, useTokenBalance, useTokenDecimals, useTokenSupply } from "@thirdweb-dev/react";
import { useState } from "react";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK("sepolia", {
  clientId: "0dc765ea5ff5b69c186af185d90ac825",
});
//const contract = await sdk.getContract("0xFA101ec963573964f3c5D34a899842E34409C1c8"); //this line doesn't affect anything - important part was adding of client ID above

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

  //this is to store my created contract address from ThirdWeb = The Below is the Arbitrum Contract
  const tokenDropARB = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract;
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyARB } = useTokenSupply(tokenDropARB);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceARB } = useTokenBalance(tokenDropARB, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensARB, isLoading: isLoadingARB } = useClaimToken(tokenDropARB);

  //The Below is the Optimism Contract
  const tokenDropOP = useContract("0xE7b6390790FBCc45161Ba5E8aFa68f97EaaF2188", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyOP } = useTokenSupply(tokenDropOP);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceOP } = useTokenBalance(tokenDropOP, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensOP, isLoading: isLoadingOP } = useClaimToken(tokenDropOP);

  //The Below is the Optimism Contract
  const tokenDropBASE = useContract("0xE7b6390790FBCc45161Ba5E8aFa68f97EaaF2188", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBASE } = useTokenSupply(tokenDropBASE);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBASE } = useTokenBalance(tokenDropBASE, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBASE, isLoading: isLoadingBASE } = useClaimToken(tokenDropBASE);

  //The Below is the Optimism Contract
  const tokenDropBSC = useContract("0xE7b6390790FBCc45161Ba5E8aFa68f97EaaF2188", "token-drop").contract; //2nd contract also deployed on Sepolia TestNet as other test nets were not working
  //get the token supply from the contract - the tokens which have been sold till now
  const { data: tokenSupplyBSC } = useTokenSupply(tokenDropBSC);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalanceBSC } = useTokenBalance(tokenDropBSC, address);
  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokensBSC, isLoading: isLoadingBSC } = useClaimToken(tokenDropBSC);  

  //Setting up Sold Tokens Slider for Arbitrun Chain for 1st Tier - dummy data for now 19-MAR-24
  const totalTokensForSaleARBTier1 = 1370;
  const tokensSoldARB = tokenSupplyARB?.displayValue;
  const percentageSoldARB = (tokensSoldARB / totalTokensForSaleARBTier1) * 100;

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

  //Setting up the errorMessage and setErrorMessage variables here
  const [errorMessage, setErrorMessage] = useState('');

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
            </span> PreSale.
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
            Total Stoken Supply: 7 Billion <br />
            Tokens For Community: 30% of Total Supply - 2.1 Billion <br />
            Current Pre-Sale will have 3 Tiers with increasing price, i.e.<br /><br />

            {" "}<code className={styles.code}>1st Tier - In Progress:</code>
            20% of 2.1B tokens = 420M sold at $0.00238 to raise $1M. 1.68B tokens remain.<br />
            <br />
            {" "}<code className={styles.codeDisabled}>2nd Tier:</code>
            30% of 2.1B tokens = 630M sold at $0.00317 to raise $2M. 1.05B tokens remain.<br />
            <br />
            {" "}<code className={styles.codeDisabled}>3rd Tier:</code>
            50% of 2.1B tokens = 1.05B sold at $0.00381 to raise $4M.<br />
          </p>

          {/* Trying to add Tabs here */}

          {/* Below section for connecting Wallet */}
          <div className={styles.connect}>
            <ConnectWallet 
              theme="dark"
              btnTitle="Connect Wallet"
              termsOfServiceUrl="https://qurancast.co/legal.html"
            />
            <p>Your address: {address}</p>
            {/* I'll add terms of service and privacy policy pages
            <ConnectWallet
                  termsOfServiceUrl="https://...."
                  privacyPolicyUrl="https://...."
            />;
            */}

          </div>

        </div> { /* Div ending for Header Div Started Above */}

        { /* Below section for trying to showcase other PreSales in 3 Sections on OP, BSC & BASE */}
        {/* Below is a section for Showing 4 separate Grids for different chains minting */}
        <div className={styles.grid}>

          {/* Below is a section for Minting on Arbitrum */}
          <div className={styles.card}>
            <Image
              src="/images/ArbBKG.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText1}>Mint on Arbitrum ➜</h2>
              <p style={{ fontSize: '12px' }}>Contract: 0xFA101ec963573964f3c5D34a899842E34409C1c8</p>
              <p><b> 1st Tier Tokens for Sale on Arbitrum: 105,000,000 </b></p>
              <p>Total Tokens Sold on Arbitrum: {tokenSupplyARB?.displayValue} {tokenSupplyARB?.symbol}</p>
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
              <p>Your Token Balance: {tokenBalanceARB?.displayValue} {tokenBalanceARB?.symbol}</p>
              <h1>Mint on Arbitrum</h1>
              <input
                type="number"
                value={amountARB}
                onChange={e => setAmountARB(e.target.value)}
                className="nice-input"
              />
              <button className="nice-button"
                onClick={() => claimTokensARB(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountARB('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingARB}
                >Mint {amountARB} {tokenBalanceARB?.symbol} <br/> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountARB * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on Optimism */}
          <div className={styles.card}>
            <Image
              src="/images/OpBKG.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText2}>Mint on Optimism ➜</h2>
              <p style={{ fontSize: '12px' }}>Contract: 0xE7b6390790FBCc45161Ba5E8aFa68f97EaaF2188</p>
              <p><b> 1st Tier Tokens for Sale on Optimism: 105,000 </b></p>
              <p>Total Tokens Sold on Optimism: {tokenSupplyOP?.displayValue} {tokenSupplyOP?.symbol}</p>
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
              <p>Your Token Balance: {tokenBalanceOP?.displayValue} {tokenBalanceOP?.symbol}</p>
              <h1>Mint on Optimism</h1>
              <input
                type="number"
                value={amountOP}
                onChange={e => setAmountOP(e.target.value)}
                className="nice-input"
              />
              {/*Revised Button code with help of chatGPT*/}
              <button
                className="nice-button"
                onClick={() => claimTokensOP(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountOP('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingOP}
              >
                Mint {amountOP} {tokenBalanceOP?.symbol}<br/> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
                for {(amountOP * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on Base */}
          <div className={styles.card}>
            <Image
              src="/images/BaseBKG.png"
              alt="Placeholder preview of templates"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Mint on Base ➜</h2>
              <p style={{ fontSize: '12px' }}>Contract: 0xA37c135A5C3D57504a1c5739459eFef8f1d47A4f</p>
              <p><b> 1st Tier Tokens for Sale on Base: 105,000,000 </b></p>
              <p>Total Tokens Sold on Base: {tokenSupplyBASE?.displayValue} {tokenSupplyBASE?.symbol}</p>
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
              <p>Your Token Balance: {tokenBalanceBASE?.displayValue} {tokenBalanceBASE?.symbol}</p>
              <h1>Mint on Base</h1>
              <input
                type="number"
                value={amountBASE}
                onChange={e => setAmountBASE(e.target.value)}
                className="nice-input"
              />
              <button className="nice-button"
                onClick={() => claimTokensBASE(
                  { amount: amountBASE, to: address },
                  { onSuccess: () => setAmountBASE('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBASE}
              >Mint {amountBASE} {tokenBalanceBASE?.symbol}<br/> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
              for {(amountBASE * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

          {/* Below is a section for Minting on Binance Smart Chain */}
          <div className={styles.card}>
            <Image
              src="/images/BscBKG.png"
              alt="Placeholder preview of templates"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Mint on Binance Smart Chain ➜</h2>
              <p style={{ fontSize: '12px' }}>Contract: 0xA37c135A5C3D57504a1c5739459eFef8f1d47A4f</p>
              <p><b> 1st Tier Tokens for Sale on BSC: 105,000,000 </b></p>
              <p>Total Tokens Sold on BSC: {tokenSupplyBSC?.displayValue} {tokenSupplyBSC?.symbol}</p>
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
              <p>Your Token Balance: {tokenBalanceBSC?.displayValue} {tokenBalanceBSC?.symbol}</p>
              <h1>Mint on BSC</h1>
              <input
                type="number"
                value={amountBSC}
                onChange={e => setAmountBSC(e.target.value)}
                className="nice-input"
              />
              <button className="nice-button"
                onClick={() => claimTokensBSC(
                  { amount: amountARB, to: address },
                  { onSuccess: () => setAmountBSC('0') },
                  { onError: () => setErrorMessage('An error occurred.') }
                )
                }
                disabled={isLoadingBSC}
              >Mint {amountBSC} {tokenBalanceBSC?.symbol}<br/> {/*writing below the USDC total amount based on 1st Tier Price per token which is 0.00238 */}
              for {(amountBSC * 0.00238).toFixed(4)} USDC
              </button>
            </div>
          </div>

        </div> { /* Ending of the Div for Tabs based on Grid Layout */}


      </div>
    </main >

  );
}
