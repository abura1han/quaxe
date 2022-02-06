import { ADD_FRIEND, GET_ALL_FRIENDS } from './index'
import * as api from '../api'

export const getAllFriends = () => async (dispatch) => {
	try {
		const friends = await api.getAllFriends();
		dispatch({ type: GET_ALL_FRIENDS, payload: friends.data });
	} catch (error) {
		console.error(error);
	}
}

export const addFriend = (user) => async (dispatch) => {
	try {
		const friend = await api.addFriend(user._id);
		if (friend.success)
			dispatch({ type: ADD_FRIEND, payload: user });
	} catch (error) {
		console.error(error);
	}
}