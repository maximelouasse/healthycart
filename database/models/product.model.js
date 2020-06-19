const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    // https://world.openfoodfacts.org/api/v0/product/4008400221823.json
    // product_name_fr
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    barcode: {
        type: String,
        required: [true, "can't be blank"]
    },
    // https://static.openfoodfacts.org/images/products/400/840/022/1823/front_fr.84.400.jpg
    // selected_images['front']['display']['fr']
    img_url: {
        type: String,
        required: [true, "can't be blank"]
    },
    score: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            note: {
                type: Number
            }
        }]
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;