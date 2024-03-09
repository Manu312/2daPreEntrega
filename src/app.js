const express = require("express");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const path = require("path");
const API_VERSION = "v1";
const {mongoDBconnection,configConnection} = require('./db/mongo.config');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require("connect-mongo");
const passport = require('passport');
const initializePassport = require('../src/config/passport-config');

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
        this.App.use(cookiesParser());
        this.App.use(session({
            store: mongoStore.create({
              mongoUrl: configConnection.url,
              mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
              ttl: 60 * 3600,
            }),
            secret: "secretSession",
            resave: false,
            saveUninitialized: false,
          })
        );
        initializePassport();
        this.App.use(passport.initialize());
    }

    initializeRoutes(routes){
        routes.forEach(route => {
            this.App.use(`/api/${API_VERSION}/`, route.router);
        });
    }

    initHandlerbars(){
        this.App.engine('handlebars', handlebars.engine());
        this.App.set("views", path.join(__dirname, "views"));
        this.App.set('view engine', 'handlebars');
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