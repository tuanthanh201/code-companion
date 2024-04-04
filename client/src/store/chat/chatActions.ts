import OpenAI from 'openai';
import { AppDispatch } from '../';
import { ChatMessage, pushChatMessage } from './chatSlice';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

interface Prompt {
	model: string;
	conversation: ChatMessage[];
}

export const sendPrompt = (prompt: Prompt) => {
	return async (dispatch: AppDispatch) => {
		// TODO: use prompt to determine model
		const client = new OpenAI({
			apiKey: process.env.TOGETHER_API_KEY,
			baseURL: 'https://api.together.xyz/v1',
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
		console.log(response.choices[0].message.content);

		// TODO: push the response to the chat
		if (response.choices[0].message.content) {
			dispatch(
				pushChatMessage({
					id: '1',
					direction: 'outgoing',
					message: response.choices[0].message.content,
					sender: 'User',
				})
			);
		}
	};
};
