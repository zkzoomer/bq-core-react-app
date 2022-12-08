import { FC, ReactElement, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useWeb3React } from '@web3-react/core';
import Jazzicon from "@metamask/jazzicon";

import { theme } from '../styles'
import { IRootState } from '../state';
import { truncateAddress } from '../hooks/utils';
import { setCorrectChain } from '../state/chain/reducer';
import { CHAIN_IDS_NETWORK_PARAMETERS, CHAIN_IDS_TO_NAMES } from '../constants/chains';
import { connectors } from './connectors';

const Wrapper = styled.div`
    position: sticky;
    padding: 0px 40px 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    height: 80px;
    border-bottom: 1px solid var(--divider);
    transition: 0.5s all ease;

    @media screen and (max-width: ${theme.breakpoint}px) {
        padding: 0px 20px 0 20px;
    }
`

const Logo = styled.div`
    font-size: 2.7rem;
    font-weight: 600;
    font-style: italic;
    color: var(--alt-text);
    text-shadow: -1px -1px 0 var(--dark-background), 1px -1px 0 var(--dark-background), -1px 1px 0 var(--dark-background), 1px 1px 0 var(--dark-background);

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    @media screen and (max-width: ${theme.breakpoint}px) {
        font-size: 2rem;
    }
`

const WrongChain = css`
    background-color: var(--error);
`

const RightChain = css`
    background-color: transparent;
`

const Connected = css`
    &:hover {   
        font-size: 0;
    }
    &:hover::after {   
        content: "Disconnect";
        font-size: 1rem;
    }
`

const ConnectWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    padding-right: 10px;
`

const ConnectButton = styled.button<{ wrongChain: boolean, connected: boolean }>`
    width: 150px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center; 
    padding: 5px 10px;
    margin: 4px 0px 4px 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: box-shadow, margin 0.2s ease-in-out;
    
    box-shadow: 2px 2px 2px 1px var(--main-text);
    border: 1px solid var(--main-text);
    &:hover {
        box-shadow: 0 0 0 white;
        margin: 6px 0px 2px 10px;
    }
    ${(props) => props.wrongChain ? WrongChain : RightChain}
    ${(props) => props.connected ? Connected : null}
`

const StyledIdenticon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    ${ConnectButton}:hover & {   
        display: none;
    }
`
export const Header: FC = (): ReactElement => {
    const selectedChain = useSelector<IRootState, string>(state => state.chain.selectedChain);
    const correctChain = useSelector<IRootState, boolean>(state => state.chain.correctChain);
    const dispatch = useDispatch();
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();

    // Connect on load if account was left connected
    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (CHAIN_IDS_TO_NAMES[chainId as number] === selectedChain) {
            dispatch(setCorrectChain(true))
        } else {
            dispatch(setCorrectChain(false))
        }
    // eslint-disable-next-line
    }, [chainId, selectedChain])

    const handleConnect = () => {
        activate(connectors.injected);
        window.localStorage.setItem("provider", "injected")
    }

    const handleDisconnect = () => {
        deactivate()
        window.localStorage.setItem("provider", "");
    }

    const switchNetwork = async () => {
        try {
          await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CHAIN_IDS_NETWORK_PARAMETERS[selectedChain].chainId }]
          });
        } catch (switchError) {
          /* if (switchError.code === 4902) { */
            try {
              await library.provider.request({
                method: "wallet_addEthereumChain",
                params: [CHAIN_IDS_NETWORK_PARAMETERS[selectedChain]]
              });
            } catch (error) {
              console.log(error);
            }
          /* } */
        }
    };

    function Identicon() {
        const ref = useRef<HTMLInputElement>(null);
        const { account, } = useWeb3React();
    
        useEffect(() => {
            if (account && ref.current) {
                ref.current.innerHTML = "";
                ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2,10), 16)));
            }
        }, [account]);
    
        return <StyledIdenticon ref={ref} />
    }

    function ButtonsComponent () {
        if (active) {
            if (correctChain) {
                return(
                    <ConnectWrapper>
                        <ConnectButton onClick={handleDisconnect} wrongChain={false} connected={true}><Identicon />&nbsp;&nbsp;{ truncateAddress(account as string) }</ConnectButton>
                    </ConnectWrapper>
                )
            } else {  // Incorrect chain, prompt the change
                return(
                    <ConnectWrapper>
                        <ConnectButton onClick={switchNetwork} wrongChain={true} connected={false}>Change Network</ConnectButton>
                    </ConnectWrapper>
                )
            }
        } else {  
            return (
                <ConnectWrapper>
                    <ConnectButton onClick={handleConnect} wrongChain={false} connected={false}>Connect Wallet</ConnectButton>
                </ConnectWrapper>
            )
        }
    }

    return (
        <Wrapper>
            <Logo>
                bq-React
            </Logo>
            <ButtonsComponent />
        </Wrapper>
    )
}