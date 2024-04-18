import { ThirdwebProvider, useChain } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Sepolia, Arbitrum, Optimism, Base, Binance, ChainId } from '@thirdweb-dev/chains';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
//const activeChain = 'sepolia';

function MyApp({ Component, pageProps }) {
	//const { activeChainNew } = useChain();

	return (
		<ThirdwebProvider
			activeChain={Sepolia}
			supportedChains={[
				Arbitrum, 
                Base, 
                Binance, 
                Optimism, 
                Sepolia
			]}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
