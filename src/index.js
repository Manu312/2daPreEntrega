const App = require('./app');
const CartsRoute = require('./routes/carts.routes');
const ProductsRoute = require('./routes/products.routes');

const app = new App([new CartsRoute(),new ProductsRoute()]);
console.log(app.getServer());
app.listen();