import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatType = 'GPT' | 'LLaMA' | 'Mistral' | 'Puppet';

export interface ChatMessage {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
}

export interface ChatMessageNamed extends ChatMessage {
	chatBotName: string;
}

interface ChatState {
	chat: {
		[key: string]: {
			messages: ChatMessage[];
			type: ChatType;
			userThumbnail: string;
			puppet: string;
		}
	};
	currentUser: string;
}

const initialState: ChatState = {
	chat: {
		Zoe: {
			messages: [],
			userThumbnail: '/avatars/Zoe.svg',
			type: 'Mistral',
			puppet: ''
		},
		Aria: {
			messages: [],
			userThumbnail: '/avatars/Aria.svg',
			type: 'Mistral',
			puppet: ''
		},
		Ethan: {
			messages: [],
			userThumbnail: '/avatars/Ethan.svg',
			type: 'Mistral',
			puppet: ''
		},
		Liam: {
			messages: [],
			userThumbnail: '/avatars/Liam.svg',
			type: 'Mistral',
			puppet: ''
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
		setCurrentUser: (state, action: PayloadAction<string>) => {
			state.currentUser = action.payload;
		},
		// set messages and type
		// TODO: call this in compare (?)
		setChatById: (
			state,
			action: PayloadAction<{
				chatBotName: string;
				messages: ChatMessage[];
				type: ChatType;
			}>
		) => {
			const { chatBotName, messages, type } = action.payload;
			state.chat[chatBotName].messages = messages;
			state.chat[chatBotName].type = type;
		},
		addNewChat: (
			state,
			action: PayloadAction<{
				name: string;
				type: ChatType;
			}>
		) => {
			const { name, type } = action.payload;
			if (state.chat[name]) {
				throw new Error('User already exists');
			}
			state.chat[name] = {
				messages: [],
				userThumbnail: `/avatars/av-3.svg`,
				type: type,
				puppet: ''
			};
		},
		addNewChatPuppet: (
			state,
			action: PayloadAction<{
				name: string;
				puppet: string;
				type: ChatType;
			}>
		) => {
			const { name, puppet, type } = action.payload;
			if (state.chat[name]) {
				throw new Error('User already exists');
			}
			state.chat[name] = {
				messages: [],
				userThumbnail: `/avatars/${puppet}.svg`,
				type: type,
				puppet: puppet
			};
		},
	},
});

export const {
	pushChatMessage,
	pushChatMessageToName,
	setCurrentUser,
	setChatById,
	addNewChat,
	addNewChatPuppet
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
