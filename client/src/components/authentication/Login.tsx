import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	Text,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} w={'2xl'} py={12} px={6}>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Sign in to your account
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
							bg={'red.400'}
							color={'white'}
							_hover={{
								bg: 'red.500',
							}}
						>
							Sign in
						</Button>

						<Link to={'/register'}>
							<Text align={'center'}>
								Don&apos;t have an account?{' '}
								<Text as={'span'} color={'blue.400'}>
									Register instead
								</Text>
							</Text>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Login;
