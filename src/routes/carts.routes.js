const { Router } = require('express');
const cartManager = require('../managers/carts.manager');

class CartsRoute {
    path = '/carts';
    router = Router();
    cartManager = new cartManager();
    constructor() {
        this.initCartsRoutes();
    }
    initCartsRoutes() {
        this.router.get(`${this.path}`, (req,res)=>{
            try{
                const carts = this.cartManager.getAllCarts();
                return res.status(200).json({ok:true, message: 'get all carts',carts: carts});    
            }catch(e){
                console.log("Get all carts - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        this.router.get(`${this.path}/:id`, async (req,res)=>{
            try{
                const id = parseInt(req.params.id);
                const cart = await this.cartManager.getCartById(id);
                if(!cart){
                    return res.status(404).json({ok:false, message: 'cart not found'});
                }
                return res.status(200).json({ok:true, message: 'get cart by id',cart: cart});
            }catch(e){
                console.log("Get cart by id - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        this.router.post(`${this.path}`, async (req,res)=>{
            try{
                const products = req.body;
                const newCart = await this.cartManager.createCart(products);
                return res.status(200).json({ok:true, message: 'cart created',cart: newCart});
            }catch(e){
                console.log("Create cart - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        this.router.post(`${this.path}/:id/products/:id_product`, async (req,res)=>{
            try{
                const id = parseInt(req.params.id);
                const idProduct = parseInt(req.params.id_product);
                const updatedCart = await this.cartManager.addProductToCart(id, idProduct);
                return res.status(200).json({ok:true, message: 'product added to cart',cart: updatedCart});
            }catch(e){
                console.log("Add product to cart - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
    }
}
module.exports = CartsRoute;