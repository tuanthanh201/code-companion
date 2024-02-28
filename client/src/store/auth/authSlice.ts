import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	email: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		logout: (state) => {
			state.email = '';
		},
	},
});

export const { saveUser: saveUserAction, logout: logoutAction } = authSlice.actions;

export const authReducer = authSlice.reducer;
