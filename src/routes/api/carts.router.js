import { Router } from "express";
import Response from '../../managers/Response.js'
import { carts } from '../../managers/Cart.js'

const cartsRouter = Router()

// * GET all carts /api/carts

const carts_route = '/'
const carts_function = async (req, res) => {
	try {
		const limit = req.query.limit
		let fileCarts = await carts.getCarts()

		limit && (fileCarts = fileCarts.slice(0, limit))

		return res.json(new Response({ carts: fileCarts }, "success", 200))
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, "error getting carts", 500))
	}
}

cartsRouter.get(carts_route, carts_function)

// * GET cart by id /api/carts/:cid

const cartId_route = '/:cid'
const cartId_function = async (req, res) => {
	try {
		const id = Number(req.params.cid)
		const cart = await carts.getCartById(id)

		return typeof cart === 'string'
			? res.json(new Response(null, "not found", 400))
			: res.json(new Response({ cart }, "success", 200))

	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, "error getting cart", 500))
	}
}

cartsRouter.get(cartId_route, cartId_function)

// * POST new cart /api/carts

const addCart_route = ''
const addCart_function = async (req, res) => {
	try {
		let cart = await carts.addCart()
		return res.json(new Response({cart}, 'success', 201))
	} catch (error) {
		return res.json(new Response(null, 'error creating cart', 500))
	}
}

cartsRouter.post(addCart_route, addCart_function)

// * PUT update cart /api/carts/:cid/product/:pid/:units

const updateCart_route = '/:cid/product/:pid/:units'
const updateCart_function = async (req, res) => {
	try {
		const {cid, pid, units} = req.params
		let message = await carts.updateCart(Number(cid), Number(pid), Number(units))
		return res.json(new Response(null, message, 200))
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, 'error updating cart', 500))
	}
}

cartsRouter.put(updateCart_route, updateCart_function)

// * DELETE product from cart /api/carts/:cid/product/:pid/:units

const deleteProduct_route = '/:cid/product/:pid/:units'
const deleteProduct_function = async (req, res) => {
	try {
		const {cid, pid, units} = req.params
		let message = await carts.deleteProductFromCart(Number(cid), Number(pid), Number(units))
		return res.json(new Response(null, message, 200))
	} catch (error) {
		console.log(error.message)
		return res.json(new Response(null, 'error deleting product', 500))
	}
}

cartsRouter.delete(deleteProduct_route, deleteProduct_function)

export default cartsRouter