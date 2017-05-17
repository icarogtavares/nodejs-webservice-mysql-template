
export class ProductDao {

	constructor(queryHelper) {
		this._queryHelper = queryHelper;
	}

	getAll() {
		const query = 'SELECT* FROM product';
		return this._queryHelper.queryPromise(query, []);
	}

	findById(id) {
		const query = 'SELECT * FROM product WHERE id = ?';
		return this._queryHelper.queryPromise(query, [id]);
	}

	save(product) {
		const query = 'INSERT INTO product SET ?';
		return this._queryHelper.queryPromise(query, product);
	}

	update(product) {
		const query = 'UPDATE product SET name = ? WHERE id = ?';
		return this._queryHelper.queryPromise(query, [product.name, product.id]);
	}

	remove(id) {
		const query = 'DELETE FROM product WHERE id = ?'
		return this._queryHelper.queryPromise(query, [id]);
	}

}