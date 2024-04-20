import { ThirdwebProvider, useChain } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Sepolia, Arbitrum, Optimism, Base, Binance, ChainId } from '@thirdweb-dev/chains';
import { ChainContext, ChainProvider } from '../context/Chain'; // Assuming your context is in a folder named "context"
import React from 'react';

function MyApp({ Component, pageProps }) {

	// Access selectedChain from ChainContext
	const { selectedChain } = React.useContext(ChainContext);

	// Wrap the entire application with ChainProvider
	return (
		<ChainProvider>
			<ThirdwebProvider
				activeChain={selectedChain} // Use selectedChain from ChainContext
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
		</ChainProvider>
	);
}

export default MyApp;
