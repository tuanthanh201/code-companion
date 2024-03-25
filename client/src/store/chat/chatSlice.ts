import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatMessage {
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
	sendTime: string;
}

interface ChatState {
	chat: {
		[user: string]: {
			messages: ChatMessage[];
		};
	};
}

const initialState: ChatState = {
	chat: {},
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		pushChatMessage: (
			state,
			action: PayloadAction<{ user: string; message: ChatMessage }>
		) => {
			if (!state.chat[action.payload.user]) {
				state.chat[action.payload.user] = {
					messages: [action.payload.message],
				};
			} else {
				state.chat[action.payload.user].messages.push(action.payload.message);
			}
		},
		clearChatById: (state, action: PayloadAction<string>) => {
			delete state.chat[action.payload];
		},
		clearChats: (state) => {
			state.chat = {};
		},
	},
});

export const { clearChatById, clearChats } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
