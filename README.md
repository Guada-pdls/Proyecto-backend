El servidor tiene configuradas las rutas de la siguiente manera:

| Ruta               | Descripción                          | Params                             | Querys                                       |
| ------------------ | ------------------------------------ | ---------------------------------- | -------------------------------------------- |
| /api/products      | Trae todos los productos del archivo |                                    | limit: Define un límite de productos a traer |
| /api/products/:pid | Trae un producto específico          | pid: es el id del producto a buscar|                                              |
| /api/carts         | Trae todos los carritos del archivo  |                                    | limit: Define un límite de carritos a traer  |
| /api/carts/:pid    | Trae un carrito específico           | cid: es el id del carrito a buscar |                                              |

Response es una clase que genera respuestas al servidor. Recibe data, mensaje y error.

ProductManager es una clase que contiene un array vacío de products y 5 métodos:
- addProduct: Recibe como parámetros las características de un producto a agregar. La función genera a partir de la longitud del array de products, un id que se va incrementando producto a producto. Genera un objeto product con ese id y los parámetros asignados, y lo pushea al array products.
- getProducts: Retorna el array products.
- getProductById: Recibe un id como parámetro y mediante un find, busca en products una coincidencia. Si la hay, la devuelve. De lo contrario, muestra el mensaje "Product not found".
- deleteProduct: Recibe como parámetro un id, verifica que exista un producto con el mismo, y en caso de ser así, trae todos los productos, lo elimina del array y sobreescribe el archivo. Si no existe en el array, devuelve "Product nos found"
- updateProduct: Recibiendo como parámetro un id y los datos a cambiar, crea un nuevo producto con los datos del anterior y le agrega o sobreescribe los nuevos campos. Elimina el producto antiguo y pushea el nuevo.

CartManager es muy similar en funcionamiento, solo que de momento no contiene ni deleteProduct ni updateProduct.

Decidí no usar console.logs como retorno de ninguna de las funciones. Es por esto que para poder ver en consola cada interacción con cualquier método, es necesario encerrarlo en un console.log.