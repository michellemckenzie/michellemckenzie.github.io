(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("hJiXQ6wc2TdRMkGA54o1NCiwXXLgWYH1jZD2Ej9G","skZpewzy0S51fkiUHbs9qjXncb4xXY2KfWbw2VKd");
    // Parse server
    Parse.serverURL = 'https://parseapi.back4app.com/';


    let mainPage = document.getElementById('main');
    let uploadPage = document.getElementById('uploadPage');
    let menuButton = document.querySelector('.fa-solid.fa-bars');
    let menuClose = document.querySelector('.fa-solid.fa-xmark');
    let mobileMenu = document.querySelector('#menuOptions');
    let addOption = document.getElementById('addOption');
    let homeOption = document.getElementById('homeOption');

    menuButton.addEventListener('click', function(){
        
        mobileMenu.style.animation = "menuAppear 1.2s forwards";
        

        addOption.addEventListener('click', function(){
            mainPage.style.display = "none";
            uploadPage.style.display = "flex";
            closeMenu();
        });

        homeOption.addEventListener('click', function(){
            mainPage.style.display = "block";
            uploadPage.style.display = "none";
            closeMenu();
        });
    });

    menuClose.addEventListener('click', closeMenu);
    
    function closeMenu(){
        mobileMenu.style.animation = "menuDisappear 1.2s forwards";
    }
    

})();