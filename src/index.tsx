import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import './styles/index.css';
import App from './pages/app';
import store from './state';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const getLibrary = (provider: ethers.providers.ExternalProvider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <App />
            </Web3ReactProvider>
        </Provider>
    </React.StrictMode>
);
