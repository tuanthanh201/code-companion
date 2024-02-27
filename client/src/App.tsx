import { ChakraProvider } from '@chakra-ui/react';
import Hero from './components/Hero';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import theme from './theme';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<Hero />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
