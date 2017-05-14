const badRequestMiddleware = (err, req, res, next) => {
	res.status(err.status || 500);
	res.send({ error: err.message });
};

export default badRequestMiddleware;