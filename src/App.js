import styled from 'styled-components';
import { Routes, Route } from "react-router-dom";
import './assets/css/style.css';
// import Login from './components/screens/Login';
import AuthRouter from './components/routers/AuthRouter';
import MainRouter from './components/routers/MainRouter';
import PrivateRoute from './components/routers/routes/PrivateRoute';

function App() {
	return (
		<Routes>
			<Route path='/auth/*' element={<AuthRouter />} />
			<Route path='/*' element={(
				<PrivateRoute>
					<MainRouter />
				</PrivateRoute>
			)} />
		</Routes>
	);
}

export default App;