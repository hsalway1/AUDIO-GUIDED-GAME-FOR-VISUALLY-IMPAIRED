import { GameArea } from "./gamearea.mjs";

let gameArea = new GameArea(500, 300, "#dbf279");
let audio = new Audio();

let correctAudio = new Audio("../Audio/Directions/Correct-answer.mp3");
correctAudio.volume = 0.2;

let wrongAudio = new Audio("../Audio/Directions/wrong-answer.wav");
wrongAudio.volume = 0.2;

var interval;

let background = document.getElementById("background");
background.volume = 0.2;
background.play();

async function displayArrows(difficulty) {
    gameArea.difficulty = difficulty;
    gameArea.sequence = [];

    let frames = 0;
    let nArrows = 1;

    let myPromise = new Promise((resolve) => {
        interval = setInterval(() => {
            frames += 1;
            if (nArrows <= difficulty) {
                gameArea.updateArea(nArrows);
                nArrows += 1;
                
            }

            else {
                gameArea.clearArea();
                resolve(interval);
            }
        }, 750);
    })

    interval = await myPromise;

    clearInterval(interval);
    interval = false;

    console.log(gameArea.sequence);
}

async function playAudio(source) {
    audio.src = source;
    audio.volume = 1;
    let myPromise = new Promise((resolve, reject) => {
        if (audio.paused) {
            setTimeout(() => { audio.play() }, 1000);
        }

        audio.onended = () => { resolve("Audio played successfully") };
    });

    let msg = await myPromise;

    console.log(msg);
}

async function takeInput() {
    let index = 0;
    let arrow;
    let myPromise = new Promise((resolve, reject) => {
        function eventHandler(event){
            console.log(event.key);

            switch(event.key){
                case "ArrowUp":
                    arrow = 1;

                    break;

                case "ArrowRight":
                    arrow = 2;
                    break;
                
                case "ArrowLeft":
                    arrow = 3;
                    break;

                case "ArrowDown":
                    arrow = 4;
                    break;

                default:
                    console.log("Enter correct number");
            }
            
            if (!arrow)
                return;

            if (gameArea.sequence[index] === arrow){
                console.log(index);
                gameArea.answer(index, true);
                index += 1;
    
                if (index == gameArea.sequence.length){
                    window.removeEventListener("keydown", eventHandler);
                    correctAudio.play();
                    resolve(true);
                }

                else{

                }
            }
    
            else{
                gameArea.answer(index, false);
                wrongAudio.play();
                window.removeEventListener("keydown", eventHandler);
                resolve(false);
            }
        }
        window.addEventListener("keydown", eventHandler);
    })

    let passed = await myPromise;

    if (passed)
        console.log("Level cleared!");

    else
        console.log("Better luck next time");

    return passed;
}

/* async function nextLevel(difficulty){

} */


async function startGame(difficulty) {
    gameArea.resetArea();

    if (interval){
        clearInterval(interval);
    }

    if (!audio.paused){
        audio.pause();
        audio.currentTime = 0;
    }
    
    await displayArrows(difficulty);
    await playAudio("../Audio/Directions/proceed.mp3");
    console.log(gameArea.sequence);
    let passed = await takeInput();

    if (passed){
        difficulty += 1;
        await startGame(difficulty);
    }

}

var difficulty = 1;

window.addEventListener("keydown", (event) => {
    if (event.key === " "){
        startGame(4 * difficulty);
    }

    else if (event.key === "m"){
        if (background.paused)
            background.play();

        else
            background.pause();
    }

})
