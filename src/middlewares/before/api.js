const apiMiddleware = (req, res, next) => {
	var key = req.query['api-key'];

  	// key isn't present
  	if (!key) return next(error(400, 'api key required'));

  	// key is invalid
  	if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  	// all good, store req.key for route access
  	req.key = key;
  	next();
};

export default apiMiddleware;