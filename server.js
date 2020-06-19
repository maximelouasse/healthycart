/*
Imports
*/
    // NodeJS
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const ejs = require('ejs');

    // Inner
    const mongoDB = require('./services/db.service');
    const { mainRouter } = require('./routes/main.router');

//

/*
Server Configuration
*/
    // Define server
    const port = process.env.PORT;
    const server = express();

    // Define server class
    class ServerClass {
        // Initialization fonction
        init() {
            // View engine configuration
            server.engine( 'html', ejs.renderFile );
            server.set('view engine', 'html');

            // Static path configuration
            server.set( 'views', __dirname + '/www' );
            server.use( express.static(path.join(__dirname, 'www')) );

            //=> Use BodyParser to get user body data
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));

            //=> Use CookieParser to setup serverside cookies
            //server.use(cookieParser(process.env.COOKIE_SECRET));

            /*server.use(express.json());
            server.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });*/

            //=> Set server main router
            server.use('/', mainRouter);

            // Start server
            this.launch();
        }

        launch() {
            // Connnect MongoDB
            mongoDB.initClient()
            .then( db => {
                // Launch server
                server.listen(port, () => console.log({ 
                    db: db, 
                    server: `Server is running on port ${port}` 
                }))
            })
            .catch( err => {
                console.log(err)
            })
        }
    }
//

/*
Start server
*/
    new ServerClass().init();
//