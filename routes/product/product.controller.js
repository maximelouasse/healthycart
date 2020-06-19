// Imports
    // Angular
    const fs = require('fs');    

    // Inner
    const Models = require('../../database/models/index');
const { resolve } = require('path');
//

/* 
Methods CRUD
*/
    // Product
    const createItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.create(req.body)
            .then( product => resolve({product}) )
            .catch( err => reject(err) );
        })
    }

    const readItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.find( (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    const readOneItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.findOne( { barcode: req.params.id }, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const updateItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.findByIdAndUpdate(req.params.id, req.body, (err, document) => {
                if( err ) {
                    return reject(err)
                } else {
                    Models.product.findById( req.params.id, (err, updated) => {
                        err ? reject(err) : resolve(updated);
                    })
                }
            })
        })
    }

    const deleteItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.deleteOne({ _id: req.params.id }, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const addProductNote = (req) => {
        let barcode = req.body.barcode;
        let pathFile = './openfoodfacts/' + barcode + '.json';

        return new Promise( (resolve, reject) => {
            Models.product.findOne({ barcode: barcode }, (err, document) => {
                // Le produit n'existe pas
                if(document === null) {
                    if (fs.existsSync(pathFile)) {
                        let jsonData  = JSON.parse(fs.readFileSync(pathFile));
                        let name = jsonData.product.product_name_fr;
                        let img_url = jsonData.product.image_url;

                        Models.product.create({ name: name, barcode: barcode, img_url: img_url })
                        .then( product => {
                            Models.product.findByIdAndUpdate({ _id: product._id }, { $push: { score: { user: req.body.userId, note: req.body.note } } }, {new: true}, (err, document) => {
                                if( err ) {
                                    reject(err);
                                } else {
                                    resolve(document);
                                }
                            })
                        })
                        .catch( err => reject(err) );
                    }
                } else {
                    Models.product.findByIdAndUpdate({ _id: document._id }, { $push: { score: { user: req.body.userId, note: req.body.note } } }, {new: true}, (err, document) => {
                        if( err ) {
                            reject(err);
                        } else {
                            resolve(document);
                        }
                    })
                }
            })
        });
    }
//

/*
Export
*/
    module.exports = {
        createItem,
        readItem,
        readOneItem,
        updateItem,
        deleteItem,
        addProductNote
    }
//