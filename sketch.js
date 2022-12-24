function setup(){

}

function draw(){

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

    attack(){

    }

    moveRight(){

    }

    moveLeft(){

    }

    moveDown(){

    }

    moveUp(){

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
