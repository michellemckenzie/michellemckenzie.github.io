'use strict';

(function(){
    console.log('reading js now');

    var startGame = document.getElementById('start');
    var gamescreen = document.getElementById('game');
    var startscreen = document.getElementById('intro');
    var actionArea = document.getElementById('actions');
    var comments = document.getElementById('commentary');
    var submit = document.getElementById('submit');
  

    // var help = document.getElementById('help');
    // help.addEventListener('click', getHelp);
    var number_of_circles = 0;
    var seconds = 7;


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
        p1bubbles: [],
        p2bubbles: [],
        p1bubbletop: [],
        p2bubbletop: [],
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

        submit.addEventListener('click', submitButton);

        for (let i = 0; i < 20; i++){
            randomCircle();
        }
        
        countdown();

        // setTimeout(dropBubbles, 4000);

        randomequation();
        randomequation();
        randomequation();
        randomequation();
        randomequation();

       
    });

    //this function creates a random circle that will bubble up behind the current player if they scored a point
    function randomCircle(){
        console.log('in randomCircle');

        //add the new circle element to the screen
        gamescreen.innerHTML += "<div class = 'circle'></div>"

        //grab the circle class
        let circle = document.getElementsByClassName('circle');
    
        //generate a random vertical position
        let top = Math.random() * (280-20) + 20; //values 20 - 280
        // let top = Math.random() * (350-80) + 80; //values 80 - 350
        let left = 0;

        //generate a random horizontal position based on who is the current player, add the bubble to the current player as well
        if (gameData.index == 0){
            left = Math.random() * 550; //values 0 - 550
            gameData.p1bubbles.push(number_of_circles);
            gameData.p1bubbletop.push(top);
        }
        else{
            left = Math.random() * (1230 - 700) + 700; //values 700 - 1230
            gameData.p2bubbles.push(number_of_circles);
            gameData.p2bubbletop.push(top);
        }
        

        //set the horizontal position
        circle[number_of_circles].style.left = `${left}px`;

        //set the vertical position which is a varying value
        circle[number_of_circles].style.setProperty("--top", `${top}px`);

        //call the animation to make the bubble go up, and stay at the resting position 
        circle[number_of_circles].style.animation = 'bubbleUp 3s ease-in-out forwards';

      
        //increment the number of circles for the next circle class element
        number_of_circles += 1;   

        console.log(`top: ${top}`);
        console.log(`left: ${left}`);

        console.log(gameData);
    }

    function dropBubbles(){
        console.log('in drop bubbles');
        let playerLength = 0;

        if (gameData.index == 0){
            playerLength = gameData.p1bubbles.length;
        }
        else{
            playerLength = gameData.p2bubbles.length;
        }

        //grab the circle class
        let circle = document.getElementsByClassName('circle');

        for (let i = 0; i < playerLength; i++){

            if (gameData.index == 0){
                circle[gameData.p1bubbles[i]].style.background = "red";
                circle[gameData.p1bubbles[i]].style.boxShadow = "0px 10px 10px red";
                
                //set the vertical position which is a varying value
                circle[gameData.p1bubbles[i]].style.setProperty("--top", `${gameData.p1bubbletop[i]}px`);

                //call the animation to make the bubble go up, and stay at the resting position 
                circle[gameData.p1bubbles[i]].style.animation = 'bubbleDown 1s ease-in forwards';
            }
            else{
                circle[gameData.p2bubbles[i]].style.background = "red";
                circle[gameData.p2bubbles[i]].style.boxShadow = "0px 10px 10px red";

                 //set the vertical position which is a varying value
                 circle[gameData.p2bubbles[i]].style.setProperty("--top", `${gameData.p2bubbletop[i]}px`);

                 //call the animation to make the bubble go up, and stay at the resting position 
                 circle[gameData.p2bubbles[i]].style.animation = 'bubbleDown 1s ease-in forwards';
            }

        }

        if (gameData.index == 0){
            gameData.p1bubbles = [];
            gameData.p1bubbletop = [];

            for (let i = 0; i < gameData.p2bubbletop.length; i++){
                gameData.p2bubbles[i] = i;
            }

            number_of_circles = gameData.p2bubbles.length;
        }
        else{
            gameData.p2bubbles = [];        
            gameData.p2bubbletop = [];

            for (let i = 0; i < gameData.p1bubbletop.length; i++){
                gameData.p1bubbles[i] = i;
            }

            number_of_circles = gameData.p1bubbles.length;
        }

        console.log(gameData);
    }

    function countdown(){
        console.log('in countdown');
        if (seconds>=0){
            document.getElementById('timer').textContent = `0:0${seconds}`;
            seconds -=1;
            setTimeout(countdown, 1000);
        }
        else{
            console.log('done');
        }
        
      
    }

    function randomequation(){
        //generate random number for an operator
        let chooseOperator = Math.floor (Math.random() * 3); //values 0 - 3
        let operand1 = 0;
        let operand2 = 0;
        let answer = 0;

        let operator = '';

        if (chooseOperator == 0){
            operator = '+';
        }
        else if (chooseOperator == 1){
            operator = "-";
        }
        else{
            operator = '*';
        }

        console.log(operator);

        if (operator == '+' || operator == '-'){
            operand1 = Math.floor (Math.random() * 100);
            operand2 = Math.floor (Math.random() * 100);
        }
        else{
            operand1 = Math.floor (Math.random() * 12);
            operand2 = Math.floor (Math.random() * 12);
        }

        if (operator == '+'){
            answer = operand1 + operand2;
        }
        else if (operator == '-'){
            answer = operand1 - operand2;
        }
        else if (operator == '*'){
            answer = operand1 * operand2;
        }

        console.log(operand1);
        console.log(operand2);
        console.log(answer);

        document.getElementById('question').textContent = `${operand1} ${operator} ${operand2} = `;


        // let top = Math.random() * (280-20) + 20; //values 20 - 280

    }

    function submitButton(){
        console.log('submit button clicked');
    }


 

})();