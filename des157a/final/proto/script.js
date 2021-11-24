'use strict';

(function(){
    console.log('reading js now');

    var startGame = document.getElementById('start');
    var gamescreen = document.getElementById('game');
    var startscreen = document.getElementById('intro');
    var actionArea = document.getElementById('actions');
    var comments = document.getElementById('commentary');
    // var help = document.getElementById('help');
    // help.addEventListener('click', getHelp);
    let number_of_circles = 0;

    var gameData = {
        pname: ['p1', 'p2'],
        ppoints: ['p1points', 'p2points'],
        players: ['player 1', 'player 2'],
        numbers: ['one', 'two', 'three', 'four', 'five', 'six'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30,
    };

    console.log(gameData);

    startGame.addEventListener('click', function(){
        //randomly select the first user
        gameData.index = Math.round(Math.random()); // math.random returns including 0 up to 1, math.round returns 0 and 1 including
    
        //hide the intro screen
        document.querySelector('h1').style.display = 'none';
        startscreen.style.display = 'none';

        //show the game screen
        gamescreen.style.display = 'flex';


        randomCircle();
    });

    function randomCircle(){
        console.log('in randomCircle');
        gamescreen.innerHTML += "<div class = 'circle'></div>"
        let circle = document.getElementsByClassName('circle');
        circle[number_of_circles].style.top = '400px';
        circle[number_of_circles].style.left = '0px';
        number_of_circles += 1;   
        // gameData.roll2 = Math.floor(Math.random()*6)+1; //values 1 - 6
    }

 

})();