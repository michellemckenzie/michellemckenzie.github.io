(function(){
    'use strict';
    console.log("reading js");

    let form = document.getElementById('myForm');
    let userInput = document.querySelectorAll('input');
    let currentPage = document.getElementById('currentPage');
    let bButton = document.getElementById('bButton');
    let adj1; //input 1
    let celebrity; //input 2
    let adj2; //input 3
    let verb; //input 4
    let noun; //input 5
    let number; //input 6

    bButton.addEventListener('click', function(){
        currentPage.src = "images/colorfulSushi.png";
        form.style.display = "block";
        
    })


    //this will change the image of the screen depending on what input box the user is currently hovering over
    for (let i = 0; i < userInput.length; i++){
        // userInput[i].addEventListener('mouseover', function(){
        //     let currentId = this.id;

        //     if (currentId == 'adj1'){
        //         currentPage.src = "images/input1.png";
        //         currentPage.alt = "hovering on input1";
        //     }
        //     else if (currentId == 'celebrity'){
        //         currentPage.src = "images/input2.png";
        //         currentPage.alt = "hovering on input2";
        //     }
        //     else if (currentId == 'adj2'){
        //         currentPage.src = "images/input3.png";
        //         currentPage.alt = "hovering on input3";
        //     }
        //     else if (currentId == 'verb'){
        //         currentPage.src = "images/input4.png";
        //         currentPage.alt = "hovering on input4";
        //     }   
        //     else if (currentId == 'noun'){
        //         currentPage.src = "images/input5.png";
        //         currentPage.alt = "hovering on input5";
        //     }
        //     else if (currentId == 'number'){
        //         currentPage.src = "images/input6.png";
        //         currentPage.alt = "hovering on input6";
        //     }
        // });
        //change the image back to an unselected view
        // userInput[i].addEventListener('mouseout', function(){
        //     currentPage.src = "images/sushi.png";
        // })
    }
    

    form.addEventListener('submit', function(e){
        e.preventDefault();

        adj1 = document.getElementById('adj1').value;
        adj2 = document.getElementById('adj2').value;
        noun = document.getElementById('noun').value;
        verb = document.getElementById('verb').value;
        celebrity = document.getElementById('celebrity').value;
        number = document.getElementById('number').value;

        console.log(`The words are: ${adj1}, ${celebrity}, ${adj2}, ${verb}, ${noun}, ${number}`);

        form.style.display = "none";
        currentPage.src = "images/madlibsStory.png";
        currentPage.alt = "madlibs story";
        document.getElementById('lastPanel').style.display = 'block';
        createStory();
    });


    //this function will build the last panel and display the madlibs story with the user input
    function createStory(){
        document.getElementById('story').innerHTML = `You’ve been invited to go out to sushi with your friends! You usually get the <u>${adj1} ${celebrity}</u> roll, but you want to try to expand your taste palette. When you go out for dinner, the <u>${adj2} ${verb} ${noun}</u> roll catches your eye. You just have to have it. After eating <u>${number}</u> of them, you’re hooked!`;

        let totalAmount = 3*1.99 + 2*3 + 3.99*number;
        totalAmount = totalAmount.toFixed(2);
        document.getElementById('amount').textContent = `$${totalAmount}`;

        document.getElementById('sushiItem').textContent = `${number}x ${adj2} ${verb} ${noun} @3.99`;
    }

}());

