const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    products: {
        type: [{
            type: String
        }]
    }
});

const List = mongoose.model('List', ListSchema);

module.exports = List;