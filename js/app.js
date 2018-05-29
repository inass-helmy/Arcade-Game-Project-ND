// Enemies our player must avoid
let allEnemies = [];
let gemsArray = [];
let life = [];
var time;
let livesNumber = 3;
let timer = document.querySelector(".timer");

var rows = [ 60, 140, 220];
var col = [30, 200, 400];
class Enemy {
    // Variables applied to each of our instances go here,

    constructor() {


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = rows[Math.floor(Math.random() * 3)];
        this.speed = random(300,100);

    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {

         if(this.x >= 505)
    {
        this.x = 0;
        this.y = rows[Math.floor(Math.random() * 3)];
    }
    this.x += this.speed * dt;
    
    }
    
    // Draw the enemy on the screen, required method for game
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

// player class

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';

        this.x = 200;
        this.y = 430;
        this.moveDelta = 50;
    }


    update(dt) {

    }

    render() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 150);

    }

//this functions handles the user input and prevent the player from getting out of the canva

    handleInput(move) {

            if(move == 'left' && this.x >= 10)
        {
            this.x -= this.moveDelta;
        }
        if(move == 'right' && this.x <= 390)
        {
            this.x += this.moveDelta;
        }

        if(move == 'up' && this.y >= 0)
        {
            this.y -= this.moveDelta;
        }
        if(move == 'down' && this.y <= 410)
        {
            this.y += this.moveDelta;
        }

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
if (player.x < this.x + 40&&
   player.x + 40 > this.x &&
   player.y < this.y +20&&
   player.y + 20 > this.y){
    console.log("done");
    this.collected = true;
    gemsArray = gemsArray.filter(gem => this.collected = false);

}

}

};
for (let i = 0; i < 3 ; i++) {

    gemsArray[i] = new Gems() ; 

}


//a class to handle lives calculations

class Lives {

    constructor(x,y) {
        this.sprite = 'images/Heart.png';
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 40);
    }

    update() {

    life.splice((livesNumber-1),1);
    }
};

class Score {

    constructor(x,y) {
        this.x = 150;
        this.y = 0;
    }

    render() {
        ctx.fillText('Score : ', this.x, this.y);
    }

    // update() {
    // // ctx.clearRect(this.x,this.y, 30, 40);
    // life.splice((livesNumber-1),1);
    // }
};
let score = new Score();




    life = [new Lives(0,0), new Lives(60,0), new Lives(120,0)]; 


//this function generates random number in a specified range

function random(min, max) {
return Math.random() * (max - min) + min;
}

function checkCollisions(){

allEnemies.forEach(function(enemy){

if (player.x < enemy.x + 40 &&
   player.x + 40 > enemy.x &&
   player.y < enemy.y + 60 &&
   player.y + 60 > enemy.y){
    setGame();
life.forEach(function(heart) {
            heart.update();
        });
livesNumber--;
// if(livesNumber===0) {
//     loseGame();
// }

}
})
 
};

function setGame(){
    player.x = 200;
    player.y = 430;
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();

for (let i = 0; i < 3; i++) {

    allEnemies[i] = new Enemy() ; 

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

