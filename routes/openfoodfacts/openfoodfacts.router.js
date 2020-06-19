/*
Imports
*/
    // Node
    const express = require('express');
    const openFoodFactsRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { getProductData } = require('./openfoodfacts.controller');
//

/*
Routes definition
*/
    class OpenFoodFactsRouterClass {
        
        // Set route fonctions
        routes() {
            /**
             * Get product data from OpenFoodFacts
             * @param body: Object => barcode: String
            */
            openFoodFactsRouter.post( '/', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                //=> Request is valid: use controller
                getProductData(req.body)
                .then( apiResponse => {
                    if(apiResponse === null) {
                        return res.status(200).json({
                            message: 'Data sended',
                            data: null,
                            err: true
                        })
                    }

                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: false
                    }) 
                });
            });
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return openFoodFactsRouter;
        };
    };
//

/*
Export
*/
    module.exports = OpenFoodFactsRouterClass;
//