(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","skZpewzy0S51fkiUHbs9qjXncb4xXY2KfWbw2VKd");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';


    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let mobileMenu = document.getElementById('menuOptions');

    menuButton.addEventListener('click', function(){
        mobileMenu.style.display= "flex";
        mobileMenu.style.animation = "menuAppear 2s forwards";
    });

    menuClose.addEventListener('click', function(){
        mobileMenu.style.animation = "menuDisappear 2s forwards";
    });
    
    

})();