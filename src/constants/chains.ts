import { ethers } from "ethers"; 

export const NAMES_TO_CHAIN_IDS = {
    'polygon_mumbai': 80001,
}

export const CHAIN_IDS_TO_NAMES: { [key: number]: string } = {
    80001: 'polygon_mumbai',
}

export const CHAIN_IDS_TO_HUMAN_NAMES = {
    80001: 'Mumbai Testnet',
}

export const ALL_SUPPORTED_CHAIN_IDS = Object.values(NAMES_TO_CHAIN_IDS)

export const CURRENCIES = {
    'polygon_mumbai': 'MATIC',
}

export const CHAIN_IDS_NETWORK_PARAMETERS: { [key: string]: any } = {
    "polygon_mumbai": {
        chainId: "0x13881",
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        chainName: "Mumbai",
        nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
        blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
}

export const DEPLOYED_CONTRACTS = {
    "polygon_mumbai": {
        TesterCreator: "0x403E6BBCB3Ddbe3487c09E8827e5dEf058FE6db4",
        Credentials: "0x1B54cCe0f362fF29696c710Fa86B9Add98164C88",
        TestVerifier: "0xE6cd4a671d06D91E71c77173F85E3C043EE74DCF",
    }, 
}

export const DEPLOYED_CONTRACTS_ON_EXPLORER = {
    "polygon_mumbai": {
        TesterCreator: 'https://mumbai.polygonscan.com/address/' + DEPLOYED_CONTRACTS["polygon_mumbai"].TesterCreator + '#code',
        Credentials: 'https://mumbai.polygonscan.com/address/' + DEPLOYED_CONTRACTS["polygon_mumbai"].Credentials + '#code',
        TestVerifier: 'https://mumbai.polygonscan.com/address/' + DEPLOYED_CONTRACTS["polygon_mumbai"].TestVerifier + '#code',
    },
}

export const PROVIDERS = {
    "polygon_mumbai": new ethers.providers.JsonRpcProvider(process.env.REACT_APP_MATIC_RPC),
}
