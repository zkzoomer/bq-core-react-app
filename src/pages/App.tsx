import { useDispatch } from 'react-redux'

import '../styles/App.css';
import { TopLevelModals } from '../components/Modals/topLevelModals';
import { Header } from '../components/header';


function App() {
	const dispatch = useDispatch()

	return (
		<>
			<TopLevelModals/>
			<Header />
			might  need bout tree fiddy
		</>
	);
}

export default App;
