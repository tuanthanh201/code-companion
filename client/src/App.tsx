import { ChakraProvider } from '@chakra-ui/react';
import Hero from './components/Hero';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import theme from './theme';
import { useAppSelector } from './store';
import Chat from './components/chat/Chat';

const App = () => {
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
          {/* TODO: revert this */}
					<Route path='/' element={<Chat />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
