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
