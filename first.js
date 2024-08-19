const player = document.getElementById('player');
const gameContainer = document.querySelector('.game-container');
const scoreBoard = document.getElementById('score');
let score = 0;
let gameInterval;

// Move the player---------
document.addEventListener('keydown', function(event) {
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = playerLeft - 20 + 'px';
    } else if (event.key === 'ArrowRight' && playerLeft < 350) {
        player.style.left = playerLeft + 20 + 'px';
    }
});

// Generate coins---------
function generateCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = Math.floor(Math.random() * 370) + 'px';
    coin.style.top = '0px';

    gameContainer.appendChild(coin);

    let coinFallInterval = setInterval(function() {
        let coinTop = parseInt(window.getComputedStyle(coin).getPropertyValue('top'));
        let coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue('left'));
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

        // Check if coin has hit the player----------
        if (coinTop >= 550 && coinLeft >= playerLeft && coinLeft <= playerLeft + 50) {
            score++;
            scoreBoard.textContent = score;
            coin.remove();
            clearInterval(coinFallInterval);
        }

        // Remove coin if it falls out of view--------
        if (coinTop >= 600) {
            coin.remove();
            clearInterval(coinFallInterval);
        }

        coin.style.top = coinTop + 5 + 'px';
    }, 20);
}

// Start game---------
function startGame() {
    gameInterval = setInterval(generateCoin, 1000);
}

startGame();
