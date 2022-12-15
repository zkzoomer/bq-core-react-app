import styled from "styled-components"
import { RxExternalLink } from "react-icons/rx"
import { theme } from "../../styles"

export const Wrapper = styled.div`
    width: 40%;
    justify-content: space-between;

`

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    font-size: 1.1rem;

    > * {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
    }

    @media screen and (max-width: ${theme.breakpoint}px) {
        justify-content: center;
        align-items: center;
    }
`

export const LinkIcon = styled.a`
    padding-left: 10px;
    color: var(--alt-text);
    cursor: pointer;

    > * {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const Holders = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    font-size: 1.1rem;

    > * {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
    }

    @media screen and (max-width: ${theme.breakpoint}px) {
        justify-content: center;
        align-items: center;
    }
`