import { AppDispatch } from '../';
import { saveUserAction, logoutAction } from './authSlice';

export interface RegisterInput {
	username: string;
	password: string;
}

export interface LoginInput {
	username: string;
	password: string;
}

export const login = (params: LoginInput) => {
	return async (dispatch: AppDispatch) => {
		// TODO: Make an API request to login
		// If successful, dispatch the save user action
		dispatch(saveUserAction(params.username));
	};
};

export const logout = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(logoutAction());
	};
};

export const register = (params: RegisterInput) => {
	return async (dispatch: AppDispatch) => {
		// TODO: Make an API request to register
		// If successful, dispatch the save user action
		dispatch(saveUserAction(params.username));
	};
};
