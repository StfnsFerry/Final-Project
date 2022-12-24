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

function preload(){
    bulletImage = loadImage('img/asteroids_peluru.png');
    shipImage = loadImage('img/asteroids_kapal1.png');
    particleImage = loadImage('img/asteroids_particle.png');
    starImage = loadImage('img/star.png');
}

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

function asteroidHit(asteroid, bullet) {
    var newType = asteroid.type - 1;

    if (newType > 0) {
        monster.moveRandom(newType, asteroid.position.x, asteroid.position.y);
        monster.moveRandom(newType, asteroid.position.x, asteroid.position.y);
    }

    for (var i = 0; i < 100; i++) {
        var p = createSprite(bullet.position.x, bullet.position.y);
        p.addImage(particleImage);
        p.setSpeed(random(20, 100), random(360));
        p.friction = 0.95;
        p.life = 2;
    }
    
    hero.increaseScore();

    bullet.remove();
    asteroid.remove();
}

function reset() {
    score = 0;
    life = 3;
    ship = createSprite(width / 2, height - 30);
    ship.maxSpeed = 60;
    ship.friction = 0.7;
    ship.rotation = 270;
    ship.setCollider('circle', 0, 0, 20);
    ship.addAnimation('thrust', 'img/asteroids_kapal2.png', 'img/asteroids_kapal7.png');
    asteroids.removeSprites();
    
    for (var i = 0; i < 8; i++) {
        var ang = random(360);
        var px = width / 2 + 0.4 * width * cos(radians(ang));
        var py = 0.1 * height * sin(radians(ang));
        monster.moveRandom(3, px, py);
    }
    
    for (var i = 0; i < 30; i++) {
        var ang = random(360);
        var px = width * cos(radians(ang));
        var py = height * sin(radians(ang));
        var star = createSprite(px, py);
        star.draw = function () { var size = random(2, 5); fill(255, 255, 0); ellipse(0, 0, size, size) }
        star.setSpeed(1, 90);
        star.rotationSpeed = 0.5;
    }
}

function removeAll() {
    for (i = 0; i < allSprites.length;) {
        allSprites[i].remove();
    }
}

class Map{
  
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
  
}

class Level{
    constructor(l) {
        this.currentLevel = l;
        this.latestLevel;
        this.maxLevel = 3;
    }

    setLevel(){
        return this.latestLevel;
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
    constructor(type,x, y) {
        super();
        this.color = [0,0,0];
        this.type;
        this.effect;
        this.life;
    }

    moveRandom(type,x,y){
        var a = createSprite(x, y);
        var img = loadImage('img/asteroid' + floor(random(0, 3)) + '.png');
        a.addImage(img);
        a.setSpeed(5 - (type / 2), random(85, 95));
        a.rotationSpeed = 0.5;
        a.type = type;

        if (type == 2)
        a.scale = 0.6;
        if (type == 1)
        a.scale = 0.3;

        a.mass = 2 + a.scale;
        a.setCollider('circle', 0, 0, 50);
        asteroids.add(a);
        return a;
    }
    
    saveScore(){
        text(`Score: ${score}`, 4 * width / 5, 30);
    }
}

class Hero extends Entity{
    constructor(x, y) {
        super(x,y);
        this.life = 3;
        this.score = 0;
    }
    
    increaseScore(){
        score++;
    }

    calculateLife(){
        if (life < 2) fill(255, 0, 0)
        text(`Lives: ${life}`, width / 5, 30);
    }

    saveScore(){
        text(`Score: ${score}`, 4 * width / 5, 30);
    }
}
