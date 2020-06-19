/* 
Definition
*/
    const Mandatories = {
        user: ['email', 'password', 'name', 'last_connexion'],
        register: ['email', 'password', 'firstname', 'lastname'],
        login: ['email', 'password'],
        me: ['id'],
        list: ['name', 'user'],
        product: ['name', 'barcode', 'img_url'],
        product_note: ['barcode', 'note', 'userId'],
        category: ['name', 'image'],
    };
//

/* 
Export
*/
    module.exports = Mandatories;
//