export class QueryHelper {

	constructor(connection) {
		this._connection = connection
	}

	queryPromise(query, params) {
		return new Promise((resolve, reject) => {
			this._connection.query(query, params, (err, rows) => {
				if(err) return reject(err);
				resolve(rows);
			});
		});
	}

}