/*
Import
*/
    const fs = require('fs');
//

/*
Methods
*/
    /**
     * Get product data
     * @param body: Object => barcode: String
    */
    const getProductData = (body, res) => {
        let pathFile = './openfoodfacts/' + body.barcode + '.json';

        return new Promise( (resolve, reject) => {
            if (fs.existsSync(pathFile)) {
                console.log('EXIST');
                let jsonData  = fs.readFileSync(pathFile);
                resolve(JSON.parse(jsonData));
            } else {
                jsonData = body.jsonData;
    
                if(jsonData != undefined) {
                    fs.writeFile('./openfoodfacts/' + body.barcode + '.json', JSON.stringify(jsonData), 'utf8', function(err) {
                        if(err) {
                            resolve(null);
                        }
                        
                        resolve(jsonData);
                    });
                } else {
                    console.log('NOT EXIST');
                    resolve(null)
                }
            }
        });
    };

/*
Export
*/
    module.exports = {
        getProductData
    }
//