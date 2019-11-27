const assert = require('assert');

function createRoutes (app, db) {
    
    var cartList=[];
    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');

        
    });

    app.get('/api/store', (request, response) => {
        
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
    app.get('/testing', (request, response) => {
        
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

                response.render('testing',context);
            });

    })
    
    
    app.get('/store', (request, response) => {
        
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

                response.render('store',context);
            });

    })

    app.post('/api/store', (request, response) => {
        console.log(request.body);

        const products = db.collection('products');
        products.insert(request.body);

        response.send({
            message: 'ok',
        });
    });
    app.get('/store', (request, response) => {
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
    app.get('/productsDetail/:id', function (req, res) {
        const products = db.collection('products');
        var query= {};        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            var c=0;
            for(c;c<result.length;c++){
                if(req.params.id.toString()===result[c]._id.toString()){
                    //result[c].cartLength= cartList.length,
                    res.render('productsDetail', result[c]);
                }
                
            }
            
            
        });
        
    });

    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        var query= {};        
        
        var readyId =false;
        var cont=1;
        var comunproduct=false;
        const products = db.collection('products');

        products.find({})
        
        .toArray((err, result) => {
            
            var c=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    readyId=true;  
                    var i=0;

                    for(i;i<cartList.length;i++){
                        
                        if (request.params.id.toString()===cartList[i]._id.toString()){
                            
                            comunproduct=true;
  
                        } 
                    }
                    if(comunproduct==true){
                        console.log(cartList[c]);
                        cartList[c].cantidad+=1;
                    }else{
                        result[c].cantidad=cont;
                        cartList.push(result[c]);
                    }
                    
                } 
            }
            
            
            if(!readyId){
                response.send({
                    message: 'error',
                    cartSize: cartList.length
                });
                return;
            }
            
            
            
            response.send({
                cartSize: cartList.length
            });
            
        });
        
        
        
    });
    app.get('/api/notebooks', (request, response) => {
        
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
    
    app.get('/store/:type', (request, response) => {
        
        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({type: request.params.type})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error
                assert.equal(null, err);

                console.log(result)

                var context = {
                    products: result,
                    type:request.params.type

                };

                response.render('notebooks',context);
            });

    })
}

module.exports = createRoutes;