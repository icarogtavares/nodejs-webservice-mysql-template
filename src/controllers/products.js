import memjs from 'memjs';
import util from 'util';
import mysql from '../config/database';
import { ProductDao } from '../persistence/ProductDao';

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

		productDao.getAll()
			.then(rows => res.send(rows))
			.catch(err => res.status(400).send(err))

		return connection.end();
	}

	findById(req, res) {
		var productId = req.params.id;

		// this.memjsClient.get(productId, (err, val) => res.send(val));

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.findById(productId)
			.then(row => res.send(row))
			.catch(err => res.status(400).send(err))

		return connection.end();
	}

	post(req, res) {
		req.checkBody('name', 'Name is empty').notEmpty();
		req.checkBody('description', 'Description is empty').notEmpty();
		req.checkBody('price', 'Price is empty').notEmpty().withMessage('Invalid price, must be a decimal').isFloat();

		req.getValidationResult().then(result => {
			if(!result.isEmpty())
				return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
		})

		req.sanitizeBody('name').trim();
		req.sanitizeBody('description').trim();

		var product = req.body;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.save(product)
			.then(row => {
				product.id = row.insertId;

				var response = {
		        	'product': product,
		          	links: [
		            	{
		            		href:`${req.originalUrl}${product.id}`,
			              	rel:"read",
			              	method:"GET"
		            	},
		            	{
		              	href:`${req.originalUrl}${product.id}`,
			              	rel:"update",
			              	method:"PUT"
		            	},
		            	{
		              	href:`${req.originalUrl}${product.id}`,
			              	rel:"delete",
			              	method:"DELETE"
		            	}
		          	]
		        }

		        res.location('/products/' + product.id);
				// this.memjsClient.set(product.id, row, {expires: 60000}, (err, val) => {})
		        res.status(201).send(response);
			})
			.catch(err => res.status(400).send(err));

		return connection.end();
	}

	put(req, res) {
		var product = req.body
		var productId = req.params.id;

		product.id = productId;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.update(product)
			.then(row => {
				// this.memjsClient.set(product.id, product, {expires: 60000}, (err, val) => {})
				res.sendStatus(200);
			})
			.catch(err => res.status(400).send(err));

		return connection.end();
	}

	delete(req, res) {
		var productId = req.params.id;

		var connection = mysql();
		var productDao = new ProductDao(connection);

		productDao.remove(productId)
			.then(row => res.sendStatus(204))
			.catch(err => res.status(400).send(err));

		return connection.end();
	}
}


export default ProductsController;