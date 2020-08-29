// objects
var game = {
    canvas: undefined,
    ctx: canvas.getContext('2d'),
    sprite:new Image(),
    sound:new Audio(),
    speed: 10,
    points: 0,
    hScore: 0,
    gameStart: false,
    score: function (){
        this.points += 1/4
        if(this.gameOver()){
            if(this.points > this.hScore){
                this.hScore = this.points.toFixed();
            }
            this.points = 0;
        }
        this.ctx.font = '20px impact';
        this.ctx.fillText(`HI ${this.hScore}   ${this.points.toFixed()}`, 450, 30)
    },
    gameOver: function (){
        if((trex.x + trex.width - 10 >= obstacle.x && trex.x <= obstacle.x + obstacle.width) 
        && (trex.y + trex.height - 10 >= obstacle.y && trex.y <= obstacle.y + obstacle.height)){
            this.speed = 0;
            cloud.speed = 0;
            this.ctx.drawImage(this.sprite, 1294, 29, 380, 20, 200, 50, 380/2, 20/2);
            this.ctx.drawImage(this.sprite, 2, 2, 71, 63, 280, 85, 71/2, 63/2);
            return true
        }
        else{
            return false
        }
    }
}

var floor = {
    img: new Image(),
    y:103,
    x:0,
    x2:600,
    draw: function (){
        game.ctx.drawImage(game.sprite, this.x, 104, 1200, 26, 0, 137, 600, 13)
        game.ctx.drawImage(game.sprite, 0, 104, 1200, 26, this.x2, 137, 600, 13)
    },
    move: function(){
        if(this.x < 2400){
            this.x += (game.speed*2)
            if(this.x >= 1200){
                this.x2 -= game.speed
            }
        }
        else{
            this.x = 0
            this.x2 = 600
        }
    }
}

var trex = {
    x: 20,
    y: floor.y,
    sprite: [1678, 1854, 1942, 2030, 1767, 2203, 2321],
    spriteY: 3,
    i:0,
    originalWidth: 87,
    originalHeight: 92,
    width: 87/2,
    height: 92/2,
    speed: 0,
    isJumping: false,
    jump: function () {
        this.isJumping = true;
        this.speed = 14
    },
    gravity: function () {
        if(this.isJumping && !game.gameOver()){
            if(this.y - this.speed > floor.y){
                this.isJumping = false;
                this.y = floor.y;
            }
            else{
                this.speed -= 1;
                this.y -= this.speed;
            }
        }
        else{
            this.isJumping = false
        }
    },
    draw: function (){
        if(!game.gameOver()){
            game.ctx.drawImage(game.sprite, this.sprite[this.i], this.spriteY, this.originalWidth, this.originalHeight, this.x, this.y, this.width, this.height)
        }
        else{
            game.ctx.drawImage(game.sprite, this.sprite[3], 3, 87, 92, this.x, this.y, this.width, this.height)
        }
    },
    move: function (){
        if(this.i < 2){
            this.i+= 1
        }
        else{
            this.i = 0;
        }
    }
}

var obstacle = obstacles[Math.round(Math.random() * (obstacles.length - 1))]
obstacle.draw = function (){
    if(isNaN(this.spriteX)){
        game.ctx.drawImage(game.sprite, this.spriteX[this.i], this.spriteY, this.originalWidth, this.originalHeight, this.x, this.y, this.width, this.height)
    }
    else{
        game.ctx.drawImage(game.sprite, this.spriteX, this.spriteY, this.originalWidth, this.originalHeight, this.x, this.y, this.width, this.height)
    }
}
obstacle.move = function(){
    if(this.x > -this.width){
        this.x -= game.speed
    }
    else{
        this.x = game.canvas.width + this.width
        let draw = this.draw
        let move = this.move
        let i = Math.round(Math.random() * (obstacles.length - 1))
        obstacle = obstacles[i]
        obstacle.draw = draw
        obstacle.move = move
    }
}


var cloud = {
    x:740,
    x2:3000,
    x3:1320,
    y: 50,
    y2:30,
    y3:70,
    speed: 4,
    draw: function (){
        game.ctx.drawImage(game.sprite, 165, 0, 100, 30, this.x, this.y, 50, 15)
        game.ctx.drawImage(game.sprite, 165, 0, 100, 30, this.x2, this.y2, 50, 15)
        game.ctx.drawImage(game.sprite, 165, 0, 100, 30, this.x3, this.y3, 50, 15)
    },
    move: function(){
        if(this.x <= -120){
            this.x = 740
        }
        else if(this.x2 <= -120){
            this.x2 = 970
        }
        else if(this.x3 <= -120){
            this.x3 = 2320
        }
        else{
            this.x -= this.speed
            this.x2 -= this.speed
            this.x3 -= this.speed
        }
    }
}

// init canvas

function initCanvas() {
    game.canvas = document.getElementById('canvas');
    game.sprite.src = 'img/sprite.png'
    game.sound.src = 'aviso.mp3'
}

//loop
var fps = 40;
setInterval(() => start(), 1000/fps)
trex.run = setInterval(() => trex.move(), 1000/game.speed)
trex.blink = setInterval(() => trex.i = 4, 10000)
setInterval(() => {
    if(!game.gameOver()){
        if(obstacle.i == 0){
            obstacle.i ++
        }
        else{
            obstacle.i = 0
        }
    }
}, 1000/game.speed)



function start() {
    if(game.gameStart){
        clear();
        cloud.move();
        cloud.draw();
        game.gameOver();
        game.score();
        floor.move();
        floor.draw();
        obstacle.move();
        obstacle.draw()
        trex.gravity();
        trex.draw();
    }
    else{
        clear()
        game.ctx.drawImage(game.sprite, 76, 3, 87, 92, trex.x, trex.y, trex.width, trex.height)
    }
}

//events
document.onkeydown = function (tecla) {
    if(tecla.keyCode == 32 || tecla.keyCode == 38 || tecla.keyCode == 87){
        jump()
    }
    // else if(tecla.keyCode == 40){
    //     console.log('agacharse')
    //     clearInterval(trex.run)
    //     trex.originalWidth = 118
    //     trex.width = 59
    //     trex.originalHeight = 56
    //     trex.height = 28
    //     trex.spriteY = 36
    //     trex.i = 5
    //     trex.y = 118
    // }
}

// document.onkeyup = function (){
//     clearInterval(trex.bend)
//     trex.originalWidth = 87
//     trex.width = 43
//     trex.i = 0
//     trex.run = setInterval(() => trex.move(), 1000/game.speed)
// }

document.getElementById('canvas').onmousedown = function () {jump()}

function jump (){
    clearInterval(trex.bend)
    trex.i = 0
    console.log('saltar')
    if(!trex.isJumping){
        if(!game.gameOver() && game.gameStart){
            trex.jump()
        }
        else{
            game.gameStart = true;
            newGame();
        }
    }
}

//new game
function newGame(){
    obstacle.x = 800;
    trex.y = floor.y;
    game.speed = 10;
    cloud.speed = 3;
}

//clear canvas
function clear() {
    game.canvas.width = 600;
    game.canvas.height = 150;
}


