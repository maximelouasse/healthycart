/*
Imports
*/
    // Nodes
    const express = require('express');
    const myRouter = express.Router();

    // Modules
    const { checkFields } = require('../../services/request.checker');
    const Mandatories = require('../../services/mandatory.service');
    const { createItem, readItem, readOneItem, updateItem, deleteItem, getUserLists, getUserCart, addProductScanned } = require('./user.controller');
//

/*
Routes definition
*/
    class MyRouterClass {

        // Inject passport in the class
        constructor() {}

        routes() {
            // CRUD: create
            myRouter.post('/', (req, res) => {
                console.log(req);
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) { 
                    return res.status(400).json({
                        message: 'No body provided',
                        data: null,
                        err: null
                    })
                }

                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatories.user, req.body );

                if(!ok) {
                    return res.status(400).json({
                        message: 'Bad fields provided',
                        data: null,
                        err: {miss, extra}
                    })
                } else {
                    createItem(req)
                    .then( apiResponse => {
                        return res.status(201).json({
                            message: 'Data created',
                            data: apiResponse,
                            err: null
                        })
                    })
                    .catch( apiResponse => {
                        return res.status(400).json({
                            message: 'Data not created',
                            data: null,
                            err: apiResponse
                        })
                    })
                }
            })

            // CRUD: read
            myRouter.get('/', (req, res) => {
                readItem()
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            // CRUD: read one
            myRouter.get('/:id', (req, res) => {
                readOneItem(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            // CRUD: update
            myRouter.put('/:id', (req, res) => {
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) { 
                    return res.status(400).json({
                        message: 'No body provided',
                        data: null,
                        err: null
                    })
                }

                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatories.user, req.body );

                if(!ok) {
                    return res.status(400).json({
                        message: 'Bad fields provided',
                        data: null,
                        err: {miss, extra}
                    })
                } else {
                    updateItem(req)
                    .then( apiResponse => {
                        return res.status(201).json({
                            message: 'Data updated',
                            data: apiResponse,
                            err: null
                        })
                    })
                    .catch( apiResponse => {
                        return res.status(400).json({
                            message: 'Data not updated',
                            data: null,
                            err: apiResponse
                        })
                    })
                }
            })

            // CRUD: delete
            myRouter.delete('/:id', (req, res) => {
                deleteItem(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data deleted',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not deleted',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            // Get User Lists
            myRouter.get('/:id/list', (req, res) => {
                getUserLists(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            // Get User Cart
            myRouter.get('/:id/cart', (req, res) => {
                getUserCart(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            // Save Product Scanned
            myRouter.post('/:id/product', (req, res) => {
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) { 
                    return res.status(400).json({
                        message: 'No body provided',
                        data: null,
                        err: null
                    })
                }

                addProductScanned(req)
                .then( apiResponse => {
                    return res.status(201).json({
                        message: 'Data created',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not created',
                        data: null,
                        err: apiResponse
                    })
                })
            })
        }

        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return myRouter;
        }
    }
//

/*
Export
*/
    module.exports = MyRouterClass;
//