const mongoose = require('../../database');
const User = require('./User');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require:true,
    },
    type: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;