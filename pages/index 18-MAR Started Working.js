import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract, useClaimToken, useDisconnect, useMetamask, useTokenBalance, useTokenDecimals, useTokenDrop, useTokenSupply } from "@thirdweb-dev/react";
import { useState } from "react";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
  // If used on the FRONTEND pass your 'clientId'
  const sdk = new ThirdwebSDK("sepolia", {
    clientId: "0dc765ea5ff5b69c186af185d90ac825",
  });
  const contract = await sdk.getContract("0xFA101ec963573964f3c5D34a899842E34409C1c8");
  
export default function Home() {

  //setting state for the claiming process
  const [amount, setAmount] = useState("");

  //adding below constants as per youtube tutorial
  const address = useAddress(); //address of the connected user wallet
  //const connectWithMetaMask = useMetamask(); //connect with MetaMask constant
  //const disconnectWallet = useDisconnect(); //Disconnect constant

  //this is to store my created contract address from ThirdWeb
  //below is deprecated Function - hence commenting it
  //const tokenDrop = useTokenDrop("0xFA101ec963573964f3c5D34a899842E34409C1c8");
  //Trying to use the new function of useContract
  //const { contract } = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop")
  const tokenDrop = useContract("0xFA101ec963573964f3c5D34a899842E34409C1c8", "token-drop").contract;

  //get the token supply from the contract
  const { data: tokenSupply } = useTokenSupply(tokenDrop);
  //get the token Balance of the connected User Wallet from the contract
  const { data: tokenBalance } = useTokenBalance(tokenDrop, address);

  //this mutate fucntion will actually execute blockchain transaction
  const { mutate: claimTokens, isLoading } = useClaimToken(tokenDrop);
  
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
              Total Stoken Supply: 7 Billion <br />
              Tokens Sold to Community: 30% of Total Supply - 2.1 Billion <br />
              Current Pre-Sale will have 3 Tiers with increasing price, i.e.<br /><br />

              {" "}<code className={styles.code}>First Tier - In Progress:</code><br />
              Token Allocation: 20% of the 30% Supply = 420,000,000 tokens<br />
              Price per Token: $0.00238 USDC (to raise 1 Million USDC)<br />
              Total Raised: 420,000,000 tokens * $0.00238 USDC = $1,000,000 USDC<br />
              Remaining Tokens: 1,680,000,000 tokens<br /><br />
              {" "}<code className={styles.codeDisabled}>Second Tier:</code><br />
              Token Allocation: 30% of the remaining 30% Supply = 630,000,000 tokens<br />
              Price per Token: $0.00317 USDC (to raise 2 Million USDC)<br />
              Total Raised: 630,000,000 tokens * $0.00317 USDC = $2,000,000 USDC<br />
              Remaining Tokens: 1,050,000,000 tokens<br /><br />
              {" "}<code className={styles.codeDisabled}>Third Tier:</code><br />
              Token Allocation: 50% of the remaining 30% Supply = 1,050,000,000 tokens<br />
              Price per Token: $0.00381 USDC (to raise 4 Million USDC)<br />
              Total Raised: 1,050,000,000 tokens * $0.00381 USDC = $4,000,000 USDC<br />
            </p>

            {/* Below is the funtion used by ThirdWeb Example for connecting Wallet */}
            
            <div className={styles.connect}>
              <ConnectWallet />

                  <p>Your address: {address}</p>
                  <p><b>Total Tokens for Sale on Arbitrum Chain: 420,000,000</b></p>
                  <p>Total Tokens Sold Till now on Arbitrum Chain: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                  <p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                  <h1>Mint Tokens</h1>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)}
                  />
                  <button
                    onClick={() => claimTokens(
                      { amount, to: address }, 
                      { onSuccess: () => setAmount('') }, 
                      { onError: () => setErrorMessage('An error occurred.') }
                      )
                    }
                    disabled={isLoading}
                  >Mint {amount} {tokenBalance?.symbol}
                  </button>

            </div>
            

            {/* Below is the funtion written by me as per youtube tutorial 
            <div className={styles.connect}>
              {address ? (
                <>
                  <button className="nice-button-disconnect" onClick={disconnectWallet}>Disconnect Wallet</button>
                </>
              ) : (
                <button className="nice-button" onClick={connectWithMetaMask}>Connect with MetaMask</button>
              )
              }
            </div>
            */}
          </div>

          <div className={styles.grid}>
            <a
              href="https://qurancast.co/"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/portal-preview.png"
                alt="Placeholder preview of starter"
                width={300}
                height={200}
              />
              <div className={styles.cardText}>
                <h2 className={styles.gradientText1}>Official Website ➜</h2>
                <p>
                  Project details and offical app download that will help you know more about the Live project.
                </p>
              </div>
            </a>

            {/* Below is a section I am hding for now */}
            {/*
            <a
              href="https://thirdweb.com/dashboard"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/dashboard-preview.png"
                alt="Placeholder preview of starter"
                width={300}
                height={200}
              />
              <div className={styles.cardText}>
                <h2 className={styles.gradientText2}>Official Discord ➜</h2>
                <p>
                  Deploy, configure, and manage your smart contracts from the
                  dashboard.
                </p>
              </div>
            </a>
            */}

            <a
              href="https://discord.gg/D8UA5n3Czu"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/templates-preview.png"
                alt="Placeholder preview of templates"
                width={300}
                height={200}
              />
              <div className={styles.cardText}>
                <h2 className={styles.gradientText3}>Official Discord ➜</h2>
                <p>
                  Join our Community.
                </p>
              </div>
            </a>
          </div>
        </div>
      </main>
    
  );
}
