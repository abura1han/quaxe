import { SEND_MESSAGE, GET_PEVIOUS_MESSAGES, ADD_NEW_MESSAGE } from './index'
import { getPreviousMessages } from '../api'

export const sendMessage = (message) => dispatch => {
	dispatch({ type: SEND_MESSAGE, payload: message })
}

export const addNewMessage = (message) => dispatch => {
	dispatch({ type: ADD_NEW_MESSAGE, payload: message })
}

// Get all previous messages
export const getAllPreviousMessages = () => async dispatch => {
	try {
		const messages = await getPreviousMessages();
		dispatch({ type: GET_PEVIOUS_MESSAGES, payload: messages });
	} catch (error) {

	}
}