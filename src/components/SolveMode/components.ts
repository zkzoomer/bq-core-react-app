import styled from "styled-components";

export const Wrapper = styled.div`
    width: 80%;
    justify-content: center;
`

export const Button = styled.button<{ isEnabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center; 
    
    width: 220px;
    height: 35px;
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 5px 15px 5px 15px;
    font-size: 16px;
    cursor: ${({isEnabled}) => (isEnabled ? `pointer` : `default`)};
    transition: all 0.2s ease-in-out;
    margin: 0 10px;
    border: 1px solid var(--main-text);
    box-shadow: ${({isEnabled}) => (isEnabled ? `2px 2px 2px 1px var(--main-text)` : `0 0 0 white`)};
    background-color: ${({isEnabled}) => (isEnabled ? `var(--alt-text)` : `transparent`)};
    color: ${({isEnabled}) => (isEnabled ? `var(--light-text)` : `var(--main-text)`)};
    &:hover {
        box-shadow: 0 0 0 white;
    }
`

export const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--alt-text);
    background-color: transparent;

    animation: rotation 1.2s infinite linear;

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

    > * {
        background-color: transparent;
    }
`