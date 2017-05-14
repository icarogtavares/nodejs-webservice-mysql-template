const notFoundMiddleware = (req, res) => {
	res.status(404);
	res.send({ error: "Lame, can't find that" });
};

export default notFoundMiddleware;