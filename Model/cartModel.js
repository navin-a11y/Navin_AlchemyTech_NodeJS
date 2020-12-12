const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    totalQuantity: {
        type: Number,
        required: [true, 'Your must have to enter your name']
    },
    netAmount: {
        type: Number,
        required: true
    },
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    productId: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
},
{timestamps: true});

const cart = mongoose.model("Cart", userSchema);

module.exports = cart;