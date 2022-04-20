function flashDataToSession(req, data, action) {
  // get data from req and perform action callback after session is saved
  req.session.flashedData = data;
  req.session.save(action);
}

function getSessionData(req) {
  // clear the session flashedData
  const sessionData = req.session.flashedData;
  req.session.flashedData = null;
  return sessionData;
}

module.exports = {
  flashDataToSession: flashDataToSession,
  getSessionData: getSessionData
};