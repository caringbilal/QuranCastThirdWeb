import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useContract, useClaimToken, useDisconnect, useTokenBalance, useTokenDecimals, useTokenSupply } from "@thirdweb-dev/react";
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

  //this is to store my created contract address from ThirdWeb + Trying to use the new function of useContract
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

            {" "}<code className={styles.code}>1st Tier - In Progress:</code><br />
            20% of 2.1B tokens = 420M sold at $0.00238 to raise $1M. 1.68B tokens remain.<br />
            <br />
            {" "}<code className={styles.codeDisabled}>2nd Tier:</code><br />
            30% of 2.1B tokens = 630M sold at $0.00317 to raise $2M. 1.05B tokens remain.<br />
            <br />
            {" "}<code className={styles.codeDisabled}>3rd Tier:</code><br />
            50% of 2.1B tokens = 1.05B sold at $0.00381 to raise $4M.<br />
          </p>

          {/* Below section for connecting Wallet + Minting on Arbitrum Chain */}
          <div className={styles.connect}>
            <ConnectWallet />

            <p>Your address: {address}</p>
            <p><Image src="/images/Arbitrum.png" width={21.6} height={24.3} />
              <b> 1st Tier Tokens for Sale on Arbitrum: 105,000,000 </b>
              <Image src="/images/Arbitrum.png" width={21.6} height={24.3} /></p>
            <p>Total Tokens Sold Till now on Arbitrum: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
            <p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
            <h1>Mint Tokens on <Image src="/images/Arbitrum.png" width={43.2} height={48.6} /></h1>
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

        </div> { /* Div ending for Header Div Started Above */}

        { /* Below section for trying to showcase other PreSales in 3 Sections on OP, BSC & BASE */}
        <div className={styles.grid}>

          {/* Below is a section for Minting on Optimism */}
          <div className={styles.card}>
            <Image
              src="/images/portal-preview.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText1}>Mint on Optimism ➜</h2>
              <p>Your address: {address}</p>
              <p><b> 1st Tier Tokens for Sale on Optimism: 105,000,000 </b></p>
              <p>Total Tokens Sold Till now on Optimism: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
              <p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
              <h1>Mint Tokens on Optimism</h1>
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
          </div>

          {/* Below is a section for Minting on Base */}
          <div className={styles.card}>
            <Image
              src="/images/dashboard-preview.png"
              alt="Placeholder preview of starter"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText2}>Mint on Base ➜</h2>
              <p>Your address: {address}</p>
              <p><b> 1st Tier Tokens for Sale on Base: 105,000,000 </b></p>
              <p>Total Tokens Sold Till now on Base: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
              <p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
              <h1>Mint Tokens on Base</h1>
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
          </div>

          {/* Below is a section for Minting on Binance Smart Chain */}
          <div className={styles.card}>
            <Image
              src="/images/templates-preview.png"
              alt="Placeholder preview of templates"
              width={300}
              height={200}
            />
            <div className={styles.cardText}>
              <h2 className={styles.gradientText3}>Mint on Binance Smart Chain ➜</h2>
              <p>Your address: {address}</p>
              <p><b> 1st Tier Tokens for Sale on BSC: 105,000,000 </b></p>
              <p>Total Tokens Sold Till now on BSC: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
              <p>Your Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
              <h1>Mint Tokens on BSC</h1>
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
          </div>

        </div> { /* Ending of the Div for Tabs based on Grid Layout */}


        { /* Below section for URLs to Website, YouTube & Discord */}
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

          {/* Below is a section for joining our YouTube Channel */}
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
              <h2 className={styles.gradientText2}>Official YouTube ➜</h2>
              <p>
                Subscribe to our YouTube channel to know about our latest updates regarding new features within our app enabling users to get rewarded.
              </p>
            </div>
          </a>

          { /*Below is the link for joining our Discord*/}
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
                Join our Community. Be an active member in order to get some exciting rewards.
              </p>
            </div>
          </a>
        </div> { /* Ending of the Div for Tabs based on Grid Layout */}

      </div>
    </main>

  );
}
