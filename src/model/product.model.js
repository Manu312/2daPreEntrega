const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const collectionName = 'Products';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnail : { type: String, required: false },
    category: { type: String, required: true},
    status:{ type: Boolean, required: false, default: true},
    code: { type: String, required: true, unique: true},
    stock: { type: Number, required: true}
});
productSchema.plugin(paginate);
const productsModel = mongoose.model(collectionName, productSchema);
module.exports = productsModel;