const { Router } = require('express');
const prductsData = require('../data/productsData');
const productsModel = require('../model/product.model');
const ProductManager = require('../managers/products.manager');

class ProductsRoute {
    path = '/products';
    router = Router();
    productManager = new ProductManager();
    constructor() {
        this.initProductsRoutes();
    }
    initProductsRoutes() {
        // Insert products
        this.router.get(`${this.path}/insertion`, async (req,res)=>{
            try{
                const products =  await productsModel.insertMany(prductsData);
                return res.json({
                    message:'products  inserted successfully',
                    products: products
                });
            }catch(err){
                console.log(err);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        // GET all products
        this.router.get(`${this.path}`, async (req,res)=>{
            try{
                const products =  await this.productManager.getAllProducts();
                return res.status(200).json({ok:true, message: 'get all products',products: products});
            }catch(e){
                console.log(err);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        //GET product by id
        this.router.get(`${this.path}/:id`, async (req,res)=>{
            try{
                const id = parseInt(req.params.id);
                if(id < 0 || isNaN(id)){
                    return res.status(400).json({ok:false, message: 'id should be a positive number'});
                }
                const product =  await this.productManager.getProductById(req.params.id);
                if(!product){
                    return res.status(404).json({ok:false, message: 'product not found'});
                }
                return res.status(200).json({ok:true, message: 'get product by id',product: product});
            }catch(e){
                console.log(err);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        //POST product
        this.router.post(`${this.path}`, async (req,res)=>{
            try{
                const productBody = req.body;
                req.body.status = true;
                const newProducto = await this.productManager.createProduct(productBody);
                if(!newProducto){
                    return res.status(400).json({ok:true, message: 'product already exists | stock updated successfully'});
                }
                return res.status(200).json({ok:true, message: 'product created successfully'});
            }catch(e)
            {
                console.log("Error POST product - products.routes",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        //PUT product
        this.router.put(`${this.path}/:id`, async (req,res)=>{
            try {
                const productBody = req.body;
                const thumbnail = req.query.thumbnail ||  "";
                body.thumbnail = thumbnail;
                console.log(body.code);
                const product = await this.productManager.updateProduct(req.params.id, productBody);
                if(!product){
                    return res.status(404).json({ok:false, message: 'product not found'});
                }
            } catch {
                console.log("Error UPDATE product - products.routes");
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
        this.router.delete(`${this.path}/:id`, async (req,res)=>{
            try{
                const id = req.params.id;
                const product = await this.productManager.deleteProduct(id);
                if(!product){
                    return res.status(404).json({ok:false, message: 'product not found'});
                }
                return res.status(200).json({ok:true, message: 'product deleted successfully'});
            }catch(e){
                console.log("Error DELETE product - products.routes",e);
            }
            return res.status(500).json({ok:false,message: 'internal server error'});
        });
    }
}
module.exports = ProductsRoute;