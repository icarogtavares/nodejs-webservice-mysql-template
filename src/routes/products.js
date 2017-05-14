import express from 'express';
import ProductsController from '../controllers/products';

const router = express.Router();
const productsController = new ProductsController();

router.route('/')
	.get((req, res) => productsController.getAll(req, res))
	.post((req, res) => productsController.post(req, res));

router.route('/:id')
	.get((req, res) => productsController.findById(req, res))
	.put((req, res) => productsController.put(req, res))
	.delete((req, res) => productsController.delete(req, res));

export default router;