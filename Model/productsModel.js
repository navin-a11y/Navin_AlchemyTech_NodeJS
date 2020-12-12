const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your must have to enter your name']
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},
{timestamps: true});

const product = mongoose.model("Product", userSchema);

module.exports = product;