import { ChakraProvider } from '@chakra-ui/react';
import Hero from './components/Hero';

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import theme from './theme';
import { useAppSelector } from './store';
import Chat from './components/chat/Chat';
import Compare from './components/chat/Compare';


const Public = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	if (isLoggedIn) return <Outlet />
	else return <Navigate to="/login" />
}

const Private = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	if (isLoggedIn) return <Navigate to="/" />
	else return <Outlet />
}

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					{/* TODO: revert this */}
					<Route element={<Private />} >
						<Route path='/' element={<Chat />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/compare' element={<Compare />} />
					</Route>
					<Route element={<Public />} >
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
