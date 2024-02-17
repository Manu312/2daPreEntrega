const productsModel = require("../model/product.model");

class ProductManager {

    getAllProducts = async () =>{
        try{
            const products =  await productsModel.find({});
            return products;
        }catch(e){
            console.log("Error getting all products - products.manager", e);
        }
    };
    getProductById = async (id) =>{
        try{
            const product =  await productsModel.findById({_id: id});
            return product;
        }catch(e){
            console.log("Error getting product by id - products.manager", e);
        }
    };
    createProduct = async (product) =>{
        try{
            // Revismamos si el estudiante fue creado anteriormente
            const productExists = await productsModel.findOne({code: product.code});
            if(productExists && Object.keys(productExists).length !== 0){
                productExists.stock+=product.stock;
                await productExists.save();
                return null;
            }
            const newProduct =  await productsModel.create(product);
            return newProduct;
        }catch(e){
            console.log("Error creating product - products.manager", e);
        }
    };
    updateProduct = async (id, product) =>{
        try{
            const updatedProduct = await productsModel.findByIdAndUpdate(id, product, {new: true});
            return updatedProduct;
        }catch(e){
            console.log("Error updating product - products.manager", e);
        }
    }
    deleteProduct = async (id) =>{
        try{
            const deletedProduct = await productsModel.findByIdAndDelete(id);
            return deletedProduct;
        }catch(e){
            console.log("Error deleting product - products.manager", e);
        }
    }
}
module.exports = ProductManager;