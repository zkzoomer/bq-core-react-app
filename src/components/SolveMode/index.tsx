
import {
    Wrapper,
    Button
} from "./components"

export default function SolveMode() {
    return(
        <Wrapper>
            <Button isEnabled={true}>
                Grade Solution
            </Button>
            <Button isEnabled={true}>
                Generate Proof
            </Button>
            <Button isEnabled={false}>
                Send Transaction
            </Button>
        </Wrapper>
    )
}