const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 5;
const ballSpeed = 5;

let leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: ballSpeed, dy: ballSpeed };

function drawPaddle(paddle) {
    context.fillStyle = '#f40';
    context.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
    context.fillStyle = '#0f0';
    context.fillRect(ball.x, ball.y, ballSize, ballSize);
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddleHeight > canvas.height) paddle.y = canvas.height - paddleHeight;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
        ball.dy *= -1;
    }
    if (
        (ball.x <= leftPaddle.x + paddleWidth && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) ||
        (ball.x + ballSize >= rightPaddle.x && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight)
    ) {
        ball.dx *= -1;
    }
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = ballSpeed * (ball.dx < 0 ? 1 : -1);
        ball.dy = ballSpeed;
    }
}

function update() {
    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
    moveBall();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') leftPaddle.dy = -paddleSpeed;
    if (event.key === 's') leftPaddle.dy = paddleSpeed;
    if (event.key === 'ArrowUp') rightPaddle.dy = -paddleSpeed;
    if (event.key === 'ArrowDown') rightPaddle.dy = paddleSpeed;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 's') leftPaddle.dy = 0;
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') rightPaddle.dy = 0;
});

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').style.display = 'none';
    canvas.style.display = 'block';
    gameLoop();
});
