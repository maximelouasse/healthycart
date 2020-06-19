/*
Imports
*/
    const Models = require('../../database/models/index');
const { collection } = require('../../database/models/cart.model');
//

/* 
Methods CRUD
*/
    // User
    const createItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.create(req.body)
            .then( user => resolve({user}) )
            .catch( err => reject(err) );
        })
    }

    const readItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.find( (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    const readOneItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.findById(req.params.id, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const updateItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.findByIdAndUpdate(req.params.id, req.body, (err, document) => {
                if( err ) {
                    return reject(err)
                } else {
                    Models.user.findById( req.params.id, (err, updated) => {
                        err ? reject(err) : resolve(updated);
                    })
                }
            })
        })
    }

    const deleteItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.deleteOne({ _id: req.params.id }, (err, document) => {
                err ? reject(err) : resolve(document);
            })
        })
    }

    const getUserLists = (req) => {
        return new Promise( (resolve, reject) => {
            Models.list.find({ users: { _id: req.params.id } }, (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    const getUserCart = (req) => {
        return new Promise( (resolve, reject) => {
            Models.cart.find({ userId: req.params.id }, (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    // Récupère les produits scannés par l'utilisateur
    // TODO
    const getUSerProducts = (req) => {
        return new Promise( (resolve, reject) => {
            Models.user.find({ userId: req.params.id }, (err, collection) => {
                err ? reject(err) : resolve(collection);
            })
        })
    }

    // Sauvegarde un produit scanné
    const addProductScanned = (req) => {
        var userId = req.params.id;
        
        return new Promise( (resolve, reject) => {
            Models.user.find({ _id: userId, products: { $elemMatch: { barcode: req.body.barcode } } }, (err, collection) => {
                if(collection.length == 0) {
                    Models.user.findByIdAndUpdate({ _id: userId }, { $push: { products: {barcode: req.body.barcode, img_url: req.body.img_url, name: req.body.name} } }, (err, document) => {
                        if( err ) {
                            reject(err)
                        } else {
                            Models.list.find({ users: { _id: userId } }, (err, collection) => {
                                err ? reject(err) : resolve(collection);
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
        getUserLists,
        getUserCart,
        addProductScanned
    }
//