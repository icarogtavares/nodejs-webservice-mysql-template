import setupApp from './src/app';

function startApp(id) {
	const port = process.env.PORT || 4000;
	setupApp()
		.listen(port, () => console.log(`App running at port ${port}`))
}

export default startApp;