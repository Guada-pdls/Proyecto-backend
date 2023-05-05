import express from 'express'
import Response from './Response.js'
import {store} from './products.js'
import {carts} from './cart.js'

const server = express()

const PORT = 8080
const ready = () => console.log('server ready on port ' + PORT)

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({extended: true}))

const products_route = '/api/products'
const products_function = async (req, res) => {
    try {
        const limit = req.query.limit
        let products = await store.getProducts()

        limit && (products = products.slice(0, limit))

        return res.json(new Response({products: [...products]}, "success", false))
    } catch (error) {
        console.log(error.message)
        return res.json(new Response(null, "error getting products", true))
    }
}

server.get(products_route, products_function)

const productId_route = '/api/products/:pid'
const productId_function = async (req, res) => {
    try{
        const id = Number(req.params.pid)
        const product = await store.getProductById(id)

        return typeof product === 'string' 
        ? res.json(new Response(null, "not found", true))
        : res.json(new Response({product}, "success", false))

    } catch (error) {
        console.log(error.message)
        return res.json(new Response(null, "error getting product", true))
    }
}

server.get(productId_route, productId_function)



const carts_route = '/api/carts'
const carts_function = async (req, res) => {
    try {
        const limit = req.query.limit
        let fileCarts = await carts.getCarts()

        limit && (fileCarts = fileCarts.slice(0, limit))

        return res.json(new Response({carts: fileCarts}, "success", false))
    } catch (error) {
        console.log(error.message)
        return res.json(new Response(null, "error getting carts", true))
    }
}

server.get(carts_route, carts_function)

const cartId_route = '/api/carts/:cid'
const cartId_function = async (req, res) => {
    try{
        const id = Number(req.params.cid)
        const cart = await carts.getCartById(id)

        return typeof cart === 'string' 
        ? res.json(new Response(null, "not found", true))
        : res.json(new Response({cart}, "success", false))

    } catch (error) {
        console.log(error.message)
        return res.json(new Response(null, "error getting cart", true))
    }
}

server.get(cartId_route, cartId_function)
