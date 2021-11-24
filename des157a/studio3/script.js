(function(){
    console.log('reading js now');

    var startGame = document.getElementById('start');
    var gamescreen = document.getElementById('game');
    var startscreen = document.getElementById('intro');
    var actionArea = document.getElementById('actions');
    var comments = document.getElementById('commentary');
    // var help = document.getElementById('help');
    // help.addEventListener('click', getHelp);

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
        document.getElementById('start').textContent = "Resume";

        //show the game screen
        gamescreen.style.display = 'flex';

        //underline the player whose turn it is
        document.getElementById(`${gameData.pname[gameData.index]}`).style.textDecoration = 'underline';

        comments.textContent = `It's ${gameData.players[gameData.index]} 's turn!`;

        //make the roll button active
        setUpTurn();
    });

    function getHelp(){
        document.querySelector('h1').style.display = 'flex';
        startscreen.style.display = 'flex';
        gamescreen.style.display = 'none';
    }

    function setUpTurn(){

        document.getElementById('roll').addEventListener('click', function(){
            console.log("rolled the dice");

            throwDice();
        });
    }

    function clearUnderline(){
        //remove all underlines
        for (let i = 0; i < 6; i++){
            document.getElementById(`${gameData.numbers[i]}`).style.textDecoration = 'none';
        }
    }

    function throwDice(){
        const rollSound = new Audio('sounds/rollsound.m4a');
        rollSound.play();

        clearUnderline();
        actionArea.style.visibility = 'visible';
        comments.textContent = '';
        document.getElementById(`${gameData.pname[gameData.index]}`).style.textDecoration = 'underline';

        //generate random numbers for die 1 and 2
        gameData.roll1 = Math.floor(Math.random()*6)+1; //values 1 - 6
        gameData.roll2 = Math.floor(Math.random()*6)+1; //values 1 - 6

        console.log(gameData.roll1);
        console.log(gameData.roll2);

        //underline the numbers that were rolled. If the same number was rolled twice, it have a line above and underneath, otherwise if it's rolled once, it get an underline
        if (gameData.roll1 == gameData.roll2){
            document.getElementById(`${gameData.numbers[gameData.roll1 - 1]}`).style.textDecoration = 'underline overline';
        }
        else{
            document.getElementById(`${gameData.numbers[gameData.roll1 - 1]}`).style.textDecoration = 'underline';
            document.getElementById(`${gameData.numbers[gameData.roll2 - 1]}`).style.textDecoration = 'underline';
        }

        //add the rolls together
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1s are rolled
        if (gameData.rollSum == 2){
            //display what happened
            comments.textContent = 'Oh snap snake eyes! Switching players.';

            actionArea.style.visibility = 'hidden';

            //reset score
            gameData.score[gameData.index] = 0;

            //display score
            document.getElementById(`${gameData.ppoints[gameData.index]}`).textContent = '0 pts';

            //remove the underline under current user
            document.getElementById(`${gameData.pname[gameData.index]}`).style.textDecoration = 'none';
            
            //switch current player
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // checkWinCondition();
            setTimeout(throwDice, 2000);

           
            
        }
          //if either die rolled a 1
        else if (gameData.roll1 == 1 || gameData.roll2 == 1){
            console.log("one 1 was rolled");

            //display what happened
            comments.textContent = `${gameData.players[gameData.index]} rolled a 1! Switching to the other player.`;

            //hide controls for now
            actionArea.style.visibility = 'hidden';

              //tally score
              gameData.score[gameData.index] += gameData.rollSum;

            checkWinCondition();

          

            //update score on board
            document.getElementById(`${gameData.ppoints[gameData.index]}`).textContent = `${gameData.score[gameData.index]} pts`;

            //remove underline under current player
            document.getElementById(`${gameData.pname[gameData.index]}`).style.textDecoration = 'none';

            //switch user
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
       
            //automatically throw the first die
            setTimeout(throwDice, 2000);
            
           
        }
        //no 1s were rolled, continue playing
        else{
            console.log('the game continues');

            gameData.score[gameData.index] += gameData.rollSum;
            document.getElementById(`${gameData.ppoints[gameData.index]}`).textContent = `${gameData.score[gameData.index]} pts`;

            checkWinCondition();

            document.getElementById('skip').addEventListener('click', function(){
                comments.textContent = `${gameData.players[gameData.index]} Skipping turn. Switching to the other player.`;

                //remove underline under current player
                document.getElementById(`${gameData.pname[gameData.index]}`).style.textDecoration = 'none';

                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                
                setTimeout(throwDice, 1000);
            });
         }
    }

    function checkWinCondition(){
        const winner= new Audio('sounds/winner.m4a');
       
        if(gameData.score[gameData.index] >= gameData.gameEnd){
            winner.play();
            comments.textContent= `${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!`;

            actionArea.style.display = 'none';

            document.getElementById('playagain').style.display = 'flex';

            document.getElementById('playagain').addEventListener('click', function(){
                location.reload();
            })
        }
    }

})();