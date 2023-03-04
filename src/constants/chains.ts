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
        TesterCreator: "0xECe4239a93F97e52aE88b64228d38e39195B9e9A",
        Credentials: "0xc8c0A832e04Ea78E46bDf0e133aB525840b1c53d",
        TestVerifier: "0x3561B5ccD0b058c80884E6a6Fa1205fb0d249c43",
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
