const {Router} = require('express');

class CookiesRoute {
    path = '/cookies';
    router = Router();
    constructor() {
        this.initCookiesRoutes();
    }
    initCookiesRoutes(){
        this.router.post(`${this.path}`, async (req, res) => {
            try {
                //TODO: Implementar el manejo de cookies
            } catch (e) {
                console.log(e);
            }
            return res.status(500).json({ok: false, message: 'internal server error'});
        });
        this.router.get(`${this.path}`, async (req, res) => {
            try {
                console.log('GET /cookies');
            }
            catch (e) {
                console.log(e);
            }
            return res.status(500).json({ok: false, message: 'internal server error'});
        });
        this.router.delete(`${this.path}`, async (req, res) => {
            try {
            }
            catch (e) {
                console.log(e);
            }
            return res.status(500).json({ok: false, message: 'internal server error'});
        });
    }
}

module.exports = CookiesRoute;