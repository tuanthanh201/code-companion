import {
	Avatar,
	Conversation,
	ConversationHeader,
	ConversationList,
	Sidebar,
} from '@chatscope/chat-ui-kit-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrentUser } from '../../store/chat/chatSlice';

const ChatSideBar = () => {
	const { chat, currentUser } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();

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
					return (
						<Conversation
							info={lastMessageContent}
							lastSenderName={lastMessageSender}
							name={name}
							key={`${name}-chat`}
							active={name === currentUser}
							onClick={() => dispatch(setCurrentUser(name))}
						>
							<Avatar
								name='Lilly'
								src={`/avatars/${name}.svg`}
								status='available'
							/>
						</Conversation>
					);
				})}
			</ConversationList>
		</Sidebar>
	);
};

export default ChatSideBar;
