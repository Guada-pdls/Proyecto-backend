class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, stock) {

    // id autoincrementable
    let id = 0;
    if (this.products.length === 0) {
      id = 1;
    } else {
      let lastProduct = this.products[this.products.length - 1];
      id = lastProduct.id + 1;
    }

    let product = {id, title, description, price, thumbnail, stock}
    this.products.push(product)
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    let productFound = this.products.find(prod => prod.id === id)
    return productFound !== undefined ? productFound : "Product not found"
  }
}


let store = new ProductManager()

store.addProduct("café", "cafeína líquida", 12, ".png", 10)
store.addProduct("té", "hoja en sobre", 8, ".png", 20)
store.addProduct("coca-cola", "cafeína y azúcar", 20, ".png", 15)
console.log(store.getProducts())
console.log(store.getProductById(3))