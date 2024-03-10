import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	email: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		saveUser: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
      state.isLoggedIn = true;
		},
		logout: (state) => {
			state.email = '';
      state.isLoggedIn = false;
		},
	},
});

export const { saveUser: saveUserAction, logout: logoutAction } = authSlice.actions;

export const authReducer = authSlice.reducer;
