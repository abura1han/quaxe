import { GET_PEOPLE } from '../actions'

export const peopleReducer = (state = "", action) => {
	switch (action.type) {
		case GET_PEOPLE:
			return action.payload.data;

		default:
			return state;
	}
}