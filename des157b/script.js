(function() {
    'use strict';

    const button = document.querySelector('#button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    const buttonCircle = document.getElementById('btnCircle');
    const bookmark = document.getElementsByClassName('bookmark');
    const bookmarktriangle = document.getElementsByClassName('bookmarktri');

    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            
            banner.className = 'switch';
            document.querySelector('img').src = "images/lightcats.png";
            
            button.className = 'switch';

            buttonCircle.style.animation = '1s darktolight forwards'; 

            for (const tri of bookmarktriangle){
                tri.style.backgroundColor = 'white';
            }

            for (const mark of bookmark){
                mark.style.backgroundColor = '#332622';
            }

            for (const section of sections) {
                section.className = 'switch';
                section.style.backgroundColor = 'white';
            }
            mode = 'light';
            
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            document.querySelector('img').src = "images/darkcats.png";
        
            button.removeAttribute('class');

            buttonCircle.style.animation = '1s lighttodark forwards'; 

            for (const tri of bookmarktriangle){
                tri.style.backgroundColor = '#b2a09b';
            }

            for (const mark of bookmark){
                mark.style.backgroundColor = 'white';
            }

            for (const section of sections) {
                section.style.backgroundColor = '#b2a09b';
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()