(function(){
    'use strict';
    console.log('reading js');

    let seconds = 0;

    const video = document.querySelector('video');
    const source = document.querySelector('source');
    
    const l1 = document.getElementById('l1');
    const l2 = document.getElementById('l2');
    const l3 = document.getElementById('l3');
    const l4 = document.getElementById('l4');
    const l5 = document.getElementById('l5');
    const l6 = document.getElementById('l6');
    const l7 = document.getElementById('l7');
    const l8 = document.getElementById('l8');
    const l9 = document.getElementById('l9');
    const l10 = document.getElementById('l10');
    const l11 = document.getElementById('l11');
    const l12 = document.getElementById('l12');
    const l13 = document.getElementById('l13');
    const l14 = document.getElementById('l14');
    const l15 = document.getElementById('l15');
    const lines = [l6,l7,l8,l9];

    

    const lyricProgress = setInterval(checkTime, 1000);

    function replayLastClip(){
        document.querySelector('video').currentTime = '19';
        document.querySelector('video').play();
    }

    function checkTime(){
        console.log(seconds);

        //stop setInterval from running once the videos are done
        if (seconds == 28){
            clearInterval(lyricProgress);
            l11.addEventListener('click', replayLastClip);
            return;
        }

        if (seconds == 0){
            l1.style.animation = "3s fadein forwards";
        }
        else if (seconds == 2){
            l2.style.animation = "3s fadein forwards";
            l1.style.animation = "3s fadeout forwards";
        }
        else if (seconds == 4){
            l3.style.animation = "3s fadein forwards";
            l2.style.animation = "3s fadeout forwards";
        }
        else if (seconds == 6){
            l4.style.animation = "3s fadein forwards";
            l3.style.animation = "3s fadeout forwards";
        }
        else if (seconds == 8){
            l4.style.animation = "";
            l4.style.opacity = "0";
            l5.style.animation = "2s fadein forwards";
        }
        else if (seconds == 11){
            l5.style.animation = "1s fadeout forwards";
        }
        else if (seconds == 12){
            l6.style.animation = " 2s fadein forwards";
        }
        else if (seconds == 13){
            l7.style.animation = " 2s fadein forwards";
        }
        else if (seconds == 14){
            l8.style.animation = " 2s fadein forwards";
        }
        else if (seconds == 15){
            l9.style.animation = " 2s fadein forwards";
        }
        else if(seconds == 17){
            for (var i = 0; i < 4; i++){
                lines[i].style.animation = "2s fadeout forwards";
            }
        }
        else if (seconds == 19){
            l10.style.animation = '2s fadein forwards';
            l11.style.animation = '2s fadein forwards';
        }
        else if (seconds == 20){
            l12.style.animation = '2s fadein forwards';
            l13.style.animation = '2s fadein forwards';
        }
        else if (seconds == 21){
            l14.style.animation = '2s fadein forwards';
        }
        else if (seconds == 22){
            l15.style.animation = '2s fadein forwards';
        }

        seconds++;
    }
})();