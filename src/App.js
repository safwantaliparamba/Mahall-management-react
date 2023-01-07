import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import './assets/css/style.css';
import AuthRouter from './components/routers/AuthRouter';
import MainRouter from './components/routers/MainRouter';
import PrivateRoute from './components/routers/routes/PrivateRoute';
import NetworkError from "./components/modal/NetworkError";


function App() {
	const hasNetworkError = useSelector(state => state.auth.networkError)

	useEffect(() => {
		window.addEventListener("contextmenu", e => e.preventDefault());
	}, [])

	return (
		<>
			<Routes>
				<Route path='/auth/*' element={<AuthRouter />}  />
				<Route path='/*' element={(
					<PrivateRoute>
						<MainRouter />
					</PrivateRoute>
				)} />
			</Routes>
			{hasNetworkError && <NetworkError />}
		</>
	);
}

export default App;