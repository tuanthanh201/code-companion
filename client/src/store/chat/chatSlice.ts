import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChatMessage {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
}

export interface ChatMessageNamed {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
	chatName: string;
}

interface ChatState {
	chat: {
		[userName: string]: {
			messages: ChatMessage[];
			type: 'GPT' | 'LLaMA';
			userThumbnail: string;
		};
	};
	currentUser: string;
}

const initialState: ChatState = {
	chat: {
		Zoe: {
			messages: [],
			userThumbnail: '/avatars/av-1.svg',
			type: 'GPT',
		},
		Nia: {
			messages: [],
			userThumbnail: '/avatars/av-2.svg',
			type: 'LLaMA',
		},
		Mei: {
			messages: [],
			userThumbnail: '/avatars/av-3.svg',
			type: 'LLaMA',
		},
		Priya: {
			messages: [],
			userThumbnail: '/avatars/av-4.svg',
			type: 'LLaMA',
		},
		Yuki: {
			messages: [],
			userThumbnail: '/avatars/av-5.svg',
			type: 'GPT',
		},
		Sofia: {
			messages: [],
			userThumbnail: '/avatars/av-6.svg',
			type: 'LLaMA',
		},
		Natalia: {
			messages: [],
			userThumbnail: '/avatars/av-7.svg',
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
			if (state.chat[action.payload.chatName]) state.chat[action.payload.chatName].messages.push({
				id: action.payload.id,
				direction: action.payload.direction,
				message: action.payload.message,
				sender: action.payload.sender
			});
		},
		clearChatById: (state, action: PayloadAction<string>) => {
			//if the chat is for the current user, then set the current user to next user
			if (state.currentUser === action.payload) {
				const users = Object.keys(state.chat);
				const currentUserIndex = users.indexOf(action.payload);
				const nextUser = users[(currentUserIndex + 1) % users.length];
				state.currentUser = nextUser;
			}
			delete state.chat[action.payload];
		},
		clearChats: (state) => {
			state.chat = {};
		},
		setCurrentUser: (state, action: PayloadAction<string>) => {
			state.currentUser = action.payload;
		},
		addNewChat: (
			state,
			action: PayloadAction<{
				name: string;
				type: 'GPT' | 'LLaMA';
			}>
		) => {
			const { name, type } = action.payload;
			if (state.chat[name]) {
				throw new Error('User already exists');
			}
			state.chat[name] = {
				messages: [],
				userThumbnail: `/avatars/av-${Math.floor(Math.random() * 7) + 1}.svg`,
				type,
			};
		},
	},
});

export const {
	addNewChat,
	clearChatById,
	clearChats,
	pushChatMessage,
	pushChatMessageToName,
	setCurrentUser,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
