import { SEND_MESSAGE, GET_PEVIOUS_MESSAGES, ADD_NEW_MESSAGE } from '../actions'

export const sendMessageReducer = (state = "", action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			return action.payload;
		default:
			return state;
	}
}

export const messagesReducer = (state = "", action) => {
	switch (action.type) {
		case GET_PEVIOUS_MESSAGES:
			return action.payload.data;

		case ADD_NEW_MESSAGE:
			return [...state, action.payload];

		default:
			return state;
	}
}