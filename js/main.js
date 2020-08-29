var game = {
    canvas: undefined,
    ctx: undefined,
    sprite: new Image(),
    fps: 40,
    speed: 10,
    points: 0,
    highScore: 0,
    numbers: [1294, 1316, 1334, 1354, 1374, 1394, 1414, 1434, 1454, 1474],
    start: false
}

var floor = {
    spriteX: 0,
    spriteY: 104,
    width: 1200,
    height: 26,
    x:0,
    y:137,
    x2:600
}

var clouds = [{ x:740, y:50 },{ x:3000, y:50 },{ x:1320, y:70 }];
clouds.forEach(cloud => {
    cloud.spriteX = 166;
    cloud.spriteY = 3;
    cloud.width = 91;
    cloud.height = 28;
    cloud.speed = 4;
    cloud.setX = cloud.x
});

var obstacle = obstacles[Math.round(Math.random() * (obstacles.length - 1))];

var dino = {
    spriteX: [1678, 1854, 1942, 2030, 1767, 2203, 2321],
    spriteY: 3,
    width: 87,
    height: 92,
    x: 20,
    y: 103,
    i: 0,
    speed: 0,
    isJumping: false,
    isDucking: false
}

document.onload = initCanvas;

function initCanvas() {
    game.canvas = document.getElementById('canvas');
    game.ctx = game.canvas.getContext('2d');
    game.sprite.src = 'img/sprite.png';

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.getElementById('canvas').onmousedown = jump;

    loop();
    spriteAnimations();
    setInterval(() => dino.i = 4, 10000)
}

var loop = function (){
    clear();
    if(game.start){
        update();
        draw();
    }
    else{
        game.ctx.drawImage(game.sprite, 76, 3, dino.width, dino.height, dino.x, dino.y, dino.width/2, dino.height/2)
    }
    setTimeout(loop, 1000/game.fps);
}


var clear = function (){
    game.canvas.width = 600;
    game.canvas.height = 150;
}

var draw = function (){
    game.draw(floor);
    clouds.forEach(cloud => {
        game.draw(cloud);
    });
    game.draw(obstacle);
    game.draw(dino);
}
game.draw = function (e){
    isNaN(e.spriteX)?
    game.ctx.drawImage(game.sprite, e.spriteX[e.i], e.spriteY, e.width, e.height, e.x, e.y, e.width/2, e.height/2)
    :(
        game.ctx.drawImage(game.sprite, e.spriteX, e.spriteY, e.width, e.height, e.x, e.y, e.width/2, e.height/2)
        )
    }
    
var spriteAnimations = function (){
    obstacle.animation();
    dino.animation();
    
    setTimeout(spriteAnimations, 1000/game.speed)
}

var update = function (){
    game.over();
    game.updateScore();
    game.move();
}

game.over = function (){
    if((dino.x + dino.width/2 - 10 >= obstacle.x && dino.x <= obstacle.x + obstacle.width/2) 
    && (dino.y + dino.height/2 - 10 >= obstacle.y && dino.y <= obstacle.y + obstacle.height/2)){
        clouds.forEach(cloud => {
            cloud.speed = 0;
        });
        if(dino.isDucking){
            dino.getUp();
            dino.i = 3;
            obstacle.x -= 8
        }
        if(obstacles.length == 9){
            obstacles.splice(6, 3)

        }
        this.speed = 0;
        this.ctx.drawImage(this.sprite, 1294, 29, 380, 20, 200, 50, 380/2, 20/2);
        this.ctx.drawImage(this.sprite, 2, 2, 71, 63, 280, 85, 71/2, 63/2);
        return true
    }
    else{
        return false
    }
}

