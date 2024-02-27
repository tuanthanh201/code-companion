import { ChakraProvider } from '@chakra-ui/react';
import Hero from './components/Hero';

const App = () => {
	return (
		<ChakraProvider>
			<Hero />
		</ChakraProvider>
	);
};

export default App;
