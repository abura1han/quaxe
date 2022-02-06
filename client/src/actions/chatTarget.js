import { CHAT_TARGET } from './index'

export const chatTarget = (userData) => dispatch => {
	dispatch({ type: CHAT_TARGET, payload: userData });
}