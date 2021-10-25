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
    let bClicked = false;

    bButton.addEventListener('click', function(){
        if (bClicked == false){
            currentPage.src = "images/sushi.png";
            currentPage.alt = "sushi form";
            form.style.display = "block";
            bClicked = true;
        }
    })


    //this will change the image of the screen depending on what input box the user is currently hovering over
    for (let i = 0; i < userInput.length; i++){
        userInput[i].addEventListener('mouseover', function(){
            let currentId = this.id;
            let label;

            if (currentId == 'adj1'){
                label = document.getElementById('input1');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }
            else if (currentId == 'celebrity'){
                label = document.getElementById('input2');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }
            else if (currentId == 'adj2'){
                label = document.getElementById('input3');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }
            else if (currentId == 'verb'){
                label = document.getElementById('input4');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }   
            else if (currentId == 'noun'){
                label = document.getElementById('input5');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }
            else if (currentId == 'number'){
                label = document.getElementById('input6');
                label.style.fontWeight = "700";
                label.style.color = "red";
            }
        });
        // change the image back to an unselected view
        userInput[i].addEventListener('mouseout', function(){
            let currentId = this.id;
            let label;

            if (currentId == 'adj1'){
                label = document.getElementById('input1');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }
            else if (currentId == 'celebrity'){
                label = document.getElementById('input2');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }
            else if (currentId == 'adj2'){
                label = document.getElementById('input3');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }
            else if (currentId == 'verb'){
                label = document.getElementById('input4');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }   
            else if (currentId == 'noun'){
                label = document.getElementById('input5');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }
            else if (currentId == 'number'){
                label = document.getElementById('input6');
                label.style.fontWeight = "400";
                label.style.color = "black";
            }
        })
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

