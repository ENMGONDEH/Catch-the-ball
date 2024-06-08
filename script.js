const ball = document.getElementById('ball');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('resetButton');
const loading = document.getElementById('loading');
let score = 0;
let speed = 1000;
let interval;

function getRandomPosition() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const maxX = gameAreaRect.width - ballRect.width;
    const maxY = gameAreaRect.height - ballRect.height;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
}

function moveBall() {
    ball.hidden = true;
    loading.hidden = false;

    setTimeout(() => {
        const position = getRandomPosition();
        ball.style.left = `${position.x}px`;
        ball.style.top = `${position.y}px`;
        ball.hidden = false;
        loading.hidden = true;
    }, 500);
}

function startGame() {
    score = 0;
    speed = 1000;
    scoreDisplay.textContent = score;
    loading.hidden = false;
    setTimeout(() => {
        loading.hidden = true;
        ball.hidden = false;
        interval = setInterval(moveBall, speed);
    }, 1000);
}

ball.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    speed *= 0.9;
    clearInterval(interval);
    interval = setInterval(moveBall, speed);
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    ball.hidden = true;
    startGame();
});

startGame();