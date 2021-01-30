let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 22;

let snake = [];
snake[0] = {
    x: 12 * box,
    y: 12 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let goldFood = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 22.690* (box), 22.699* (box) );
}

function makeSnake(){
    for(c = 0; c < snake.length; c++){
        context.fillStyle = "green";
        context.fillRect(snake[c].x, snake[c].y, box, box);
    }
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function drawGoldFood(){
    context.fillStyle = "gold";
    context.fillRect(goldFood.x, goldFood.y, box, box);
}

document.addEventListener('keydown', update);

let direction = "right";

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function play(){

    if(snake[0].x > 22* box && direction == "right") snake[0].x = 0;
    if(snake[0].x <= 0 * box && direction == "left") snake[0].x = 23 * box;
    if(snake[0].y > 22 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y <= 0 * box && direction == "up") snake[0].y = 23 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            this.parou = true
            alert("Você perdeu! Que pena, tente novamente.")
            let restar = document.getElementById("restart");
        }
    }
    
    criarBG();
    makeSnake();
    drawFood();

    if(scoreNum >= this.goldFuitCondition)drawGoldFood();
    if(scoreNum > 99){clearInterval(game); victory();}
  
    let snakeX = snake[0].x;
    let snakeY = snake[0].y; 

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        if(snakeX != goldFood.x || snakeY != goldFood.y){
            snake.pop()
            if(scoreNum > 0){
                score(scoreNum);
            }else{
                score(scoreNum = 0);
                this.goldFuitCondition = 5;
            }
            score(scoreNum);
        }else{
            goldFood.x = 9999;
            goldFood.y = 9999;

            setTimeout(()=>{
                goldFood.x = Math.floor(Math.random() * 15 + 1) * box;
                goldFood.y =Math.floor(Math.random() * 15 + 1) * box;
            },100)

            scoreNum += 3;
            this.goldFuitCondition += Math.floor(Math.random() * 10 + 1);
            score(scoreNum);
        }
    }else{
        food.x = Math.floor(Math.random() * 15 + 1,) * box;
        food.y =Math.floor(Math.random() * 15 + 1) * box;
        scoreNum += 1;
        score(scoreNum);
    }

    function score(scoreNum){
        
        let score = document.getElementById("scoreNum")
        score.innerHTML = `${scoreNum}`
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);    
}
////
let restar = document.getElementById("restart");
let yes = document.getElementById("yes");
yes.addEventListener("click", restartGame)
yes.addEventListener("click", ()=>{
    timer(1, 60)
    this.parou = false;
})
no.addEventListener("click", gameOver)

function restartGame(){

    restar.style.display = "none";
    while(snake.length > 1){
        snake.pop();
    }

    game = setInterval(play, 100);

    scoreNum = 0;
    score(scoreNum);
}

function gameOver(){
    restar.style.display = "none";
    alert("Obrigado por jogar !")    
}

function victory(){

    this.parou = true
    alert("Parabens! você venceu.")
    restar.style.display = "block";
}

function timer(min, seg){
    
    function minutos(){
        if(min > 0) min--; 
    }
    
    function segundos(){

        
        seg == 0 ? seg = 60 : seg--;
        timerValid(min, seg)

        let teste = document.getElementById("timerCont")
        
        let x = `0${min}:${seg}`;
        if(seg < 10){
            x = `0${min}:0${seg}`;
        }
        teste.innerHTML = (x)
    }

    this.timerMin = setInterval(minutos,60110)
    this.timerSeg = setInterval(segundos,1000)
    
    function timerValid(min, seg){
        if(min == 0 && seg == 0){
            clearInterval(timerMin);
            clearInterval(timerSeg);
            clearInterval(game);
            restar.style.display = "block";
        }else if(this.parou == true){
            clearInterval(timerMin);
            clearInterval(timerSeg);
            clearInterval(game);
            restar.style.display = "block";
        }
        
    }    
}

timer(min = 1, seg = 60) // dispara o cronometro
let game = setInterval(play, 100);

