import memjs from 'memjs';
import util from 'util';
import mysql from '../database/';
import { ProductDao } from '../database/dao/ProductDao';

class ProductsController {
	
	constructor() {
		// this.memjsClient = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
		//   username: process.env.MEMCACHEDCLOUD_USERNAME,
		//   password: process.env.MEMCACHEDCLOUD_PASSWORD
		// });
	}

	getAll(req, res) {
		var connection = mysql();
		var productDao = new ProductDao(connection);
		productDao.getAll((err, results) => {
			if(err) res.status(400).send(err);
			res.send(results);
		});
		
		return connection.end();
	}

	findById(req, res) {
		var productId = req.params.id;

		// this.memjsClient.get(productId, (err, val) => res.send(val));

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.findById(productId, (err, result) => {
			if(err) res.status(400).send(err);

			res.send(result);
		});

		return connection.end();
	}

	post(req, res) {
		req.checkBody('name', 'Name is empty').notEmpty();
		req.checkBody('description', 'Description is empty').notEmpty();
		req.checkBody('price', 'Price is empty').notEmpty().withMessage('Invalid price, must be a decimal').isFloat();

		req.getValidationResult().then(result => {
			if(!result.isEmpty()) {
				res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      			return;
			}
		})

		req.sanitizeBody('name').trim();
		req.sanitizeBody('description').trim();

		var product = req.body;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.save(product, (err, results) => {
			if(err) res.status(400).send(err);

			product.id = results.insertId;

			var response = {
		        	'product': product,
		          	links: [
		            	{
		              	href:`${req.originalUrl}${results.insertId}`,
			              	rel:"update",
			              	method:"PUT"
		            	},
		            	{
		              	href:`${req.originalUrl}${results.insertId}`,
			              	rel:"delete",
			              	method:"DELETE"
		            	}
		          	]
		        }

			res.location('/products/' + results.insertId);

			// this.memjsClient.set(results.insertId, results, {expires: 60000}, (err, val) => {})

			res.status(201).send(response);
		});

		return connection.end();
	}

	put(req, res) {
		var product = req.body
		var productId = req.params.id;

		product.id = productId;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.update(product, (err, results) => {
			if(err) res.status(400).send(err);

			// this.memjsClient.set(product.id, product, {expires: 60000}, (err, val) => {})

			res.sendStatus(200);
		});

		return connection.end();
	}

	delete(req, res) {
		var productId = req.params.id;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.remove(productId, (err, results) => {
			if(err) res.status(400).send(err);

			res.sendStatus(204);
		});

		return connection.end();
	}
}


export default ProductsController;