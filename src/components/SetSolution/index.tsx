import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux'

import { IRootState } from '../../state';
import { setMultipleAnswer, setOpenAnswer } from "../../state/answer/reducer";

const Wrapper = styled.div`
    width: 40%;
    justify-content: space-between;
`

const MultipleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`

const OpenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 15px;
`

export const AnswerButton = styled.button<{ isClicked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center; 
    
    width: 50px;
    height: 25px;
    border-radius: 5px;
    padding: 5px 15px 5px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin: ${({isClicked}) => (isClicked ? `2px 5px 8px 5px` : `0px 5px 10px 5px`)};
    border: 1px solid var(--main-text);
    box-shadow: ${({isClicked}) => (isClicked ? `0 0 0 white` : `2px 2px 2px 1px var(--main-text)`)};
    background-color: ${({isClicked}) => (isClicked ? `var(--success)` : `transparent`)};
    color: var(--main-text);
`

const InputBox = styled.input`
    width: 100%;
    height: 21px;
    border-radius: 5px;
    margin: 0px 0px 4px 0px;
    box-shadow: 2px 2px 2px 1px var(--main-text);
    border: 1px solid var(--main-text);
    text-align: center;
    transition: all 0.1s ease-in-out;
    ::placeholder {
        font-family: 'Inter ExtraLightItalic';
    }
    &:focus {
        outline: 0;
        border: 1px solid var(--alt-text);
        box-shadow: 0 0 0 white;
        margin: 2px 0px 2px 0px;
    }
`

export default function SetSolution() {
    const multipleAnswer = useSelector<IRootState, number>(state => state.answer.multipleAnswer);
    const openAnswer = useSelector<IRootState, string>(state => state.answer.openAnswer);
    const dispatch = useDispatch();

    const possibleAnswers = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }

    /* dispatch(setMultipleAnswer(_))
    dispatch(setOpenAnswer(_)) */

    const answerButtons = Object.entries(possibleAnswers).map(( [key, value] ) => {
        return(
            <AnswerButton isClicked={multipleAnswer === value} onClick={() => dispatch(setMultipleAnswer(value))}>
                {key}
            </AnswerButton>
        )
    })

    return(
        <Wrapper>
            <MultipleWrapper>
                Multiple choice answer:
                <ButtonsWrapper>
                    {answerButtons}
                </ButtonsWrapper>
            </MultipleWrapper>
            <OpenWrapper>
                Open answer:
                <ButtonsWrapper>
                    <InputBox 
                        type='text'
                        onChange={(e) => {dispatch(setOpenAnswer(e.target.value))}}
                        value={openAnswer}
                    />
                </ButtonsWrapper>
            </OpenWrapper>
        </Wrapper>
    )
}