game.updateScore = function (){
    this.points += 1/4;
    if(this.over()){
        if(this.points > this.highScore){
            this.highScore = this.points.toFixed();
        }
        this.points = 0;
    }
    if(this.points % 100 == 0 && this.points != 0){
        this.speed ++
    }
    if(this.points == 400){
        pterodactyls.forEach(e => {
            obstacles.push(e)
        });
    }
    this.drawScore();
    
}
game.drawScore = function (){
    let score = PadLeft(this.points.toFixed());
    let highScore = PadLeft(this.highScore);
    
    this.ctx.drawImage(this.sprite, 1494, 3, 40, 20, 440, 20, 40/2, 10)

    this.ctx.drawImage(this.sprite, this.numbers[highScore.charAt(0)], 3, 20, 20, 470, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[highScore.charAt(1)], 3, 20, 20, 480, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[highScore.charAt(2)], 3, 20, 20, 490, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[highScore.charAt(3)], 3, 20, 20, 500, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[highScore.charAt(4)], 3, 20, 20, 510, 20, 20/2, 10)

    this.ctx.drawImage(this.sprite, this.numbers[score.charAt(0)], 3, 20, 20, 530, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[score.charAt(1)], 3, 20, 20, 540, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[score.charAt(2)], 3, 20, 20, 550, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[score.charAt(3)], 3, 20, 20, 560, 20, 20/2, 10)
    this.ctx.drawImage(this.sprite, this.numbers[score.charAt(4)], 3, 20, 20, 570, 20, 20/2, 10)
}
var PadLeft = function (value){
    return (value.toString().length < 5) ? PadLeft("0" + value) : value.toString();
}

game.move = function (){
    floor.move();
    cloudsMove();
    obstacle.move();
    dino.fall();
}

floor.move = function (){
    if(this.spriteX < 2400){
        this.spriteX += (game.speed*2)
        if(this.spriteX >= 1200){
            game.ctx.drawImage(game.sprite, 0, this.spriteY, this.width, this.height, this.x2, this.y, this.width/2, this.height/2)
            this.x2 -= game.speed
        }
    }
    else{
        this.spriteX = 0
        this.x2 = 600
    }
}

var cloudsMove = function (){
    clouds.forEach(cloud => {
        cloud.x <= -cloud.width? 
        cloud.x = cloud.setX 
        : 
        cloud -= cloud.speed;
    });
}

obstacle.move = function (){
    if(this.x > -this.width/2){
        this.x -= game.speed;
    }
    else{
        this.x = game.canvas.width + this.width/2;
        let move = this.move;
        let animation = this.animation;
        let i = Math.round(Math.random() * (obstacles.length - 1));
        obstacle = obstacles[i];
        obstacle.move = move;
        obstacle.animation = animation;
    }
}

obstacle.animation = function (){
    if(!game.over()){
        if(this.i == 0){
            this.i ++
        }
        else{
            this.i = 0
        }
    }
}

dino.jump = function (){
    if(!this.isDucking){
        this.isJumping = true;
        this.speed = 14;
    }
}

dino.fall = function (){
    if(this.isJumping && !game.over()){
        if(this.y - this.speed > 103){
            this.isJumping = false;
            this.y = 103;
        }
        else{
            this.speed -= 1;
            this.y -= this.speed;
        }
    }
    else{
        this.isJumping = false
    }
}

dino.duck = function (){
    if(!game.over() && game.start){
        if(!this.isJumping){
            this.isDucking = true;
            this.y = 120;
            this.spriteY = 36;
            this.height = 56;
            this.width = 118;
            this.i = 5;
        }
        else{
            this.speed -= 4
        }
    }
}

dino.getUp = function(){
    this.isDucking = false;
    this.y = 104;
    this.width = 87;
    this.height = 92;
    this.spriteY = 3;
    this.i = 0;
}

dino.animation = function (){
    if(game.over()){
        this.i = 3;
    }
    else if(this.isJumping){
        this.i = 0;
    }
    else if(this.isDucking){
        this.i < 6? this.i = 6 : this.i = 5;
    }
    else{
        this.i < 2? this.i = 2 : this.i = 1;
    }
}

var handleKeyDown = function (key){
    if(key.keyCode == 32 || key.keyCode == 38 || key.keyCode == 87){
        jump()
    }
    else if(key.keyCode == 40){
        dino.duck();
    }
}

var handleKeyUp = function (key){
    if(game.over()){
        if(key.keyCode == 32 || key.keyCode == 38 || key.keyCode == 87){
            game.newGame()
        }
    }
    else{
        if(key.keyCode == 40){
            dino.getUp();
        }
    }
}

var jump = function (){
    if(!game.over() && game.start){
        if(!dino.isJumping){
            dino.jump();
        }
    }
        else{
            game.start = true;
            game.newGame();
        }
}

game.newGame = function (){
    obstacle.x = 800;
    dino.y = 103;
    game.speed = 10;
    clouds.forEach(cloud => {
        cloud.speed = 3;
    });
}