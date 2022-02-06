//
// Express validator error checker and formater
// 
const expValidation = (validationData) => {
	try {
		if (!validationData.isEmpty()) {
			return validationData.array();
		}

		return false;
	} catch (error) {
		console.error(error);
	}
}

module.exports = { expValidation };