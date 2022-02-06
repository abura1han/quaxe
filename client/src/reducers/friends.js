import { ADD_FRIEND, GET_ALL_FRIENDS } from '../actions'

export const friendsReducer = (state = "", action) => {
	switch (action.type) {
		case GET_ALL_FRIENDS:
			return action.payload ? action.payload.friends : state;

		case ADD_FRIEND:
			return action.payload ? [...state, action.payload] : state;

		default:
			return state;
	}
}