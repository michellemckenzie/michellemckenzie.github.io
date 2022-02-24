(function(){
    'use strict';
    console.log('reading js');

    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let mobileMenu = document.getElementById('menuOptions');

    menuButton.addEventListener('touchstart', function(){
        mobileMenu.style.display = "block";
        mobileMenu.style.animation = "menuAppear 2s forwards";
    });

    menuClose.addEventListener('touchstart', function(){
        mobileMenu.style.display = "none";
    });

})();