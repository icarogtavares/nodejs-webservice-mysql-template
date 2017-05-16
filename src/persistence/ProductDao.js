export class ProductDao {

	constructor(connection) {
		this._connection = connection;
	}

	getAll() {
		const query = 'SELECT* FROM product';
		return this._queryPromise(query, []);
	}

	findById(id) {
		const query = 'SELECT * FROM product WHERE id = ?';
		return this._queryPromise(query, [id]);
	}

	save(product) {
		const query = 'INSERT INTO product SET ?';
		return this._queryPromise(query, product);
	}

	update(product) {
		const query = 'UPDATE product SET name = ? WHERE id = ?';
		return this._queryPromise(query, [product.name, product.id]);
	}

	remove(id) {
		const query = 'DELETE FROM product WHERE id = ?'
		return this._queryPromise(query, [id]);
	}

	_queryPromise(query, params) {
		return new Promise((resolve, reject) => {
			this._connection.query(query, params, (err, rows) => {
				if(err) return reject(err);

				resolve(rows);
			});
		});
	}
}