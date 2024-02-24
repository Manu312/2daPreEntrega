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
                const id = req.params.id;
                const cart = await this.cartManager.getCartById(id);
                if(!cart){
                    return res.status(404).json({ok:false, message: 'cart not found'});
                }
                console.log(cart.products);
                return res.render('cart', {cart: cart, products: cart.products});
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
                const id = req.params.id;
                const idProduct = req.params.id_product;
                const updatedCart = await this.cartManager.addProductToCart(id, idProduct);
                return res.status(200).json({ok:true, message: 'product added to cart',cart: updatedCart});
            }catch(e){
                console.log("Add product to cart - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        //Actualizar con un arreglo de productos
        this.router.put(`${this.path}/:id`, async (req,res)=>{
        });
        this.router.put(`${this.path}/:id/products/:id_product`, async (req,res)=>{
            try{
                const id = req.params.id;
                const idProduct = req.params.id_product;
                const product = req.body;
                const updatedCart = await this.cartManager.updateProductFromCart(id, idProduct, product);
                return res.status(200).json({ok:true, message: 'product updated from cart',cart: updatedCart});
            }catch(e){
                console.log("Update product from cart - CartsRoute",e);
            }
        });
        this.router.delete(`${this.path}/:id/products/:id_product`, async (req,res)=>{
            try{
                const id = req.params.id;
                const idProduct = req.params.id_product;
                const updatedCart = await this.cartManager.deleteProductFromCart(id, idProduct);
                return res.status(200).json({ok:true, message: 'product deleted from cart',cart: updatedCart});
            }catch(e){
                console.log("Delete product from cart - CartsRoute",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });


        this.router.delete(`${this.path}/:id`, async (req,res)=>{
            try{
                const id = req.params.id;
                const deletedCart = await this.cartManager.deletAllProducts(id);
                return res.status(200).json({ok:true, message: 'cart deleted',cart: deletedCart});
            }catch(e){
                console.log("Delete cart - CartsRoute",e);
            }
        });
    }
}
module.exports = CartsRoute;