import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatBotName = 'Zoe' | 'Aria' | 'Ethan' | 'Liam';

export type ChatType = 'GPT' | 'LLaMA';

export interface ChatMessage {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
}

export interface ChatMessageNamed extends ChatMessage {
	chatBotName: ChatBotName;
}

interface ChatState {
	chat: {
		Zoe: {
			messages: ChatMessage[];
			type: ChatType;
			userThumbnail: string;
		};
		Aria: {
			messages: ChatMessage[];
			type: ChatType;
			userThumbnail: string;
		};
		Ethan: {
			messages: ChatMessage[];
			type: ChatType;
			userThumbnail: string;
		};
		Liam: {
			messages: ChatMessage[];
			type: ChatType;
			userThumbnail: string;
		};
	};
	currentUser: ChatBotName;
}

const initialState: ChatState = {
	chat: {
		Zoe: {
			messages: [],
			userThumbnail: '/avatars/Zoe.svg',
			type: 'GPT',
		},
		Aria: {
			messages: [],
			userThumbnail: '/avatars/Aria.svg',
			type: 'GPT',
		},
		Ethan: {
			messages: [],
			userThumbnail: '/avatars/Ethan.svg',
			type: 'GPT',
		},
		Liam: {
			messages: [],
			userThumbnail: '/avatars/Liam.svg',
			type: 'GPT',
		},
	},
	currentUser: 'Zoe',
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		pushChatMessage: (state, action: PayloadAction<ChatMessage>) => {
			state.chat[state.currentUser].messages.push(action.payload);
		},
		pushChatMessageToName: (state, action: PayloadAction<ChatMessageNamed>) => {
			if (state.chat[action.payload.chatBotName])
				state.chat[action.payload.chatBotName].messages.push({
					id: action.payload.id,
					direction: action.payload.direction,
					message: action.payload.message,
					sender: action.payload.sender,
				});
		},
		setCurrentUser: (state, action: PayloadAction<ChatBotName>) => {
			state.currentUser = action.payload;
		},
		// set messages and type
		// TODO: call this in compare (?)
		setChatById: (
			state,
			action: PayloadAction<{
				chatBotName: ChatBotName;
				messages: ChatMessage[];
				type: ChatType;
			}>
		) => {
			const { chatBotName, messages, type } = action.payload;
			state.chat[chatBotName].messages = messages;
			state.chat[chatBotName].type = type;
		},
	},
});

export const {
	pushChatMessage,
	pushChatMessageToName,
	setCurrentUser,
	setChatById,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
