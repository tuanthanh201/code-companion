import {
	Avatar,
	ChatContainer,
	ConversationHeader,
	Message,
	MessageInput,
	MessageList,
	MessageSeparator,
	TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { ChatMessage } from '../../store/chat/chatSlice';

const messages: ChatMessage[] = [
	{
		id: '1',
		direction: 'incoming',
		message: 'Hello my friend',
		sender: 'Zoe',
		sentTime: '15 mins ago',
	},
	{
		id: '2',
		direction: 'outgoing',
		message: 'Hello my friend',
		sender: 'Patrik',
		sentTime: '15 mins ago',
	},
];

const ChatContent = () => {
	return (
		<ChatContainer>
			<ConversationHeader>
				<ConversationHeader.Back />
				<Avatar
					name='Zoe'
					src='https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'
				/>
				<ConversationHeader.Content
					// info='Active 10 mins ago'
					userName='Zoe'
				/>
				{/* <ConversationHeader.Actions>
      <VoiceCallButton />
      <VideoCallButton />
      <EllipsisButton orientation='vertical' />
    </ConversationHeader.Actions> */}
			</ConversationHeader>
			<MessageList
				typingIndicator={<TypingIndicator content='Zoe is typing' />}
			>
				<MessageSeparator content='Saturday, 30 November 2019' />
				{messages.map((message) => (
					<Message
						key={message.id}
						model={{ ...message, position: 'normal' }}
					/>
				))}
			</MessageList>
			<MessageInput placeholder='Type message here' />
		</ChatContainer>
	);
};

export default ChatContent;
