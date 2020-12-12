const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your must have to enter your name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'your email must be unique']
    },
    phone: {
        type: Number,
        required: true,
        unique: [true, 'your phone number must be unique'],
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    roleId: [{type: mongoose.Schema.Types.ObjectId, ref: "Role"}]
},
{timestamps: true});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userpassword
  ) {
    return candidatePassword == userpassword;
    };

const user = mongoose.model("User", userSchema);

module.exports = user;