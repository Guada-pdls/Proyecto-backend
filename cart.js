// const fs = require('fs');
import fs from 'fs'

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

}

export const carts = new CartManager('./data/cart.json')

const test = async () => {
    // console.log(await carts.getCarts())
}

test()
