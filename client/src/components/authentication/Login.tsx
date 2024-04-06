import { useForm, SubmitHandler } from 'react-hook-form';
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
	FormErrorMessage,
	Center,
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { LoginInput, login } from '../../store/auth/authActions';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginInput> = (data) => {
		dispatch(login(data));
		navigate('/');
	};

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
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl id='username' isInvalid={!!errors.username} my={4}>
								<FormLabel htmlFor='username'>Username</FormLabel>
								<Input
									type='text'
									id='username'
									{...register('username', {
										required: 'This is required',
										minLength: {
											value: 5,
											message: 'Minimum length should be 5',
										},
									})}
								/>
								<FormErrorMessage mb={'2'}>
									{errors.username && errors.username.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl id='password' isInvalid={!!errors.password} my={4}>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<Input
									type='password'
									id='password'
									{...register('password', {
										required: 'This is required',
										minLength: {
											value: 5,
											message: 'Minimum length should be 5',
										},
									})}
								/>
								<FormErrorMessage mb={'2'}>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
							<Center>
								<Button
									bg={'red.400'}
									color={'white'}
									_hover={{
										bg: 'red.500',
									}}
									type='submit'
									isLoading={isSubmitting}
								>
									Sign in
								</Button>
							</Center>
						</form>

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
