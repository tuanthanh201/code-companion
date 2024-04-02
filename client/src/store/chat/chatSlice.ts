import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChatMessage {
	id: string;
	direction: 'incoming' | 'outgoing';
	message: string;
	sender: string;
}

interface ChatState {
  chat: {
    [userName: string]: {
      messages: ChatMessage[]
      userThumbnail: string
    }
  }
  currentUser: string
}

const initialState: ChatState = {
  chat: {
    Zoe: {
      messages: [],
      userThumbnail: "/avatars/av-1.svg"
    },
    Nia: {
      messages: [],
      userThumbnail: "/avatars/av-2.svg"
    },
    Mei: {
      messages: [],
      userThumbnail: "/avatars/av-3.svg"
    },
    Priya: {
      messages: [],
      userThumbnail: "/avatars/av-4.svg"
    },
    Yuki: {
      messages: [],
      userThumbnail: "/avatars/av-5.svg"
    },
    Sofia: {
      messages: [],
      userThumbnail: "/avatars/av-6.svg"
    },
    Natalia: {
      messages: [],
      userThumbnail: "/avatars/av-7.svg"
    }
  },
  currentUser: "av-1"
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    pushChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chat[state.currentUser].messages.push(action.payload)
    },
    clearChatById: (state, action: PayloadAction<string>) => {
      //if the chat is for the current user, then set the current user to next user
      if (state.currentUser === action.payload) {
        const users = Object.keys(state.chat)
        const currentUserIndex = users.indexOf(action.payload)
        const nextUser = users[(currentUserIndex + 1) % users.length]
        state.currentUser = nextUser
      }
      delete state.chat[action.payload]
    },
    clearChats: (state) => {
      state.chat = {}
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload
    },
    addNewChat: (state, action: PayloadAction<string>) => {
      if (state.chat[action.payload]) {
        throw new Error("User already exists")
      }
      state.chat[action.payload] = {
        messages: [],
        userThumbnail: `/avatars/av-${Math.floor(Math.random() * 7) + 1}.svg`
      }
    }
  }
})

export const {
  addNewChat,
  clearChatById,
  clearChats,
  pushChatMessage,
  setCurrentUser
} = chatSlice.actions

export const chatReducer = chatSlice.reducer;
