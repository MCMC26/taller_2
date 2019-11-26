window.addEventListener('load',function(){
    var btnsAddcar =document.querySelectorAll('.btn_car');
    var cartSize =document.querySelectorAll('.nav_countcart');

    btnsAddcar.forEach(function(btn){
        btn.addEventListener('click', function (event){
            event.preventDefault();
            console.log("hiiiiiiiiiii");

            var id =btn.getAttribute('data-name');

            var promise = fetch('/api/cart/' + id, {method: "POST"});
            promise
            .then(function(response){
                console.log(response);
                return response.json();
            })
            .then(function(data){
                console.log(data);
                return innerText = data.cartSize;
            });
        });
    });

});