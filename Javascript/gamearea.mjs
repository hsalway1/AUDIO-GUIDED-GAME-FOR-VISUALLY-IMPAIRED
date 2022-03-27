import { Arrow } from './Components.mjs';

export class GameArea {
    constructor (width, height, colour, difficulty = 5){
        this.canvas = document.getElementById("canvas");
        this.start = false;
        this.canvas.width = width;
        this.canvas.height = height;
        this.difficulty = difficulty;
        this.colour = colour;
        this.context = this.canvas.getContext("2d");

        this.context.fillStyle = colour;
        this.context.fillRect(0, 0, this.canvas.width, 0.9 * this.canvas.height);

        console.log(this.canvas.width, this.canvas.height);

        this.context.font = "20px Arial";
        this.context.strokeStyle = "black";

        this.sequence = [];
    }

    // draw each displayed arrow below the game area
    drawSequence = function(side, nArrows){
        let gap = this.canvas.width/this.difficulty;

        this.context.beginPath();
        this.context.moveTo(0, 0.9 * this.canvas.height);
        this.context.lineTo(this.canvas.width, 0.9 * this.canvas.height);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(gap * nArrows, 0.9 * this.canvas.height);
        this.context.lineTo(gap * nArrows, this.canvas.height);
        this.context.stroke();

        // side, width, height, x, y
        let arrow = new Arrow(side, 0.9 * gap, 0.08 * this.canvas.height, gap * (nArrows - 1), 0.91 * this.canvas.height);
        this.context.fillStyle = "#eaf0d1";
        arrow.getSequenceImage();
        arrow.draw(this.context);
    }

    answer = function(index, correct) {
        let gap = this.canvas.width/this.difficulty;

        let arrow = new Arrow(this.sequence[index], 0.9 * gap, 0.08 * this.canvas.height, gap * index, 0.91 * this.canvas.height);

        this.context.fillStyle = "#04d608"
        
        if (correct === false)
            this.context.fillStyle = "#ff5e5e";
    
        this.context.fillRect(index * gap, 0.9 * this.canvas.height, gap, 0.1 * this.canvas.height);

        this.context.beginPath();
        this.context.moveTo(gap * (index + 1), 0.9 * this.canvas.height);
        this.context.lineTo(gap * (index + 1), this.canvas.height);
        this.context.stroke();

        arrow.getSequenceImage();
        arrow.draw(this.context);
    }

    displayArrow = function(nArrows){

        let side = Math.floor(Math.random() * 4) + 1;

        this.sequence.push(side);
        
        let arrow = new Arrow(side, 0.3 * this.canvas.width, 0.7 * this.canvas.height, 0.35 * this.canvas.width, 0.1 * this.canvas.height);

        console.log(side);

        arrow.getImage();
        arrow.draw(this.context);
        arrow.getSound();

        this.drawSequence(side, nArrows);
    }

    updateArea = function(nArrow){
        // updating each frame

        this.clearArea();
        this.displayArrow(nArrow);
    }

    clearArea = function(){
        // erasing everything
        this.context.clearRect(0, 0, this.canvas.width, 0.9 * this.canvas.height);
        this.context.fillStyle = this.colour;
        this.context.fillRect(0, 0, this.canvas.width, 0.9 * this.canvas.height);
        this.context.strokeText("Difficulty " + this.difficulty/5, 0.75 * this.canvas.width, 0.1 * this.canvas.height);
    }

    displayScore = function(){
        // TODO 
    }

    resetArea = function(){
        this.clearArea();
        this.context.clearRect(0, 0.9 * this.canvas.height, this.canvas.width, this.canvas.height);
    }
}