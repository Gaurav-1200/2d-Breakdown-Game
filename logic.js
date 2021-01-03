var can = document.getElementById("myCanvas");
var ctx = can.getContext("2d");
var ballRadius = 10;
var x = can.width/2, dx=-2;
var y = can.height-30,dy=-2;
var paddleHeight = 10,paddleWidth = 75,paddleX = (can.width-paddleWidth)/2, paddleStep=7;
var leftPressed = false,rightPressed = false;
var brRow = 3, brCol = 5,brWidth = 75,brHeight = 20,brPadding = 10, brOffsetTop = 30,brOffsetLeft = 30;
var score=0, lives=3;

var bricks = [];
for(var c=0; c<brCol; c++) {
    bricks[c] = [];
    for(var r=0; r<brRow; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove",mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e)
{
    var relativeX =e.clientX-can.offsetLeft;
    if(relativeX>0 && relativeX<can.width)
    {
        paddleX =relativeX -paddleWidth/2;
    }
}
function drawScore()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives()
{
    ctx.font= ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("lives: "+lives, can.width-65, 20);
}
function collisionDetection()
{
    for(var c=0;c<brCol;c++)
    {
        for(var r=0;r<brRow;r++)
        {
            var b=bricks[c][r];
            if(b.status>0)
            {
                if(x>b.x && x<b.x+brWidth && y>b.y && y<b.y+brHeight)
                {
                    b.status--;
                    dy=-dy;
                    score++;
                    if(score== brRow*brCol)
                    {
                        //add confetti here.
                        alert("You Won!!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#e60026";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, can.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#120000";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brCol; c++) {
        for(var r=0; r<brRow; r++) {
            if(bricks[c][r].status>0)
            {
            var brickX = (c*(brWidth+brPadding))+brOffsetLeft;
            var brickY = (r*(brHeight+brPadding))+brOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brWidth, brHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    
    if(x + dx > can.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > can.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
           if(y= y-paddleHeight){
            dy+=0.2;   
            dy = -dy  ;
			 }
        }
        else 
        {
            lives--;
            if(lives<=0)
            {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
            }
            else
            {
                x=can.width/2;
                y=can.height-30;
                dx=2;
                dy=-2;
                paddleX =(can.width-paddleWidth)/2;

            }
        }
    }
    
    if(rightPressed && paddleX < can.width-paddleWidth) {
        paddleX += paddleStep;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= paddleStep;
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);