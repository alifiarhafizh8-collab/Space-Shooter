const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const shootBtn = document.getElementById("shoot");

let score = 0;

const player = {
    x: 180,
    y: 540,
    width: 40,
    height: 40,
    speed: 20
};

let bullets = [];
let enemies = [];

leftBtn.onclick = () => {
    player.x -= player.speed;
    if (player.x < 0) player.x = 0;
};

rightBtn.onclick = () => {
    player.x += player.speed;
    if (player.x > canvas.width - player.width)
        player.x = canvas.width - player.width;
};

shootBtn.onclick = () => {
    bullets.push({
        x: player.x + 18,
        y: player.y,
        width: 4,
        height: 10
    });
};
function spawnEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 2
    });
}

setInterval(spawnEnemy, 1000);

function drawPlayer() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "yellow";

    bullets.forEach((bullet, index) => {
        bullet.y -= 8;

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );
    });
}

function drawEnemies() {
    ctx.fillStyle = "red";

    enemies.forEach((enemy, eIndex) => {
        enemy.y += enemy.speed;

        if (enemy.y > canvas.height) {
            enemies.splice(eIndex, 1);
        }

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );
    });
}
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);

                score++;
                scoreText.textContent = "Score: " + score;
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();

    checkCollisions();

    requestAnimationFrame(gameLoop);
}

gameLoop();
