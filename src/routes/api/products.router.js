import { Router } from "express";
import Response from '../../managers/Response.js'
import { store } from '../../managers/Products.js'


// * GET all products /api/products

const productsRouter = Router();

const products_route = '/'
const products_function = async (req, res) => {
	try {
		const limit = req.query.limit
		let products = await store.getProducts()

		limit && (products = products.slice(0, limit))

		return res.json(new Response({ products }, "success", 200))
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, "error getting products", 500))
	}
}

productsRouter.get(products_route, products_function)

// * GET product by id /api/products/:pid

const productId_route = '/:pid'
const productId_function = async (req, res) => {
	try {
		const id = Number(req.params.pid)
		const product = await store.getProductById(id)

		return typeof product === 'string'
			? res.json(new Response(null, "product not found", 400))
			: res.json(new Response({ product }, "success", 200))

	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, "error getting product", 500))
	}
}

productsRouter.get(productId_route, productId_function)

// * POST new product /api/products

const addProduct_route = '/'
const addProduct_function = async (req, res) => {
	try {
		let title = req.body.title ?? null
		let description = req.body.description ?? null
		let price = req.body.price ?? null
		let thumbnail = req.body.thumbnail ?? 'sin imágen'
		let stock = req.body.stock ?? 0
		if (title && description && price && thumbnail) {
			let message = await store.addProduct(title, description, price, thumbnail, stock)
			return res.json(new Response(null, message, 201))
		} else {
			return res.json(new Response(null, 'check data', 400))
		}
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, 'error adding product', 500))
	}
}

productsRouter.post(addProduct_route, addProduct_function)

// * PUT update product /api/products/:pid

const updateProduct_route = '/:pid'
const updateProduct_function = async (req, res) => {
	try {
		if (req.body && req.params.pid) {
			let id = Number(req.params.pid)
			let data = req.body
			let message = await store.updateProduct(id, data)
			return res.json(new Response(null, message, 200))
		} else {
			return res.json(new Response(null, 'check data', 400))
		}
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, 'error updating product', 500))
	}
}

productsRouter.put(updateProduct_route, updateProduct_function)

// * DELETE product /api/products/:pid

const deleteProduct_route = '/:pid'
const deleteProduct_function = async (req, res) => {
	try {
		const id = Number(req.params.pid)
		let message = await store.deleteProduct(id)
		return res.json(new Response(null, message, 200))
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, 'error deleting product', 500))
	}
}

productsRouter.delete(deleteProduct_route, deleteProduct_function)

export default productsRouter