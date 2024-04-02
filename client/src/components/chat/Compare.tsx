import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { pushChatMessageToName } from '../../store/chat/chatSlice';
import { Avatar, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { addNewChat } from '../../store/chat/chatSlice';
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
	MessageSeparator
} from '@chatscope/chat-ui-kit-react';


const Compare = () => {
	const dispatch = useAppDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [modalPage, setModalPage] = useState<0 | 1>(0);
	const [name_compA, setName_compA] = useState('');
	const [type_compA, setType_compA] = useState<'GPT' | 'LLaMA'>('GPT');
	const [name_compB, setName_compB] = useState('');
	const [type_compB, setType_compB] = useState<'GPT' | 'LLaMA'>('GPT');

	// Open modal on page load
	useEffect(()=>{
		onOpen();
	},[]);

	function createNewUser(onClose: () => void) {
		try {
			if (
				name_compA.length === 0 ||
				name_compA.length > 10 ||
				!/^[a-zA-Z]+$/.test(name_compA) ||
				name_compB.length === 0 ||
				name_compB.length > 10 ||
				!/^[a-zA-Z]+$/.test(name_compB)
			)
				throw new Error('Invalid name');
			dispatch(addNewChat({ 'name': name_compA, 'type': type_compA }));
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
			<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Compare</ModalHeader>
					<ModalBody>
						{(modalPage === 0) ?
							<>
								<FormControl isInvalid={isError}>
									<FormLabel htmlFor='name'>Companion #1</FormLabel>
									<Input
										placeholder='Name'
										value={name_compA}
										onChange={(e) => {
											setName_compA(e.target.value);
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
										value={type_compA}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
											setType_compA(e.target.value as 'GPT' | 'LLaMA')
										}
									>
										<option value='GPT'>GPT</option>
										<option value='LLaMA'>LLaMA</option>
									</Select>
								</FormControl>
							</>
							:
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
						}
					</ModalBody>
					<ModalFooter>
						{(modalPage === 0) ?
								<Button colorScheme={'blue'} ml={3} onClick={()=>{setModalPage(1)}}>Continue</Button>
							:
							<>
								<Button colorScheme={'gray'} ml={3} style={{margin: "0 auto 0 0"}} onClick={()=>{setModalPage(0)}}>Back</Button>
								<Button colorScheme={'blue'} ml={3} onClick={()=>{createNewUser(onClose)}}>Create</Button>
							</>
						}
					</ModalFooter>
				</ModalContent>
			</Modal>
			<CompareContent chatName={name_compA} />
			<div style={{ height: "100%", width: "6px", backgroundColor: "#c6e3fa", position: "relative", zIndex: 500, left: "calc(50%)"  }} />
			<CompareContent chatName={name_compB} />
		</MainContainer>
	);
};

const CompareContent = (props: {chatName: string}) => {
	const dispatch = useAppDispatch();
	const { chat } = useAppSelector(
		(state: RootState) => state.chat
	);
	const currentChat = chat[props.chatName];
	if (!currentChat) {
		return null;
	}
	const { messages, type, userThumbnail } = currentChat;

	return (
		<ChatContainer>
			<ConversationHeader>
				<ConversationHeader.Back />
				<Avatar name={props.chatName} src={userThumbnail} />
				<ConversationHeader.Content userName={props.chatName} />
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
				onSend={(_, textContent) =>
					dispatch(
						pushChatMessageToName({
							id: uuidv4(),
							direction: 'outgoing',
							message: textContent,
							sender: 'User',
							chatName: props.chatName
						})
					)
				}
			/>
		</ChatContainer>
	);
};

export default Compare;