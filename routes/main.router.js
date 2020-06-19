/*
Imports
*/
    // NodeJS
    const { Router } = require('express');
    const passport = require('passport');

    // Authentication
    const { setAuthentication } = require('../services/auth.service');
    setAuthentication(passport);
    
    // Routers
    const AuthRouterClass = require('./auth/auth.router');
    const FrontRouterClass = require('./front/front.router');
    const UserRouterClass = require('./user/user.router');
    const ListRouterClass = require('./list/list.router');
    const ProductRouterClass = require('./product/product.router');
    const OpenFoodFactsRouterClass = require('./openfoodfacts/openfoodfacts.router');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router();
    const apiRouter = Router();
    mainRouter.use('/api', apiRouter);

    // Child
    const authRouter = new AuthRouterClass({ passport });
    const frontRouter = new FrontRouterClass();
    const userRouter = new UserRouterClass();
    const listRouter = new ListRouterClass();
    const productRouter = new ProductRouterClass();
    const openFoodFactsRouter = new OpenFoodFactsRouterClass();
//

/*
Configure routes
*/
    // Set API router
    apiRouter.use('/auth', authRouter.init());
    apiRouter.use('/user', userRouter.init());
    apiRouter.use('/list', listRouter.init());
    apiRouter.use('/product', productRouter.init());
    apiRouter.use('/openfoodfacts', openFoodFactsRouter.init());
    
    // Set front router
    mainRouter.use('/', frontRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//