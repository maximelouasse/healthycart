// Imports
const Models = require('../../database/models/index')

/* 
Methods CRUD
*/
    // List
    const createItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.create({ name: req.body.name, users: [{ _id : req.body.user }] } )
            .then( list => resolve(list) )
            .catch( err => reject(err) );
        })
    }

    const readItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.find( (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    const readOneItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.findById(req.params.id, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const updateItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.findByIdAndUpdate(req.params.id, req.body, (err, document) => {
                if( err ) {
                    return reject(err)
                } else {
                    Models.list.findById( req.params.id, (err, updated) => {
                        err ? reject(err) : resolve(updated);
                    })
                }
            })
        })
    }

    const deleteItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.deleteOne({ _id: req.params.id }, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const addProductList = (req) => {
        var listId = req.params.id,
            product = req.body.name;
        return new Promise( (resolve, reject) => {
            Models.list.findByIdAndUpdate({ _id: listId }, { $push: { products: product } }, (err, document) => {
                if( err ) {
                    return reject(err)
                } else {
                    Models.list.findById( listId, (err, updated) => {
                        err ? reject(err) : resolve(updated);
                    })
                }
            })
        })
    }

    const deleteProductList = (req) => {
        var listId = req.params.id,
            productId = req.body.productId,
            arrayIndex = `products.${productId}`;
        
        return new Promise( (resolve, reject) => {
            Models.list.findByIdAndUpdate({ _id: listId }, { $unset: { [arrayIndex]: 1 } }, (err, collection) => {
                if( err ) {
                    return reject(err)
                } else {
                    Models.list.findByIdAndUpdate({ _id: listId }, { $pull: { "products": null } }, (err, collection) => {
                        if( err ) {
                            return reject(err)
                        } else {
                            Models.list.findById( listId, (err, updated) => {
                                err ? reject(err) : resolve(updated);
                            })
                        }
                    })
                }
            })
        })
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
        addProductList,
        deleteProductList
    }
//