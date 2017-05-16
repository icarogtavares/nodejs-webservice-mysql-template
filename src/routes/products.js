import express from 'express';
import ProductsController from '../controllers/products';

const router = express.Router();
const productsController = new ProductsController();

router.route('/')
	.get(productsController.getAll)
	.post(productsController.post);

router.route('/:id')
	.get(productsController.findById)
	.put(productsController.put)
	.delete(productsController.delete);

export default router;