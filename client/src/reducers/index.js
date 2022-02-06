import { combineReducers } from 'redux'
import chatTargetReducer from './chatTarget';
import { friendsReducer } from './friends';
import { messagesReducer, sendMessageReducer } from './message';
import notificationReducer from './notification';
import { peopleReducer } from './people';
import profileReducer from './profile';

export default combineReducers({
	profile: profileReducer,
	chatTarget: chatTargetReducer,
	sendMessage: sendMessageReducer,
	messages: messagesReducer,
	friends: friendsReducer,
	people: peopleReducer,
	notification: notificationReducer
});