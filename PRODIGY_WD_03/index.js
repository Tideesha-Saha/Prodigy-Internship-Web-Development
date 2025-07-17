var player="X";
var ch;
var gameOver=false;
var won;
var times=0;
var comp;
var pressed=false;
var k=1;

var arr=[];
for (var i = 0; i < 3; i++) {
    arr[i] = [];
    for (var j = 0; j < 3; j++) {
        arr[i][j] = "";
    }
}

$(".choose").click(function (){
    $(".next").css("visibility","visible");
    var getChoose=$(this).attr("id");

    if(getChoose=="computer"){
        $("#p1").text("COMPUTER");
        $("#p2").text("YOU");
        Comp_Player();
    }
    else{
        // $("#p1").css("backgroundColor"," rgb(139, 1, 1)");
        // $("#p2").css("backgroundColor"," transparent");
        $("#p1").addClass("turn");
        TwoPlayers();
    }

});


// var r;
// var getNo;
// function Comp_Player(){ 

// while(k!==9){
//    if(gameOver==false){
//         if(k%2!==0){
//             r=Math.random();
//             r=r*6;
//             r=Math.ceil(r);
//             var get_rHTML=document.getElementById(r).innerHTML;
        
//             if(get_rHTML==""){
//                 if(player=="X"){
//                     $("#"+r).css("color","#6b2b00");
//                 }
//                 if(player=="O"){
//                     $("#"+r).css("color","white");
//                 }
//                 $("#"+r).text(player);
                
//             }
//             // else{
//             //     r=Math.random();
//             //     r=r*6;
//             //     r=Math.ceil(r);
//             // }
//             k++;
//                 console.log(k);
//         }

//         else{
//                 player="O";
//             $(".btn").click(function (){
//                 // if(gameOver==false){
//                     getNo=$(this).attr("id");
//                     var getNoHTML=document.getElementById(getNo).innerHTML;
            
//                     if(getNoHTML==""){
//                             if(player=="X"){
//                                 $("#"+getNo).css("color","#6b2b00");
//                             }
//                             if(player=="O"){
//                                 $("#"+getNo).css("color","white");
//                             }
//                         $("#"+getNo).text(player);
                    
//                     }
//                     // else{
//                     //     $("#"+getNo).fadeIn(200).fadeOut(200).fadeIn(200);
//                     //     $("#"+getNo).addClass("pressed");
//                     //     setTimeout(function(){
//                     //         $("#"+getNo).removeClass("pressed")
//                     //     },300);
//                     // }
//                 // }
//             });
//             k++;
//             console.log(k);

//     }
//             if(getNo==1 || r==1)
//                 arr[0][0]=player;
//             if(getNo==2 || r==2)
//                 arr[0][1]=player;
//             if(getNo==3 || r==3)
//                 arr[0][2]=player;
//             if(getNo==4 || r==4)
//                 arr[1][0]=player;
//             if(getNo==5 || r==5)
//                 arr[1][1]=player;
//             if(getNo==6 || r==6)
//                 arr[1][2]=player;
//             if(getNo==7 || r==7)
//                 arr[2][0]=player;
//             if(getNo==8 || r==8)
//                 arr[2][1]=player;
//             if(getNo==9 || r==9)
//                 arr[2][2]=player;

//             won=HaveWon(player);
//             console.log(arr);
//             if(won==1){
//                 $("#result-id").css("visibility","visible");
//                 if(player=="X")
//                     $("#result-id").text("WINNER IS COMPUTER !");
//                 else
//                     $("#result-id").text("WINNER IS PLAYER !");
//                gameOver=true;
//             }
//             else{
//                 if(player=="X"){
//                    player="O";
//                 }
//                 else{
//                     player="X";
//                 }
//                 times++;
//                 if(times==9){
//                     $("#result-id").css("visibility","visible");
//                     $("#result-id").text("GAME DRAW");
//                     gameOver=true;
//                 }
//             }
//         }
//     }

// }

function TwoPlayers(){ 
$(".btn").click(function (){
    if(gameOver==false){

        var getNo=$(this).attr("id");
        var getNoHTML=document.getElementById(getNo).innerHTML;

        if(getNoHTML==""){
                if(player=="X"){
                    $("#"+getNo).css("color","#6b2b00");
                }
                if(player=="O"){
                    $("#"+getNo).css("color","white");
                }
                
            $("#"+getNo).text(player);
            if(player=="X"){
                $("#p1").removeClass("turn");
                $("#p2").addClass("turn");
               
            }
            else{
                $("#p2").removeClass("turn");
                $("#p1").addClass("turn");
                
            }

            if(getNo==1)
                arr[0][0]=player;
            if(getNo==2)
                arr[0][1]=player;
            if(getNo==3)
                arr[0][2]=player;
            if(getNo==4)
                arr[1][0]=player;
            if(getNo==5)
                arr[1][1]=player;
            if(getNo==6)
                arr[1][2]=player;
            if(getNo==7)
                arr[2][0]=player;
            if(getNo==8)
                arr[2][1]=player;
            if(getNo==9)
                arr[2][2]=player;

            won=HaveWon(player);

            if(won==1){
                $("#result-id").css("visibility","visible");
                if(player=="X"){
                    $("#result-id").text("WINNER IS PLAYER 1 !");
                    $("#p2").removeClass("turn");
                }
                else{
                    $("#result-id").text("WINNER IS PLAYER 2 !");
                    $("#p1").removeClass("turn");
                }
               gameOver=true;
               
            }
            else{
                if(player=="X"){
                   player="O";
                }
                else{
                    player="X";
                }
                times++;
                if(times==9){
                    $("#p1").removeClass("turn");
                    $("#p2").removeClass("turn");
                    $("#result-id").css("visibility","visible");
                    $("#result-id").text("GAME DRAW");
                    gameOver=true;
                }
            }
        }
        else{
            $("#"+getNo).fadeIn(200).fadeOut(200).fadeIn(200);
            $("#"+getNo).addClass("pressed");
            setTimeout(function(){
                $("#"+getNo).removeClass("pressed")
            },300);
        }
    }
});
}

function HaveWon(ch){

    for(var i=0;i<3;i++){
        
        if(arr[i][0]==ch && arr[i][1]==ch && arr[i][2]==ch ){
        
            return 1;
        }
    }
    for(var i=0;i<3;i++){

        if(arr[0][i]==ch && arr[1][i]==ch && arr[2][i]==ch )
            return 1;
    }
    
    if(arr[0][0]==ch && arr[1][1]==ch && arr[2][2]==ch )
        return 1;

    
    if(arr[0][2]==ch && arr[1][1]==ch && arr[2][0]==ch )
        return 1;

    return 0;
}

