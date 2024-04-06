import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	username: '',
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.username = '';
			state.isLoggedIn = false;
		},
	},
});

export const { saveUser: saveUserAction, logout: logoutAction } =
	authSlice.actions;

export const authReducer = authSlice.reducer;
