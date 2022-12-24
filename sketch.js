var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;
var score = 0;
var life = 3;
var level = 1;

let hero;
let monster;
let lvl;
let map;

function setup(){
createCanvas(500,740);
    map = new Map(500,740)
    lvl = new Level(3)
    hero = new Hero();
    monster = new Monster();
    preload();
    
    asteroids = new Group();
    bullets = new Group();
    reset();
}

function draw(){
    background(0);
    fill(255);
    textAlign(CENTER);
    textSize(16);
    text('Controls: Arrow Keys + X', width / 2, 20);
    hero.saveScore();
    text(`Level: ${level}`, width / 5, 50);
    hero.calculateLife();
    
    for (var i = 0; i < allSprites.length; i++) {
        var s = allSprites[i];
        if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
        if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
        if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
        if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
    }
    
    asteroids.overlap(bullets, asteroidHit);
    ship.overlap(asteroids, decLife);
    
    if (keyDown(LEFT_ARROW))
        hero.moveLeft();
    
    if (keyDown(RIGHT_ARROW))
        hero.moveRight();
    
    if (keyDown(UP_ARROW))
        hero.moveUp();
    
    if (keyDown(DOWN_ARROW))
        hero.moveDown();
    
    if (keyWentDown('x')) {
        hero.attack();
    }
    
    if (life <= 0) {
        for (var j = 0; j < allSprites.length; j++) {
        var t = allSprites[j];
        t.setSpeed(0);
        }
        endScreen("GAME OVER", 0)
    }
    else if (asteroids.length === 0) {
        endScreen("YOU WIN", 1)
    }
    drawSprites();
}

class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    init(){

    }

    move(){

    }
}

class Level{
    constructor(){
        this.currentLevel = 0;
        this.latestLevel = 0;
        this.maxLevel = 0;
    }

    setLevel(level){
        this.currentLevel = level;
    }

    getCurrentLevel(){
        return this.currentLevel;
    }
}

class Entity{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.height = w;
        this.width = h;
    }

    attack() {
        var bullet = createSprite(ship.position.x, ship.position.y);
        bullet.addImage(bulletImage);
        bullet.setSpeed(20 + ship.getSpeed() / 2, ship.rotation);
        bullet.life = 20;
        bullets.add(bullet);
    }
  
    moveLeft(){
        ship.addSpeed(20, 180);
    }

    moveRight(){
        ship.addSpeed(20, 0);
    }

    moveUp(){
        ship.addSpeed(20, -90);
    }

    moveDown(){
        ship.addSpeed(20, 90);
    }
}

class Monster extends Entity{
    constructor(x, y, h, w) {
        super(x, y, h, w);
        this.life = 1;
        this.color = [0,0,0];
        this.effect = 0;
        this.type = 0;
    }

    moveRandom(){

    }

    saveScore(){

    }
}

class Hero extends Entity{
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.life = 100;
        this.score = 0;
    }

    increaseScore(){

    }

    calculateLife(){

    }

    saveScore(){
        
    }
}
