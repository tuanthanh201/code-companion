import {
	Avatar,
	Conversation,
	ConversationHeader,
	ConversationList,
	Sidebar,
} from '@chatscope/chat-ui-kit-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	clearChatById,
	setCurrentUser,
	addNewChat,
} from '../../store/chat/chatSlice';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

const ChatSideBar = () => {
	const { chat, currentUser } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [newChatName, setNewChatName] = useState('');

	function createNewUser(onClose: () => void) {
		try {
			if (
				newChatName.length === 0 ||
				newChatName.length > 10 ||
				!/^[a-zA-Z]+$/.test(newChatName)
			)
				throw new Error('Invalid name');
			dispatch(addNewChat(newChatName));
			//exit the modal
			onClose();
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setErrorMessage(e.message);
			setIsError(true);
		}
	}

	return (
		<Sidebar position='left'>
			<ConversationHeader>
				<Avatar name='User' src='/avatars/User.svg' />
				<ConversationHeader.Content userName='User' />
			</ConversationHeader>
			<ConversationList>
				{Object.keys(chat).map((name) => {
					const lastMessage = chat[name].messages.slice(-1)[0];
					const lastMessageSender = lastMessage?.sender;
					const lastMessageContent = lastMessage?.message;
					let info = '';
					if (lastMessageContent && lastMessageSender) {
						const sender = lastMessageSender === 'User' ? 'You' : name;
						info = `${sender}: ${lastMessageContent.slice(0, 15)}`;
					}

					return (
						<Conversation
							key={`${name}-chat`}
							active={name === currentUser}
							onClick={() => dispatch(setCurrentUser(name))}
							name={name}
							info={info}
						>
							<Avatar
								name='Lilly'
								src={chat[name].userThumbnail}
								status='available'
							/>
							<Conversation.Content />
							<Conversation.Operations visible>
								<IconButton
									icon={<DeleteIcon />}
									aria-label={''}
									variant={'ghost'}
									size={'md'}
									onClick={(e) => {
										e.stopPropagation();
										dispatch(clearChatById(name));
									}}
								/>
							</Conversation.Operations>
						</Conversation>
					);
				})}
				<Conversation active={false} style={{ background: 'none' }}>
					<Conversation.Content name={'New Conversation'}>
						<Button
							rightIcon={<AddIcon />}
							colorScheme={'lightgrey'}
							variant='ghost'
							size={'sm'}
							transition=' 0.8s'
							_hover={{ bg: 'lightblue' }}
							onClick={onOpen}
						>
							New Conversation
						</Button>
						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>New Conversation</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<FormControl isInvalid={isError}>
										<Input
											placeholder='Name'
											onChange={(e) => {
												setNewChatName(e.target.value);
												setIsError(false);
											}}
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													createNewUser(onClose);
												}
											}}
										/>
										{isError && (
											<FormErrorMessage>
												{errorMessage || 'Invalid name'}
											</FormErrorMessage>
										)}
									</FormControl>
								</ModalBody>
								<ModalFooter>
									<Button
										colorScheme={'blue'}
										ml={3}
										onClick={() => {
											createNewUser(onClose);
										}}
									>
										Create
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Conversation.Content>
				</Conversation>
			</ConversationList>
		</Sidebar>
	);
};

export default ChatSideBar;
