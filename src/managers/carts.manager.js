const cartsModel = require('../model/cart.model');
const productsModel = require('../model/product.model');

class CartManager{
    getAllCarts = async () =>{
        try{
            const carts =  await cartsModel.find({});
            return carts;
        }catch(e){
            console.log("Error getting all carts - carts.manager", e);
        }
    };
    getCartById = async (id) =>{
        try{
            const cart =  await cartsModel.findById({_id: id}).lean();
            return cart;
        }catch(e){
            console.log("Error getting cart by id - carts.manager", e);
        }
        return null;
    };
    validateProducts = async (cart) =>{
        const products = [];
        await Promise.all(cart.map(async (p) => {
            console.log("Function validate - producto enviado", p);
            const product = await productsModel.findOne({ code: p.code });
            console.log("Function validate - producto encontrado", product);
            if(product){
                products.push({product:product.id});
            }
            return product;
        }));
        console.log("Function validate",products);
        return products;
    };
    createCart = async (cart) =>{
        try{
            const products = await this.validateProducts(cart);
            if(products.length !== 0){
                const newCart = await cartsModel.create({products: products});
                await cartsModel.findByIdAndUpdate({_id: newCart.id}, newCart, {new: true});
                console.log("Function create",newCart);
                return newCart;
            }
        }catch(e){
            console.log("Error creating cart - carts.manager", e);
        }
        return null;
    };
    addProductToCart = async (id, productId) =>{
        try{
            const cart = await cartsModel.findById({_id: id});
            if(cart){
                const oldProduct = await productsModel.findOneById({_id: productId});
                if(!oldProduct){
                    return null;
                }
                existProdutInCart = cart.products.find(p => p.product._id === productId);
                if(existProdutInCart){
                    existProdutInCart.product.stock += product.stock;
                    const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
                    return updatedCart;
                }
                cart.products.push({product: product.id});
                const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
                return updatedCart;
            }
        }catch(e){
            console.log("Error adding product to cart - carts.manager", e);
        }
        return null;
    };
    uppdateProductInCart = async (id, productId, product) =>{
        try{
            const cart = await cartsModel.findById({_id: id});
            if(cart){
                const oldProduct = await productsModel.findOneById({_id: productId});
                if(!oldProduct){
                    return null;
                }
                existProdutInCart = cart.products.find(p => p.product._id === productId);
                if(existProdutInCart){
                    existProdutInCart.product.stock = product.stock;
                    const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
                    return updatedCart;
                }
            }
        }catch(e){
            console.log("Error updating product in cart - carts.manager", e);
        }
    };
    getCartPriceTotal = async (id) =>{
        try{
            const cart = await cartsModel.findById({_id: id});
            if(cart){
                const total = cart.products.map(( p) => {
                    total+=p.product.price * p.product.stock;
                });
                return total;
            }
        }catch(e){
            console.log("Error getting cart price total - carts.manager", e);
        }
        return null;
    }
    deletProductFromCart = async (id, productId) =>{
        try{
            const cart = await cartsModel.findById({_id: id});
            if(cart){
                const productIndex = cart.products.findIndex(p => p.product._id === productId);
                if(productIndex !== -1){
                    cart.products.splice(productIndex, 1);
                    const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
                    return updatedCart;
                }
            }
        }catch(e){
            console.log("Error deleting product from cart - carts.manager", e);
        }
        return null;
    }
    updateCart = async (id, cart) =>{
        try{
            
            const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
            return updatedCart;
        }catch(e){
            console.log("Error updating cart - carts.manager", e);
        }
    }
    deleteCart = async (id) =>{
        try{
            const deletedCart = await cartsModel.findByIdAndDelete(id);
            return deletedCart;
        }catch(e){
            console.log("Error deleting cart - carts.manager", e);
        }
    }
    deletAllProducts = async (id) =>{
        try{
            const cart = await cartsModel.findById({_id: id});
            if(cart){
                cart.products = [];
                const updatedCart = await cartsModel.findByIdAndUpdate(id, cart, {new: true});
                return updatedCart;
            }
        }catch(e){
            console.log("Error deleting all products from cart - carts.manager", e);
        }
        return null;
    }
}
module.exports = CartManager;