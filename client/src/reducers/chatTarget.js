import { CHAT_TARGET } from '../actions'

const chatTargetReducer = (state = "", action) => {
	switch (action.type) {
		case CHAT_TARGET:
			return action.payload;

		default:
			return state;
	}
}

export default chatTargetReducer;