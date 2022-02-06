import { GET_PROFILE } from './index'
import * as api from '../api'

export const getProfile = () => async (dispatch) => {
	try {
		const profile = await api.getProfile();
		dispatch({ type: GET_PROFILE, payload: profile.data });
	} catch (error) {
		console.error(error);
	}
}