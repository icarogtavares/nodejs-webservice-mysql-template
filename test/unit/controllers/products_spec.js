import ProductsController from '../../../src/controllers/products';
import sinon from 'sinon';
import Product from '../../../src/models/product';

describe('Controllers: Product', () => {

	const defaultProduct = [{
		name: 'Default Product',
		description: 'Product description',
		price: 100
	}];

	describe('get() products', () => {
		// it('should return a list of products', () => {
		it('should call send with a list of products', () => {

			const request = {};
			const response = {send: sinon.spy()};
			Product.find = sinon.stub();

			// const productsController = new ProductsController();
			// productsController.get(request, response);
			Product.find.withArgs({}).resolves(defaultProduct);

			// expect(response.send.called).to.be.true;
			// expect(response.send.calledWith(defaultProduct)).to.be.true;
			const productsController = new ProductsController(Product);
			return productsController.get(request, response)
				.then(() => {
					sinon.assert.calledWith(response.send, defaultProduct);
				})
		});

		it('should return 400 when an error occurs', () => {
			const request = {};
			const response = {
				send: sinon.spy,
				status: sinon.stub()
			}

			response.status.withArgs(400).returns(response);
			Product.find = sinon.stub();
			Product.find.withArgs({}).rejects({message: "Error"});

			const productsController = new ProductsController(Product);

			return productsController.get(request, response)
				.then(() => {
					sinon.assert.calledWith(response.send, 'Error');
				});
		});
	});

});