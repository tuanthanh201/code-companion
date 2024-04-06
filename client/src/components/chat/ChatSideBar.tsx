import {
	Avatar,
	Conversation,
	ConversationHeader,
	ConversationList,
	Sidebar,
} from '@chatscope/chat-ui-kit-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrentUser, ChatBotName } from '../../store/chat/chatSlice';
import { Search2Icon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ChatSideBar = () => {
	const { chat, currentUser } = useAppSelector((state) => state.chat);
	const { username } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<Sidebar position='left'>
			<ConversationHeader>
				<Avatar name='User' src='/avatars/User.svg' />
				<ConversationHeader.Content userName={username} />
			</ConversationHeader>
			<Button
				rightIcon={<Search2Icon />}
				colorScheme={'lightgrey'}
				variant='ghost'
				size={'sm'}
				transition=' 0.8s'
				_hover={{ bg: 'lightblue' }}
				onClick={() => navigate('/compare')}
				style={{ margin: '20px 15px 0 15px', height: 55 }}
			>
				Compare
			</Button>
			<ConversationList>
				<Conversation active={false} style={{ background: 'none' }}>
					<Conversation.Content
						name={'New Conversation'}
						style={{ overflow: 'visible' }}
					></Conversation.Content>
				</Conversation>
				{Object.keys(chat).map((name) => {
					switch (name) {
						case "Zoe":
						case "Aria":
						case "Ethan":
						case "Liam":
							break;
						default:
							return <></>
					}
					const chatName = name as ChatBotName;
					const lastMessage = chat[chatName].messages.slice(-1)[0];
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
							onClick={() => dispatch(setCurrentUser(chatName))}
							name={name}
							info={info}
						>
							<Avatar
								name='Lilly'
								src={chat[chatName].userThumbnail}
								status='available'
							/>
							<Conversation.Content />
						</Conversation>
					);
				})}
			</ConversationList>
		</Sidebar>
	);
};

export default ChatSideBar;
