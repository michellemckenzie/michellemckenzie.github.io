(function(){
    'use strict;'
    console.log("reading js now");

    let photo1 = document.getElementById("photo1");
    let photo2 = document.getElementById("photo2");
    let photo3 = document.getElementById("photo3");
    let photo4 = document.getElementById("photo4");
    let photo5 = document.getElementById("photo5");
    let photo6 = document.getElementById("photo6");
    let photo7 = document.getElementById("photo7");
    let photo8 = document.getElementById("photo8");

    photo1.addEventListener("mouseover", addanimation1);
    photo1.addEventListener("mouseout", removeanimation1);

    photo2.addEventListener("mouseover", addanimation2);
    photo2.addEventListener("mouseout", removeanimation2);

    photo3.addEventListener("mouseover", addanimation3);
    photo3.addEventListener("mouseout", removeanimation3);

    photo4.addEventListener("mouseover", addanimation4);
    photo4.addEventListener("mouseout", removeanimation4);

    photo5.addEventListener("mouseover", addanimation5);
    photo5.addEventListener("mouseout", removeanimation5);

    photo6.addEventListener("mouseover", addanimation6);
    photo6.addEventListener("mouseout", removeanimation6);

    photo7.addEventListener("mouseover", addanimation7);
    photo7.addEventListener("mouseout", removeanimation7);

    photo8.addEventListener("mouseover", addanimation8);
    photo8.addEventListener("mouseout", removeanimation8);

    function addanimation1(){
        document.getElementById("line1").style.animation = "line1appears 2s";
        document.getElementById("line1").style.width = "250px";

        document.getElementById("story1").style.visibility = "visible";
        document.getElementById("story1").style.animation = "textfade 3s";
    }

    function removeanimation1(){
        document.getElementById("line1").style.animation = "line1disappears 1s";
        document.getElementById("line1").style.width = "0px";
        document.getElementById("story1").style.visibility = "hidden";
        document.getElementById("story1").style.animation = "";
    }

    function addanimation2(){
        document.getElementById("line2").style.animation = "line2appears 2s";
        document.getElementById("line2").style.width = "450px";

        document.getElementById("story2").style.visibility = "visible";
        document.getElementById("story2").style.animation = "textfade 3s";
    }

    function removeanimation2(){
        document.getElementById("line2").style.animation = "line2disappears 1s";
        document.getElementById("line2").style.width = "0px";
        document.getElementById("story2").style.visibility = "hidden";
        document.getElementById("story2").style.animation = "";
    }

    function addanimation3(){
        document.getElementById("line3").style.animation = "line3appears 2s";
        document.getElementById("line3").style.width = "310px";

        document.getElementById("story3").style.visibility = "visible";
        document.getElementById("story3").style.animation = "textfade 3s";
    }

    function removeanimation3(){
        document.getElementById("line3").style.animation = "line3disappears 1s";
        document.getElementById("line3").style.width = "0px";
        document.getElementById("story3").style.visibility = "hidden";
        document.getElementById("story3").style.animation = "";
    }

    function addanimation4(){
        document.getElementById("line4").style.animation = "line4appears 2s";
        document.getElementById("line4").style.width = "190px";

        document.getElementById("story4").style.visibility = "visible";
        document.getElementById("story4").style.animation = "textfade 3s";
    }

    function removeanimation4(){
        document.getElementById("line4").style.animation = "line4disappears 1s";
        document.getElementById("line4").style.width = "0px";
        document.getElementById("story4").style.visibility = "hidden";
        document.getElementById("story4").style.animation = "";
    }

    function addanimation5(){
        document.getElementById("line5").style.animation = "line5appears 2s";
        document.getElementById("line5").style.width = "230px";

        document.getElementById("story5").style.visibility = "visible";
        document.getElementById("story5").style.animation = "textfade 3s";
    }

    function removeanimation5(){
        document.getElementById("line5").style.animation = "line5disappears 1s";
        document.getElementById("line5").style.width = "0px";
        document.getElementById("story5").style.visibility = "hidden";
        document.getElementById("story5").style.animation = "";
    }

    function addanimation6(){
        document.getElementById("line6").style.animation = "line6appears 2s";
        document.getElementById("line6").style.width = "2px";
        document.getElementById("line6").style.height = "100px";
        document.getElementById("story6").style.visibility = "visible";
        document.getElementById("story6").style.animation = "textfade 3s";
    }

    function removeanimation6(){
        document.getElementById("line6").style.animation = "line6disappears 1s";
        document.getElementById("line6").style.height = "0px";
        document.getElementById("story6").style.visibility = "hidden";
        document.getElementById("story6").style.animation = "";
    }

    function addanimation7(){
        document.getElementById("line7").style.animation = "line7appears 2s";
        document.getElementById("line7").style.width = "370px";
        document.getElementById("story7").style.visibility = "visible";
        document.getElementById("story7").style.animation = "textfade 3s";
    }

    function removeanimation7(){
        document.getElementById("line7").style.animation = "line7disappears 1s";
        document.getElementById("line7").style.width = "0px";
        document.getElementById("story7").style.visibility = "hidden";
        document.getElementById("story7").style.animation = "";
    }

    function addanimation8(){
        document.getElementById("line8").style.animation = "line8appears 2s";
        document.getElementById("line8").style.width = "180px";
        document.getElementById("story8").style.visibility = "visible";
        document.getElementById("story8").style.animation = "textfade 3s";
    }

    function removeanimation8(){
        document.getElementById("line8").style.animation = "line8disappears 1s";
        document.getElementById("line8").style.width = "0px";
        document.getElementById("story8").style.visibility = "hidden";
        document.getElementById("story8").style.animation = "";
    }
    
})();