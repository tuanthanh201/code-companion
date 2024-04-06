import { ChakraProvider } from '@chakra-ui/react';
import Hero from './components/Hero';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
} from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import theme from './theme';
import { useAppSelector } from './store';
import Chat from './components/chat/Chat';
import Compare from './components/chat/Compare';

const Private = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	if (!isLoggedIn) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};

const Public = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);
	if (isLoggedIn) {
		return <Navigate to='/chat' />;
	}

	return <Outlet />;
};

const App = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={isLoggedIn ? <Chat /> : <Hero />} />
					<Route element={<Public />}>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>
					<Route element={<Private />}>
						<Route path='/chat' element={<Chat />} />
						<Route path='/compare' element={<Compare />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
