let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('music.mp3');
const musicSound=new Audio("music");
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x:12,y:15}
]
food={x:2,y:7};

// / game function 
function main(ctime){
    
    window.requestAnimationFrame(main);   //yaha game loop chaltoh rahha hai but yaha baki operation bhi hote ja rahe hai aisa ni ki bas ye cal hi krta rah raha hai
    if((ctime-lastPaintTime)/1000<1/speed){
        return;   //so jab 1upon speed jo ki 0.5 sec hota hai usse kam toh ye kuch ni return as tab tk tu kuch mt kare jb tak ek ache fps ni aa jate hai more fps is not good
        
    }
    lastPaintTime=ctime;
    gameEngine();
}

function gameEngine(){

  function isCollide(sarr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
            return true;
        }
       
    }
    if(snakeArr[0].x>=18||snakeArr[0].x<=0||snakeArr[0].y>=18||snakeArr[0].y<=0){
       return true; 
    }
     
  }

console.log("ko")
let scoreBox=document.querySelector(".scoreBox")
// upadting sanke array and food
if(isCollide(snakeArr)  ){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
    alert("GameOver.Press any key to play");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;

}
    //if u have eaten the food inc the scor eand body badi hogi
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodSound.play();
        score+=1; 
        scoreBox.innerHTML="Score:"+score;

        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y
// /ye basically ek aur mundi add kardegi aage ke side unsiht aage ki side ek naya obj add kar deta hai 
        });
        let a=2;
        let b=16;   //so yaha pe hum ek boundary bana rahe jaha tk ek food generae ho sakta 
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};   
    }

    //movinf the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};    //yaha basically hum peche walre block ko aage ki side kar rahe then jab second wala element first pe toh niche humne nay elemnt banan diya input dir ko add karke 
        // video 57 min pe 
        }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;







    //display the snake 
    let board=document.querySelector(".board");
    board.innerHTML="";   //suru m board khali hona chaiye humesha asie ni ki pehle wale element ke sath display hota rahe
    snakeArr.forEach((e,index)=>{
        
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
    else{
        snakeElement.classList.add('snakel');
    }
        board.appendChild(snakeElement);
    });

    //display food
     
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
   

    
}





// main logic 

// do this yaar if u want o be something in ur life sachme bol rahah hu

// let hiscore=localStorage.getItem("hiscore");
// if(hiscore===null){
//     hiscoreval=0;
//     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
// }
// else{
//     let hiscoreBox=document.querySelector(".hiscoreBox");
//     hiscoreval=JSON.parse(locals);
//     hiscoreBox.innerHTML="HiScore"+hiscore;
// }
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
           inputDir.x=0;
           inputDir.y=-1;
           break;
           case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

            case "ArrowLeft":
           inputDir.x=-1;
           inputDir.y=0;
           break;

           case "ArrowRight":
           inputDir.x=1;
           inputDir.y=0;
           break;
           default:
            break;
    }
})