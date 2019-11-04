const assert = require('assert');

function createRoutes (app, db) {
    
    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');

        
    });

    app.get('/api/products', (request, response) => {
        
        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error
                assert.equal(null, err);

                response.send(result);
                console.log(result);
            });

    })
    
    app.get('/products', (request, response) => {
        
        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error
                assert.equal(null, err);

                var context = {
                    products: result
                };

                response.render('product',context);
            });

    })

    app.post('/api/products', (request, response) => {
        console.log(request.body);

        const products = db.collection('products');
        products.insert(request.body);

        response.send({
            message: 'ok',
        });
    });
    app.get('/products', (request, response) => {
        var id = request.params.id;
        console.log(id);
 
        var products = db.collection('products');
        products.find({"_id": new ObjectID(id)})
         .toArray((err, result) => {
             assert.equal(null, err);
                 
                 var context = {
                     products: result[0]
                 };
 
                 console.log(context);
                 response.render('product', context);
         });
    });
}

module.exports = createRoutes;