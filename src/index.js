const App = require('./app');
const CartsRoute = require('./routes/carts.routes');
const ProductsRoute = require('./routes/products.routes');
const CookieRoute = require('./routes/cookies.routes');
const SessionRoute = require('./routes/session.routes');
const ViewsRouter = require('./routes/views.routes');

const app = new App([new CartsRoute(),new ProductsRoute(), new CookieRoute(), new SessionRoute(), new ViewsRouter()]);
console.log(app.getServer());
app.listen();