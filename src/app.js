import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes';
import middlewaresBeforeRoutes from './middlewares/before';
import middlewaresAfterRoutes from './middlewares/after';

const app = express();

const options = {
	customValidators: {
    	isArray: function(value) {
        	return Array.isArray(value);
    	}
 	}
}

const configureExpress = () => {
	app.use(helmet());
	app.use(helmet.noCache());
	app.use(morgan('common'));
	// app.use(express.static(__dirname + '/public'));

	app.use(bodyParser.json());
	app.use(expressValidator(options));

	// app.use(middlewaresBeforeRoutes);
	app.use(routes);
	app.use(middlewaresAfterRoutes);

	return app;
}

export default configureExpress;