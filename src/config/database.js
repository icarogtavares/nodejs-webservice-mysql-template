import mysql  from 'mysql';

const createDBConnection = () => {
	
	if (!process.env.NODE_ENV || process.env.node === 'dev') {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'test'
		});
	}

	if (process.env.NODE_ENV === 'test') {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'test'
		});
	}

	if (process.env.NODE_ENV == 'production') {
		var url = process.env.CLEARDB_DATABASE_URL;
		var dbUrlParams = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
		return mysql.createConnection({
			host:dbUrlParams[3],
			user:dbUrlParams[1],
			password:dbUrlParams[2],
			database:dbUrlParams[4]
		});
	}
}

export default createDBConnection