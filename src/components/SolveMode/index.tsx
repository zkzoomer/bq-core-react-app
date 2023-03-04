import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useWeb3React } from "@web3-react/core"
import { bqTest } from "bq-core"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { IRootState } from '../../state';
import { setMessage } from "../../state/message/reducer"
import { NAMES_TO_CHAIN_IDS, DEPLOYED_CONTRACTS, PROVIDERS } from "../../constants/chains"
import {
    Wrapper,
    Button,
    SpinnerWrapper
} from "./components"

function Spinner () {
    return(
        <SpinnerWrapper>
            <AiOutlineLoading3Quarters />
        </SpinnerWrapper>
    )
}

export default function SolveMode() {
    // TODO: define bqTest types
    const [test, setTest] = useState<any>(null)
    const [proof, setProof] = useState<any>(null)
    const [buttonState, setButtonState] = useState({
        proofAwaiting: false,
        txAwaiting: false,
    })

    const multipleAnswer = useSelector<IRootState, number>(state => state.answer.multipleAnswer);
    const openAnswer = useSelector<IRootState, string>(state => state.answer.openAnswer);
    const dispatch = useDispatch();

    const {
        library,
        chainId,
        account,
    } = useWeb3React();

    // first page load, load the test on solve mode
    useEffect(() => {
        const fetchData = async () => {
            const readModeTest = await bqTest.solveMode(
                '2',
                PROVIDERS.polygon_mumbai,
                DEPLOYED_CONTRACTS.polygon_mumbai.TesterCreator,
                new Array(64).fill('457883638539277361920482169119367464201611968669851198460610908962342884291n')
            )

            setTest(readModeTest)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setProof(null)
    }, [multipleAnswer, openAnswer])

    const gradeSolution = () => {
        const grade = test.gradeSolution({
            openAnswers: Array(64).fill(openAnswer), 
            multipleChoiceAnswers: Array(64).fill(multipleAnswer) 
        })
        dispatch(setMessage([
            `Your grade is ${grade.grade}/100`,
            `This corresponds to ${grade.multipleChoiceGrade}% for the multiple choice component, and ${grade.openAnswerGrade}% for the open answer component`
        ]))
    }

    const generateProof = async () => {
        setButtonState( prevState => ({ ...prevState, proofAwaiting: true }) )
        const proof = await test.generateSolutionProof({ 
            recipient: account,  
            openAnswers: Array(64).fill(openAnswer), 
            multipleChoiceAnswers: Array(64).fill(multipleAnswer) 
        })
        setProof(proof)
        setButtonState( prevState => ({ ...prevState, proofAwaiting: false }) )
    }

    const verifyProof = async () => {
        setButtonState( prevState => ({ ...prevState, proofAwaiting: true }) )
        const isValid = await test.verifySolutionProof( proof )
        dispatch(setMessage(
            isValid ? ['Proof is valid', 'You may now post it on-chain'] : ['Proof is invalid', 'Something must have gone wrong with the bq-core library']
        ))
        setButtonState( prevState => ({ ...prevState, proofAwaiting: false }) )
    }

    const sendTransaction = async () => {
        setButtonState( prevState => ({ ...prevState, txAwaiting: true }) )
        await test.sendSolutionTransaction( library.getSigner(), proof )
        setButtonState( prevState => ({ ...prevState, txAwaiting: false }) )
    }

    if (test === null) {
        return(
            <Wrapper>
                <Button isEnabled={false}>
                    <Spinner />
                </Button>
                <Button isEnabled={false}>
                    <Spinner />
                </Button>
                <Button isEnabled={false}>
                    <Spinner />
                </Button>
            </Wrapper>
        )
    } else {
        return(
            <Wrapper>
                <Button 
                    isEnabled={true}
                    onClick={ gradeSolution }
                >
                    Grade Solution
                </Button>
                <Button 
                    isEnabled={ !buttonState.proofAwaiting && !!account }
                    onClick={ proof ? verifyProof : generateProof }
                >
                    { proof ? 
                        buttonState.proofAwaiting ? <Spinner /> : 'Verify Proof'
                        :
                        buttonState.proofAwaiting ? <Spinner /> : 'Generate Proof'
                    }
                </Button>
                <Button 
                    isEnabled={ proof && NAMES_TO_CHAIN_IDS.polygon_mumbai === chainId && !buttonState.proofAwaiting && !buttonState.txAwaiting }
                    onClick={ sendTransaction }
                >
                    { buttonState.txAwaiting ? <Spinner /> : 'Send Transaction'}
                </Button>
            </Wrapper>
        )
    }
}