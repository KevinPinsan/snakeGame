let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;

let snake = [];
snake[0] = {
    x: 12 * box,
    y: 12 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * (box*1.5), 16 * (box*1.5) );
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
            clearInterval(game)
            let restar = document.getElementById("restart");
            restar.style.display = "block";
        }
    }
    
    criarBG();
    makeSnake();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y; 

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()

        if(scoreNum > 0){
            score(scoreNum);
        }else{
            score(scoreNum = 0);
        }
        score(scoreNum);
    }else{
        food.x = Math.floor(Math.random() * 15 + 1,) * box;
        food.y =Math.floor(Math.random() * 15 + 1) * box;
        scoreNum++;
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

let restar = document.getElementById("restart");
let yes = document.getElementById("yes");
yes.addEventListener("click", restartGame)
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

let game = setInterval(play, 100)

