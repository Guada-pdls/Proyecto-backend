import fs from 'fs'
import { store } from './Products.js'

class CartManager {
	constructor(path) {
		this.path = path
	}

	async getCarts() {
		try {
			if (fs.existsSync(this.path)) {
				const carts = await fs.promises.readFile(this.path, 'utf-8')
				return carts ? JSON.parse(carts) : "Not found"
			}
			return []
		} catch (error) {
			return `getCarts: ${error}`
		}
	}

	async addCart() {

		try {
			let fileCarts = await this.getCarts() // Traigo los carritos del archivo
			typeof fileCarts === 'string' && (fileCarts = [])

			// Genero el carrito y lo pusheo a fileCarts

			const id = fileCarts.length === 0 ? 1 : fileCarts[fileCarts.length - 1].id + 1; // Si el lenght === 0, id = 1, de lo contrario tomo el id del último carrito del array y le sumo 1
			let cart = { id, products: [] }
			fileCarts.push(cart)

			// Serializo el array y lo escribo en el archivo

			const data = JSON.stringify(fileCarts, null, 2)
			await fs.promises.writeFile(this.path, data)

			return `Cart created successfully. ID: ${id}`
		} catch (error) {
			return `addCart: ${error}`
		}
	}

	async getCartById(id) {
		try {
			const fileCarts = await this.getCarts()
			let cartFound = fileCarts.find(cart => cart.id === id)
			return cartFound !== undefined ? cartFound : 'Cart not found'
		} catch (error) {
			return `getCartById: ${error}`
		}
	}

	async deleteCart(id) {
		try {
			if (typeof await this.getCartById(id) === 'object') {
				const fileCarts = await this.getCarts()
				const remainingCarts = fileCarts.filter(cart => cart.id !== id)
				await fs.promises.writeFile(this.path, JSON.stringify(remainingCarts, null, 2))
				return 'Cart deleted successfully'
			}
			return 'Cart not found'
		} catch (error) {
			return `deleteCart: ${error.message}`
		}
	}

	async updateCart(cid, pid, units) {
		try {
			// Verifico que ambos id sean válidos
			const cart = await this.getCartById(cid)
			const product = await store.getProductById(pid)
			if (product.stock === 0) {
				return 'Product not available'
			}
			if (typeof cart === 'object' && typeof product === 'object') {

				let productCart = cart.products.find(prod => prod.pid === pid)
				let quantity;
				if (typeof productCart === 'undefined') {
					// Esto será un producto agregado por primera vez
					quantity = Math.min(units, product.stock) // Si la units es menor, será esta la cantidad que se agregará. En caso de que se exceda, será el stock, por lo que solo se agregará la cantidad disponible.
					product.stock -= quantity
				} else {
					// Este será un producto que ya contiene quantity
					if (units + productCart.quantity <= product.stock) { // Si la cantidad ya existente más la que se quiere agregar es menor al stock, le resto units al stock
						quantity = units + productCart.quantity
						product.stock -= units
					} else {
						// Si el stock supera la cantidad a agregar
						quantity = product.stock + productCart.quantity // El stock + lo que ya tenia
						product.stock = 0
					}
				}

				// Actualizo el producto con el nuevo stock y pusheo el product al cart en caso de no existir, o reemplazo sus unidades en caso de si existir
				await store.updateProduct(pid, product)
				typeof productCart === 'undefined'
					? cart.products.push({ pid, quantity })
					: cart.products.find(prod => prod.pid === pid).quantity = quantity

				// Elimino del archivo el antiguo cart y agrego el actualizado
				await this.deleteCart(cid)

				let fileCarts = await this.getCarts()
				fileCarts.push(cart)
				const data = JSON.stringify(fileCarts, null, 2)
				await fs.promises.writeFile(this.path, data)

				return 'Product modified successfully'
			}
			return 'Check id'
		} catch (error) {
			return `updateCart: ${error}`
		}
	}

	async deleteProductFromCart(cid, pid, units) {
		try {
			// Verifico que ambos id sean válidos
			let cart = await this.getCartById(cid)
			let cartProduct = cart?.products?.find(prod => prod.pid === pid) // Si cart no es nulo, hago un find para encontrar el producto

			if (typeof cart === 'object' && typeof cartProduct === 'object') {
				// Verifico el menor y se lo sumo al stock del product y se lo resto al quantity del cartProduct
				let product = await store.getProductById(pid)
				let quantity = Math.min(product.stock, units)
				product.stock += quantity
				cartProduct.quantity -= quantity

				// Actualizo el producto con el nuevo stock y actualizo el cart
				await store.updateProduct(pid, product)

				if (cartProduct.quantity === 0) {
					cart = { id: cid, products: [...cart.products.filter(prod => prod.pid !== pid)] }
				} else {
					cart = { id: cid, products: [...cart.products.filter(prod => prod.pid !== pid), cartProduct] }
				}

				// Elimino del archivo el antiguo cart y agrego el actualizado
				await this.deleteCart(cid)
				
				let fileCarts = await this.getCarts()
				fileCarts.push(cart)
				const data = JSON.stringify(fileCarts, null, 2)
				await fs.promises.writeFile(this.path, data)

				return 'Product deleted successfully'
			}
			return 'check id'
		} catch (error) {
			console.log(error)
			return `deleteProductFromCart: ${error}`
		}
	}

}

export const carts = new CartManager('./src/data/cart.json')

const test = async () => {
	// console.log(await carts.getCarts())
}

test()
