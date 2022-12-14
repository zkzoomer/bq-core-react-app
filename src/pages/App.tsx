import styled from 'styled-components';

import '../styles/app.css';
import TopLevelModals from '../components/Modals/topLevelModals';
import Header from '../components/Header';
import ReadMode from '../components/ReadMode';
import SetSolution from '../components/SetSolution';
import SolveMode from '../components/SolveMode';
import Footer from '../components/Footer';
import { theme } from '../styles';

const Wrapper = styled.div`
	min-height: calc(100vh - 121px);
	width: 100%;
	display: flex;
	flex-direction: column;
    justify-content: space-between;
    align-items: center;

	@media screen and (max-width: ${theme.breakpoint}px) {
        height: 100%;
    }

	> * {
		display: flex;
		flex: auto;
		flex-direction: row;
		align-items: center;

		@media screen and (max-width: ${theme.breakpoint}px) {
			flex-direction: column;
			width: 90% !important;
    	}
	}
`

function App() {
	return (
		<>
			<TopLevelModals/>
			<Header />
			<Wrapper>
				<ReadMode />
				<SetSolution />
				<SolveMode />
			</Wrapper>
			<Footer />
		</>
	);
}

export default App;
