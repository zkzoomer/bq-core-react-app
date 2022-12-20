import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { bqTest } from "bq-core"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { RxExternalLink } from "react-icons/rx"

import { DEPLOYED_CONTRACTS, PROVIDERS } from "../../constants/chains"
import {
    Wrapper,
    Description,
    LinkIcon,
    Holders, 
    SpinnerWrapper
} from './components'

function Spinner () {
    return(
        <SpinnerWrapper>
            <AiOutlineLoading3Quarters />
        </SpinnerWrapper>
    )
}

function testTypeToText (testType: number) {
    if (testType === 0) return 'Open Answer';
    else if (testType === 100) return 'Multiple Choice';
    else if (testType === 255) return 'Invalid';
    else return 'Mixed'
}

export default function ReadMode() {
    // TODO: define bqTest types
    const [test, setTest] = useState<any>(null)
    const [isHolder, setIsHolder] = useState(null)
    const { account } = useWeb3React();
    
    // first page load, load the test on read mode
    useEffect(() => {
        const fetchData = async () => {
            const readModeTest = await bqTest.readMode(
                '1',
                PROVIDERS.polygon_mumbai,
                DEPLOYED_CONTRACTS.polygon_mumbai.TesterCreator
            )

            setTest(readModeTest)

            const holdersList = await readModeTest.holdersList()
            console.log('List of holders:\n', holdersList)

            if (account) {
                const _isHolder = await readModeTest.holdsCredential(account)
                setIsHolder(_isHolder)
            }
        }
        fetchData()
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchData = async () => {     
            if (test) {
                const _isHolder = await test.holdsCredential(account)
                setIsHolder(_isHolder)
            }
        }
        fetchData()
    }, [account, test])

    return(
        <Wrapper>
            <Description>
                <div style={{fontWeight: 600, fontSize: `1.3rem`}}>
                    Test #0001
                    <LinkIcon href={test ? test.URI : null} target="_blank">
                        <RxExternalLink />
                    </LinkIcon>
                </div>
                <div>
                    { test ? 
                        test.stats.credentialsGained 
                        : 
                        <Spinner />
                    }
                </div>
                <div>
                    Minimum grade:&nbsp;&nbsp;
                    { test ? 
                        test.stats.minimumGrade + '/100' 
                        : 
                        <Spinner />
                    }
                </div>
                <div>
                    Test type:&nbsp;&nbsp;
                    { test ? 
                        testTypeToText(test.stats.testType) 
                        : 
                        <Spinner />
                    }
                </div>
            </Description>
            <Holders>
                <div>
                    Total credential holders:&nbsp;&nbsp;
                    { test ? 
                        test.stats.solvers
                        : 
                        <Spinner />
                    }
                </div>
                <div style={{fontFamily: 'Inter ExtraLight'}}>
                    { isHolder !== null ? 
                        `You ${isHolder ? '' : 'do not'} hold this credential`
                        : 
                        <Spinner />
                    }
                </div>
            </Holders>
        </Wrapper>
    )
}