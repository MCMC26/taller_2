console.log("hola");

    var btnsAddcar =document.querySelectorAll('.btn_car');
    var cartSize =document.querySelector('.nav_cant')
    btnsAddcar.forEach(function(btn){
        btn.addEventListener('click', function (event){
            event.preventDefault();

            var id =btn.getAttribute('data-name');

            var promise = fetch('/api/cart/' + id, {method: "POST"});
            promise
            .then(function(response){
                console.log(response);
                return response.json();
            })
            .then(function(data){
                console.log(data);
                cartSize.innerText = data.cartSize;
            });
        });
    });
