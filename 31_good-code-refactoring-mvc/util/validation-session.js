function getSessionErrorData(req) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: "",
      content: "",
    };
  }

  req.session.inputData = null;

  return sessionInputData;
}

function flasErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data
  };

  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flasErrorsToSession: flasErrorsToSession
};
