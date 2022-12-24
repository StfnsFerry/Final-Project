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

