import Cookies from "js-cookie"
import appConfigs from "../appConfig"

const headers = {
	"Content-Type": "application/json",
	authorization: `Bearer ${Cookies.get("access_token")}`
}

//
// Get profile
// 
export const getProfile = async () => {
	try {
		const profile = await fetch(`${appConfigs.serverUrl}/api/profile`, {
			headers
		});
		return await profile.json();

	} catch (error) {
		console.error(error)
	}
}


//
// Get all friends
// 
export const getAllFriends = async () => {
	try {
		const friends = await fetch(`${appConfigs.serverUrl}/api/friend/all`, {
			headers
		});
		return await friends.json();

	} catch (error) {
		console.error(error)
	}
}

//
// Add friend
// 
export const addFriend = async (userId) => {
	try {
		const friend = await fetch(`${appConfigs.serverUrl}/api/friend/add_new`, {
			method: "POST",
			headers,
			body: JSON.stringify({
				friend_id: userId,
			})
		});
		return await friend.json();

	} catch (error) {
		console.error(error)
	}
}

//
// Remove friend
// 
export const removeFriend = async () => {
	try {
		const friend = await fetch(`${appConfigs.serverUrl}/api/friend/remove`, {
			method: "DELETE",
			headers
		});
		return await friend.json();

	} catch (error) {
		console.error(error)
	}
}

//
// Get previous messages
// 
export const getPreviousMessages = async () => {
	try {
		const messages = await fetch(`${appConfigs.serverUrl}/api/message/all`, {
			headers
		});
		return await messages.json();

	} catch (error) {
		console.error(error)
	}
}

//
// Get people
// 
export const getPeople = async () => {
	try {
		const people = await fetch(`${appConfigs.serverUrl}/api/users`, {
			headers
		});
		return await people.json();

	} catch (error) {
		console.error(error)
	}
}