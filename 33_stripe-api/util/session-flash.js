function getSessionData(req) {
	// clear the session flashedData
	const sessionData = req.session.flashedData;
	req.session.flashedData = null;
	return sessionData;
}

function flashDataToSession(req, data, action) {
	// set session data and perform action callback after session is saved
	req.session.flashedData = data;
	req.session.save(action);
}

module.exports = {
	getSessionData: getSessionData,
	flashDataToSession: flashDataToSession
};