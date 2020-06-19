const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    image: {
        type: String,
        required: [true, "can't be blank"]
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;