const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const path = require("path");
const API_VERSION = "v1";
const {mongoDBconnection} = require('./db/mongo.config');

class App{
    App;
    env;
    port;
    server;

    constructor(routes){
        this.App = express();
        this.env = 'development';
        this.port = 8080;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initHandlerbars();
    }

    getServer(){
        return this.App;
    }

    closeServer(){
        this.server = this.App.listen(this.port, () => {
            done();
        });
    }

    async connectToDatabase(){
        await mongoDBconnection();
    }

    initializeMiddlewares(){
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: true }));
        this.App.use('/static',express.static(`${__dirname}/static`));
    }

    initializeRoutes(routes){
        routes.forEach(route => {
            this.App.use(`/api/${API_VERSION}/`, route.router);
        });
    }

    initHandlerbars(){
        this.App.engine('hbs', handlebars.engine());
        this.App.set("views", path.join(__dirname, "views"));
        this.App.set('view engine', 'hbs');
    }

    listen(){
        this.App.listen(this.port, () => {
            displayRoutes(this.App);
            console.log("=====================================");
            console.log(`===  PORT ${this.port}`);
            console.log(`===  ENV: ${this.env}`);
            console.log("=====================================");

        });
    }
}

module.exports = App;