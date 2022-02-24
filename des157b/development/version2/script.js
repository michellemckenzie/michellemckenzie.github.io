(function(){
    'use strict';
    console.log('reading js');

    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let mobileMenu = document.getElementById('menuOptions');

    menuButton.addEventListener('touchstart', function(){
        mobileMenu.style.opacity= "1";
        mobileMenu.style.animation = "menuAppear 2s forwards";
    });

    menuClose.addEventListener('touchstart', function(){
        mobileMenu.style.opacity = "0";
        mobileMenu.style.animation = "";
    });

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","O70nCNvlNQG4m0FZODyfbkOhwcdzq2Ydhm7WQKYM");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';

})();