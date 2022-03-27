export class Arrow{
    constructor(side, width, height, x, y){
        this.side = side;
        this.width = width;
        this.height = height;
        this.pos = [x, y];
        this.sound = new Audio();
    }
    
    getImage = function(){
        // side is north
        if (this.side == 1){
            this.img = document.getElementById("direction-up");
        }

        // east
        else if (this.side == 2){
            this.img = document.getElementById("direction-right");

            this.height = 0.7 * this.height;
            this.width = 2 * this.width;

            this.pos[0] = 0.6 * this.pos[0];
            this.pos[1] = 1.9 * this.pos[1];
        }
    
        // west
        else if (this.side == 3){
            this.img = document.getElementById("direction-left");

            this.height = 0.7*this.height;
            this.width = 2 * this.width;

            this.pos[0] = 0.6 * this.pos[0];
            this.pos[1] = 1.9 * this.pos[1];
        }
    
        // south
        else{
            this.img = document.getElementById("direction-down");
        }
    }

    getSequenceImage = function(){
        if (this.side == 1){
            this.img = document.getElementById("sequence-up");
        }

        else if (this.side == 2){
            this.img = document.getElementById("sequence-right");
        }

        else if (this.side == 3){
            this.img = document.getElementById("sequence-left");
        }

        else{
            this.img = document.getElementById("sequence-down");
        }
    }

    getSound = function(){
        if (this.side == 1){
            this.sound.src = "../Audio/Directions/up.mp3";
        }
        else if (this.side == 2){
            this.sound.src = "../Audio/Directions/right.mp3";
        }
    
        else if (this.side == 3){
            this.sound.src = "../Audio/Directions/left.mp3";
        }
    
        else{
            this.sound.src = "../Audio/Directions/down.mp3";
        }

        this.sound.currentTime = 0;
        this.sound.play();
    }

    stopSound = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }

    draw = function(ctx){
        ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);
    }

}