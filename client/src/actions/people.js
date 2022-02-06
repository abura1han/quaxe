import { GET_PEOPLE } from './index'
import * as api from '../api'

export const getPeople = () => async dispatch => {
	try {
		const people = await api.getPeople();
		dispatch({ type: GET_PEOPLE, payload: people });
	} catch (error) {
		console.error(error);
	}
}