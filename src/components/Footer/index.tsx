import styled from "styled-components"

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: var(--main-background);
`

const FooterContents = styled.a`
    width: 90%;
    height: 100%;
    border-top: 1px solid var(--divider);
    font-family: 'Inter ExtraLightItalic';
    padding-top: 5px;
    text-decoration: none;

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    &:hover {
        cursor: pointer;
    }
`

export default function Footer () {
    return(
        <FooterWrapper>
            <FooterContents href='https://github.com/0xdeenz/bq-core' target="_blank">
                block qualified
            </FooterContents>
        </FooterWrapper>
    )
}
