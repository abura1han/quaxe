import { SET_NOTIFICATION } from './index'

const setNotification = ({ type, msg }) => dispatch => {
	dispatch({ type: SET_NOTIFICATION, payload: { type, msg } });
}

export default setNotification;