import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChatMessage {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
}

interface ChatState {
	chat: {
		[user: string]: {
			messages: ChatMessage[];
		};
	};
	currentUser: string;
}

const initialState: ChatState = {
	chat: {
		Zoe: {
			messages: [],
		},
		Nia: {
			messages: [],
		},
		Mei: {
			messages: [],
		},
		Priya: {
			messages: [],
		},
		Yuki: {
			messages: [],
		},
		Sofia: {
			messages: [],
		},
		Natalia: {
			messages: [],
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
		clearChatById: (state, action: PayloadAction<string>) => {
			delete state.chat[action.payload];
		},
		clearChats: (state) => {
			state.chat = {};
		},
		setCurrentUser: (state, action: PayloadAction<string>) => {
			state.currentUser = action.payload;
		},
	},
});

export const { clearChatById, clearChats, pushChatMessage, setCurrentUser } =
	chatSlice.actions;

export const chatReducer = chatSlice.reducer;
