import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../';
import { ChatMessage, pushChatMessage } from './chatSlice';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

interface Prompt {
	model: string;
	conversation: ChatMessage[];
	currentUser: string;
}

export const sendPrompt = (prompt: Prompt) => {
	return async (dispatch: AppDispatch) => {
		// TODO: use prompt to determine model
		const client = new OpenAI({
			apiKey: import.meta.env.VITE_API_KEY,
			baseURL: 'https://api.together.xyz/v1',
			dangerouslyAllowBrowser: true,
		});
		const messages: ChatCompletionMessageParam[] = prompt.conversation.map(
			(message) => {
				return {
					role: message.sender === 'User' ? 'user' : 'system',
					content: message.message,
				};
			}
		);
		const params: OpenAI.Chat.ChatCompletionCreateParams = {
			messages,
			model: prompt.model,
		};
		const response: OpenAI.Chat.ChatCompletion =
			await client.chat.completions.create(params);

		if (response.choices[0].message.content) {
			dispatch(
				pushChatMessage({
					id: uuidv4(),
					direction: 'incoming',
					message: response.choices[0].message.content,
					sender: prompt.currentUser,
				})
			);
		}
	};
};
