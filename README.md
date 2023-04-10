Product Manager es un objeto que contiene un array vacío de products y 3 métodos:
- addProduct: Recibe como parámetros las características de un producto a agregar. La función genera a partir de la longitud del array de products, un id que se va incrementando producto a producto. Genera un objeto product con ese id y los parámetros asignados, y lo pushea al array products.
- getProducts: Retorna el array products.
- getProductById: Recibe un id como parámetro y mediante un find, busca en products una coincidencia. Si la hay, la devuelve. De lo contrario, muestra el mensaje "Product not found".

Decidí no usar console.logs como retorno de ninguna de las funciones. Es por esto que para poder ver en consola cada interacción con cualquier método, es necesario encerrarlo en un console.log.