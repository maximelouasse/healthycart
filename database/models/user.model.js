const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: false,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    last_connexion: {
        type: Date
    },
    lists: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'
        }]
    },
    products: {
        type: [{
            barcode: {
                type: String
            },
            img_url: {
                type: String
            },
            name: {
                type: String
            },
            score: {
                type: Number
            }
        }]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;