import { GET_PROFILE } from '../actions'

const profileReducer = (state = "", action) => {
	switch (action.type) {
		case GET_PROFILE:
			return action.payload;

		default:
			return state;
	}
}

export default profileReducer;