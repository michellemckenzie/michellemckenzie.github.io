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
    var number_of_circles = 0;
    var seconds = 9;


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
        starPosition: [330, 980],
        answer: 0,
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

        let starEmoji = document.getElementById('currentplayer');
        starEmoji.style.left = `${gameData.starPosition[gameData.index]}px`;

        
        // setTimeout(dropBubbles, 4000);

        randomequation();
    });

    //this function creates a random circle that will bubble up behind the current player if they scored a point
    function randomCircle(){
        console.log('in randomCircle');

        //add the new circle element to the screen
        let div = document.createElement('div');
        div.className += 'circle';
        gamescreen.appendChild(div);

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
        return;
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
        else if (seconds == -2){
         
            return;
        }
        else{
            console.log('done');
            return;
        }
        
      
    }

    function randomequation(){
      
        let visFeedback = document.getElementById('correct');
        visFeedback.style.visibility = 'hidden';

        var controls = document.getElementById('controls');
        controls.style.visibility = 'visible';


        //generate random number for an operator
        let chooseOperator = Math.floor (Math.random() * 3); //values 0 - 3
        let operand1 = 0;
        let operand2 = 0;

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
            gameData.answer = operand1 + operand2;
        }
        else if (operator == '-'){
            gameData.answer = operand1 - operand2;
        }
        else if (operator == '*'){
            gameData.answer = operand1 * operand2;
        }

        console.log(operand1);
        console.log(operand2);
        console.log(gameData.answer);

        document.getElementById('question').textContent = `${operand1} ${operator} ${operand2} = `;

        let form = document.getElementById('myForm');
        form.addEventListener('submit', submitButton);

        seconds = 9;
        countdown();


        // let top = Math.random() * (280-20) + 20; //values 20 - 280

    }

    function submitButton(e){
        e.preventDefault();

        let answer = document.getElementById('answer').value;
        console.log ('value: ', answer);
        console.log('submit button clicked');

        document.getElementById('timer').textContent = `0:0${seconds+1}`;

        seconds = -2;

        if (answer == gameData.answer){
            console.log("correct!");
            randomCircle();

            let visFeedback = document.getElementById('correct');visFeedback.innerHTML = '&#x2705;';
            visFeedback.style.visibility = 'visible';
            document.getElementById('answer').value = '';
            document.getElementById('answer').focus();

            var controls = document.getElementById('controls');
            controls.style.visibility = 'hidden';

            gameData.score[gameData.index] += 1;
            document.getElementById(`${gameData.ppoints[gameData.index]}`).textContent = `${gameData.score[gameData.index]} pts`;

            setTimeout(randomequation, 2000);
        }
        else{
            console.log('false');
            let visFeedback = document.getElementById('correct');visFeedback.innerHTML = '&#x274C;';
            visFeedback.style.visibility = 'visible';

            document.getElementById('answer').value = '';

            var controls = document.getElementById('controls');
            controls.style.visibility = 'hidden';

            changePlayer();

            setTimeout(randomequation, 2000);
        }
    }

    function changePlayer(){
        let starEmoji = document.getElementById('currentplayer');

        //set the horizontal position
        starEmoji.style.setProperty("--fromtop", `${gameData.starPosition[gameData.index]}px`);
      
        if (gameData.index == 0){
            gameData.index = 1;
            starEmoji.style.setProperty("--totop", `${gameData.starPosition[gameData.index]}px`);
        }
        else{
            gameData.index = 0;
            starEmoji.style.setProperty("--totop", `${gameData.starPosition[gameData.index]}px`);
        }

          

        //call the animation and stay at the resting position 
        starEmoji.style.animation = 'switchplayer 2s ease-in-out forwards';
        starEmoji.style.display = 'none';
        starEmoji.style.display = 'block';
        
    }


 

})();