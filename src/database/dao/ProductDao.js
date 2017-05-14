export class ProductDao {

	constructor(connection) {
		this._connection = connection;
	}

	getAll(callback) {
		this._connection.query('SELECT * FROM product', callback);
	}

	findById(id, callback) {
		this._connection.query('SELECT * FROM product WHERE id = ?', [id], callback);
	}

	save(product, callback) {
		this._connection.query('INSERT INTO product SET ?', product, callback);
	}

	update(product, callback) {
		this._connection.query('UPDATE product SET name = ? WHERE id = ?', [product.name, product.id], callback)
	}

	remove(id, callback) {
		this._connection.query('DELETE FROM product WHERE id = ?', [id], callback);
	}

}