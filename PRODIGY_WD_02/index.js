var i=0;
var j=0;
var k=0;
var started=false;


var hh=0;
var mm=0;
var ss=0;

$("#reset").click(function(){
    resetWatch();
});

function resetWatch(){
    i=0;j=0;k=0;
    $("#s").text("00");
    $("#m").text("00");
    $("#h").text("00");
    started=false;
    document.getElementById("clear-lap").style.visibility = "hidden";
    document.getElementById("section-4").style.visibility = "hidden";
    clear();
    hh=0; mm=0; ss=0;

}

$("#pause").click(function(){
    started=false;
});


$("#start").click(function(){
    started=true;
    startWatch(i);
    document.querySelector("#section-4").style.visibility = "hidden";
});

function startWatch(i){
 if(started){
    if(i<=9){
        $("#s").text("0"+i);
    }
    if(i>9 && i<60){
        $("#s").text(i);
    }
    i++;
    if(i==60){
        $("#s").text("00");
        i=0;
        j++;
        minCalc(j);
    }

     setTimeout(function(){
        startWatch(i)
    },1000);
    
}

function minCalc(j){
    if(j<=9){
        $("#m").text("0"+j);
    }
    if(j>9 && j<60){
        $("#m").text(j);
    }
    if(j==60){
        $("#m").text("00");
        j=0;
        k++;
        hrCalc(k);    
    }
 }
}

function hrCalc(k){
    if(k<=9){
        $("#h").text("0"+k);
    }
    else{
        $("#h").text(k);
    }
    j=0;
}


$("#lap").click(function(){
    lapWatch();
    document.querySelector("#section-4").style.visibility = "visible";
});

var n=1;
var Laps = document.getElementById('ul-Lap');

var h_new=0,m_new=0,s_new=0;
function lapWatch(){
     var h1=h_new;
     var m1=m_new;
     var s1=s_new;

     h_new=Number(document.getElementById("h").innerHTML);
     m_new=Number(document.getElementById("m").innerHTML);
     s_new=Number(document.getElementById("s").innerHTML);
    
     if(n==1){
        hh=h_new;
        mm=m_new;
        ss=s_new;
     }
     else{
        hh=h_new-h1;
        mm=m_new-m1;
        ss=s_new-s1;
     } 

    Laps.innerHTML +=
    '<div id="LapTime-show">'+
        '<p class="lapTime" id="lap-no">Lap '+n+'</p>'+
        '<p class="lapTime" id="hour"> '+pad(hh)+'</p>'+
        '<p class="lapTime" class="lap-colon">:</p>'+
        '<p class="lapTime" id="minute">'+pad(mm)+'</p>'+
        '<p class="lapTime" class="lap-colon">:</p>'+
        '<p class="lapTime" id="second">'+pad(ss)+'</p>'+
   '</div>';
   n++;
   document.querySelector("#clear-lap").style.visibility = "visible";
}

$("#clear-lap").click(function(){
    clear();
});

function clear(){
    Laps.innerHTML='';
    n=1;
    document.querySelector("#clear-lap").style.visibility = "hidden";
}

function pad(num){
    if(num<=9){
        return "0"+num;
    }
    else
        return num;
}

$("#resume").click(function(){
    started=true;
    var new_i=Number(document.getElementById("s").innerHTML);
    startWatch(new_i);
});


