const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Your must have to enter your name']
    },
    netAmount: {
        type: Number,
        required: true
    },
    cartId: [{type: mongoose.Schema.Types.ObjectId, ref: "Cart"}],
    productId: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
},
{timestamps: true});

const cartProduct = mongoose.model("cartProduct", userSchema);

module.exports = cartProduct;