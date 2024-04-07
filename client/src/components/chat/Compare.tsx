import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
} from '@chakra-ui/react';
import {
	MainContainer,
	ChatContainer,
	Message,
	MessageInput,
	MessageList,
	MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { ChatMessage, pushChatMessageToName, addNewChat, addNewChatPuppet, setCurrentUser } from '../../store/chat/chatSlice';
import { sendPrompt } from '../../store/chat/chatActions';

const Compare = () => {
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [modalPage, setModalPage] = useState<0 | 1>(0);
	const [name_compA, setName_compA] = useState('');
	const [puppet_compA, setPuppet_compA] = useState('Zoe');
	const [name_compB, setName_compB] = useState('');
	const [type_compB, setType_compB] = useState<'GPT' | 'LLaMA'>('GPT');

	// Open modal on page load
	useEffect(() => {
		onOpen();
	}, []);

	function createNewUser(onClose: () => void) {
		try {
			if (name_compB.length === 0) throw new Error('Invalid name');
			const name_a_uuid = uuidv4();
			setName_compA(name_a_uuid);
			dispatch(addNewChatPuppet({ 'name': name_a_uuid, 'puppet': puppet_compA, 'type': 'Puppet' }));
			dispatch(addNewChat({ 'name': name_compB, 'type': type_compB }));
			onClose();
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setErrorMessage(e.message);
			setIsError(true);
		}
	}

	return (
		<MainContainer
			responsive
			style={{
				height: '100vh',
			}}
		>
			<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Compare</ModalHeader>
					<ModalBody>
						{modalPage === 0 ? (
							<>
								<FormControl>
									<FormLabel htmlFor='type'>Virtual Partner</FormLabel>
									<Select
										value={puppet_compA}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
											setPuppet_compA(e.target.value)
										}
									>
										<option value='Zoe'>Zoe</option>
										<option value='Aria'>Aria</option>
										<option value='Ethan'>Ethan</option>
										<option value='Liam'>Liam</option>
									</Select>
								</FormControl>
							</>
						) : (
							<>
								<FormControl isInvalid={isError}>
									<FormLabel htmlFor='name'>Companion #2</FormLabel>
									<Input
										placeholder='Name'
										value={name_compB}
										onChange={(e) => {
											setName_compB(e.target.value);
											setIsError(false);
										}}
									/>
									{isError && (
										<FormErrorMessage>
											{errorMessage || 'Invalid name'}
										</FormErrorMessage>
									)}
								</FormControl>
								<br />
								<FormControl>
									<FormLabel htmlFor='type'>Type</FormLabel>
									<Select
										value={type_compB}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
											setType_compB(e.target.value as 'GPT' | 'LLaMA')
										}
									>
										<option value='GPT'>GPT</option>
										<option value='LLaMA'>LLaMA</option>
									</Select>
								</FormControl>
							</>
						)}
					</ModalBody>
					<ModalFooter>
						{modalPage === 0 ? (
							<Button
								colorScheme={'blue'}
								ml={3}
								onClick={() => {
									setModalPage(1);
								}}
							>
								Continue
							</Button>
						) : (
							<>
								<Button
									colorScheme={'gray'}
									ml={3}
									style={{ margin: '0 auto 0 0' }}
									onClick={() => {
										setModalPage(0);
									}}
								>
									Back
								</Button>
								<Button
									colorScheme={'blue'}
									ml={3}
									onClick={() => {
										createNewUser(onClose);
									}}
								>
									Create
								</Button>
							</>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
			<CompareContent chatName={name_compA} />
			<div
				style={{
					height: '100%',
					width: '6px',
					backgroundColor: '#c6e3fa',
					position: 'relative',
					zIndex: 500,
					left: 'calc(50%)',
				}}
			/>
			<CompareContent chatName={name_compB} />
		</MainContainer>
	);
};

const CompareContent = (props: { chatName: string }) => {
	const dispatch = useAppDispatch();
	const { chat } = useAppSelector((state: RootState) => state.chat);
	const currentChat = chat[props.chatName];
	if (!currentChat) {
		return null;
	}
	const { messages, type, userThumbnail } = currentChat;

	const onSendHandler = (_: string, textContent: string) => {
		dispatch(setCurrentUser(props.chatName));
		const newMessage: ChatMessage = {
			id: uuidv4(),
			direction: 'outgoing',
			message: textContent,
			sender: 'User',
		};
		const newMessages: ChatMessage[] = [...messages, newMessage];
		dispatch(
			pushChatMessageToName({
				id: uuidv4(),
				direction: 'outgoing',
				message: textContent,
				sender: 'User',
				chatBotName: props.chatName,
			})
		);
		dispatch(
			sendPrompt({
				conversation: newMessages,
				model: (currentChat.type === 'Puppet' || currentChat.type === 'Mistral') ? 'teknium/OpenHermes-2p5-Mistral-7B' : ((currentChat.type === 'LLaMA' ? 'codellama/CodeLlama-7b-Instruct-hf' : 'gpt-3.5-turbo')),
				currentUser: props.chatName,
				puppet: currentChat.puppet
			})
		);
	};

	return (
		<ChatContainer>
			<ConversationHeader>
				<ConversationHeader.Back />
				<Avatar name={props.chatName} src={userThumbnail} />
				<ConversationHeader.Content userName={(currentChat.type === "Puppet") ? currentChat.puppet : props.chatName} />
			</ConversationHeader>
			<MessageList>
				<MessageSeparator content={`Model: ${type}`} />
				{messages.map((message) => (
					<Message
						key={message.id}
						model={{ ...message, position: 'normal' }}
					/>
				))}
			</MessageList>
			<MessageInput
				placeholder='Type message here'
				onSend={onSendHandler}
			/>
		</ChatContainer>
	);
};

export default Compare;
