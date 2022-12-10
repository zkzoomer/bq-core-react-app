import styled from 'styled-components';

import '../styles/app.css';
import TopLevelModals from '../components/Modals/topLevelModals';
import Header from '../components/Header';
import ReadMode from '../components/ReadMode';
import SetSolution from '../components/SetSolution';
import SolveMode from '../components/SolveMode';
import Footer from '../components/Footer';

const Wrapper = styled.div`
	height: calc(100vh - 121px);
	width: 100%;
	display: flex;
	flex-direction: column;
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
