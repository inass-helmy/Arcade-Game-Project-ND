// Enemies our player must avoid
let allEnemies = [];
//array to hold all Gems
let gemsArray = [];
//array to hold all lives
let life = [];
//declaring the time and set the lives number to start at 3 lives
// and the score and collected Gems to start at 0 pts
var time;
let livesNumber = 3;
let score = 0;
let collectedGems = 0;
//array holding acoordinates to select from it the position
// of hearts and gems in the scoreboard
let displayX = [0, 30, 60];
let displayY = [0, 0, 0];
//coordinates for the enemies
var rows = [70, 150, 230];
var col = [30, 200, 400];
//query selecting the modals of the game (start and game over and winner)
let startModal = document.querySelector(".start-game");
let gameOver = document.querySelector(".game-over");
let winner = document.querySelector(".winner");
//variable to be used to display the final score of the player at the end of the game
let scoreDisplay = document.querySelector('#displayScore')

//this function to hide the welcome/instructions modal when the user accept the challenge
function startGame() {
    startModal.classList.add('hidden');
}
class Enemy {
    constructor() {

    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = rows[Math.floor(Math.random() * 3)];
        this.speed = random(300, 100);

    }
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {

        if (this.x >= 505) {
            this.x = 0;
            this.y = rows[Math.floor(Math.random() * 3)];
        }
        this.x += this.speed * dt;

    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

// player class

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';

        this.x = 200;
        this.y = 410;
        this.moveDelta = 50;
    }


    update(dt) {

        //this is to check if the player reach the water and win by collecting all Gems or not
        if (this.y <= 10 && collectedGems == 3) {
            this.winGame();
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 150);

    }

    //this functions handles the user input and prevent the player from getting out of the canva

    handleInput(move) {

        if (move == 'left' && this.x >= 10) {
            this.x -= this.moveDelta;
        }
        if (move == 'right' && this.x <= 390) {
            this.x += this.moveDelta;
        }

        if (move == 'up' && this.y >= 30) {
            this.y -= this.moveDelta;
        }
        if (move == 'down' && this.y <= 410) {
            this.y += this.moveDelta;
        }

    }

    winGame() {
        winner.style.visibility = "visible";
        scoreDisplay.innerHTML = score;

    }

};

//a class to handle the gems in the game 

class Gems {

    constructor() {
        this.sprite = 'images/Gem-Orange.png';
        this.x = col[Math.floor(Math.random() * 3)];
        this.y = random(100, 300);
        this.collected = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 60);

    }
    update() {
        if (player.x < this.x + 30 &&
            player.x + 80 > this.x &&
            player.y < this.y + 40 &&
            player.y + 130 > this.y) {
            this.collected = true;
            collectedGems++;
            scorePanel.update();
            gemsArray = gemsArray.filter(gem => gem.collected == false);
        }

    }

};
for (let i = 0; i < 3; i++) {

    gemsArray[i] = new Gems();

}


//a class to handle lives calculations

class Lives {

    constructor(x, y) {
        this.sprite = 'images/Heart.png';
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 40);
        //draw the collected gem in the scoreboard
        for (let i = 0; i < collectedGems; i++) {
            ctx.drawImage(Resources.get('images/Gem-Orange.png'), displayX[i] + 400, displayY[i], 20, 30);
        }

    }

    update() {

        life.splice((livesNumber - 1), 1);
    }
};

class Score {

    constructor() {
        this.x = 200;
        this.y = 28;
    }

    render() {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText('Score : ' + score, this.x, this.y);
    }

    update() {
        score += 100;
    }

};
let scorePanel = new Score();


for (let i = 0; i < 3; i++) {

    life[i] = new Lives(displayX[i], displayY[i]);
}


//this function generates random number in a specified range

function random(min, max) {
    return Math.random() * (max - min) + min;
}

//this is a function to check the collisions between player and enemies
function checkCollisions() {

    allEnemies.forEach(function (enemy) {

        if (player.x < enemy.x + 40 &&
            player.x + 40 > enemy.x &&
            player.y < enemy.y + 60 &&
            player.y + 60 > enemy.y) {
            setGame();
            life.forEach(function (heart) {
                heart.update();
            });
            livesNumber--;
            if (score > 0) {
                score -= 50;
            }
            if (livesNumber === 0) {
                loseGame();
            }

        }
    })

};

function loseGame() {
    gameOver.style.visibility = "visible";
}

function restart() {
    gameOver.style.visibility = "hidden";
    startModal.style.visibility = "hidden";
    window.location.reload(true);
}

function setGame() {
    player.x = 200;
    player.y = 410;
}

// Place the player object in a variable called player
let player = new Player();

// Place all enemy objects in an array called allEnemies
for (let i = 0; i < 3; i++) {

    allEnemies[i] = new Enemy();

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});