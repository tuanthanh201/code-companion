import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const Register = () => {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} w={'2xl'} py={12} px={6}>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Sign up
				</Heading>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id='email' isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type='email' />
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input type='password' />
						</FormControl>
						<Button
							// loadingText='Submitting'
							// size='lg'
							bg={'red.400'}
							color={'white'}
							_hover={{
								bg: 'red.500',
							}}
						>
							Register
						</Button>
						<Link to={'/login'}>
							<Text align={'center'}>
								Already a user?{' '}
								<Text as={'span'} color={'blue.400'}>
									Login instead
								</Text>
							</Text>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
