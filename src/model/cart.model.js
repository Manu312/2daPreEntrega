const mongoose = require('mongoose');

const collectionName = 'Carts';
const cartSchema = new mongoose.Schema({
    products: { type: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
        },
    ], required: true ,default: []},
});

cartSchema.pre('save', function(){
    console.log('Cart pre save');
    this.populate('products.product');
});
cartSchema.pre('findOneAndUpdate', function(){
    console.log('Cart pre update');
    this.populate('products.product');
});
cartSchema.pre('findOne', function(){
    console.log('Cart pre find');
    this.populate('products.product');
});
cartSchema.pre('find', function(){
    console.log('Cart pre find');
    this.populate('products.product');
});
const cartsModel = mongoose.model(collectionName, cartSchema);
module.exports = cartsModel;