var formulary = document.querySelector(".options__form");

formulary.addEventListener('submit',function(event){
    event.preventDefault();
    var formInfo= new FormData(formulary);
        var data= new URLSearchParams(formInfo);

        var promise = fetch('/api/orders', {
            method : 'POST', 
            body : data
        });

        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            formulary.reset();
            console.log(info);
        });
    });     
