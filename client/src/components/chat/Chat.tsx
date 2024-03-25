import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import ChatSideBar from './ChatSideBar';
import ChatContent from './ChatContent';

const Chat = () => {
	return (
		<MainContainer
			responsive
			style={{
				height: '100vh',
			}}
		>
			<ChatSideBar />
			<ChatContent />
		</MainContainer>
	);
};

export default Chat;
