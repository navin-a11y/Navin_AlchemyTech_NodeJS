const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your must have to enter your name']
    }
},
{timestamps: true});

const category = mongoose.model("Category", userSchema);

module.exports = category;