window.addEventListener('load', () => {

    var lastindex = 0;
    var imgMiniatures = document.querySelectorAll('.miniature');
    var principal = document.querySelector('.principal')

    imgMiniatures.forEach(function (miniature, index) {
        miniature.addEventListener('click', function (event) {

            switch (index) {
                case 0:
                principal.src='/media/notebooks/notebook_dark_plants_01.png';
                    break;

                case 1:
                    principal.src='/media/notebooks/notebook_dark_plants_02.png';
                    break;

                case 2:
                    principal.src='/media/notebooks/notebook_dark_plants_03.png';
                    break;

            }


        });
    });




});