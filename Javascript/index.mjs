import { GameArea } from "./gamearea.mjs";

// change arrow every second
var fps;

let gameArea1 = new GameArea(500, 300, "#dbf279");

gameArea1.difficulty = 10;

gameArea1.drawSequence(2, 1);
gameArea1.drawSequence(1, 2);
gameArea1.drawSequence(3, 3);

gameArea1.index = [2, 1, 3];
gameArea1.correctAns(2);




