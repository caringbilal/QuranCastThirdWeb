import styles from "../styles/Home.module.css";
import Image from "next/image";
import { ConnectWallet, useAddress, useDisconnect, useMetamask, useTokenDecimals, useTokenDrop, useTokenSupply } from "@thirdweb-dev/react";

export default function Home() {

  //adding below constants as per youtube tutorial
  const address = useAddress(); //address of the connected user wallet
  const connectWithMetaMask = useMetamask(); //connect with MetaMask constant
  const disconnectWallet = useDisconnect(); //Disconnect constant

  //this is to store my created contract address from ThirdWeb
  const tokenDrop = useTokenDrop("0xFA101ec963573964f3c5D34a899842E34409C1c8");

  //get the token supply from the contract
  const { data: tokenSupply } = useTokenSupply(tokenDrop);

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
            Get started by configuring your desired network in{" "}
            <code className={styles.code}>src/index.js</code>, then modify the{" "}
            <code className={styles.code}>src/App.js</code> file!
          </p>

          {/* Below is the funtion used by ThirdWeb Example for connecting Wallet */}
          {/*
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
          */}

          {/* Below is the funtion written by me as per youtube tutorial */}
          <div className={styles.connect}>
            {address ? (
              <>
                <button onClick={disconnectWallet}>Disconnect Wallet</button>
                <p>Your address: {address}</p>
              </>
            ) : (
              <button onClick={connectWithMetaMask}>Connect with MetaMask</button>
            )
            }
          </div>

        </div>

        <div className={styles.grid}>
          <a
            href="https://portal.thirdweb.com/"
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
              <h2 className={styles.gradientText1}>Portal ➜</h2>
              <p>
                Guides, references, and resources that will help you build with
                thirdweb.
              </p>
            </div>
          </a>

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
              <h2 className={styles.gradientText2}>Dashboard ➜</h2>
              <p>
                Deploy, configure, and manage your smart contracts from the
                dashboard.
              </p>
            </div>
          </a>

          <a
            href="https://thirdweb.com/templates"
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
              <h2 className={styles.gradientText3}>Templates ➜</h2>
              <p>
                Discover and clone template projects showcasing thirdweb
                features.
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
