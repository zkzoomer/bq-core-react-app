
import { RxExternalLink } from "react-icons/rx"

import {
    Wrapper,
    Description,
    LinkIcon,
    Holders
} from './components'

export default function ReadMode() {


    return(
        <Wrapper>
            <Description>
                <div style={{fontWeight: 600, fontSize: `1.3rem`}}>
                    Test #[testNumber]
                    <LinkIcon>
                        <RxExternalLink />
                    </LinkIcon>
                </div>
                <div>[testName]</div>
                <div>Minimum grade: [minimumGrade]</div>
                <div>Test type: [testType]</div>
            </Description>
            <Holders>
                <div>
                    Total credential holders: [nHolders]
                </div>
                <div style={{fontFamily: 'Inter ExtraLight'}}>
                    You [do not] hold this credential
                </div>
            </Holders>
        </Wrapper>
    )
}