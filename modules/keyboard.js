import { canvas, clearCanvas } from "./canvas.js";
import { restart, setWinner, gameOver } from "./rules.js";

var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");

// Creo un oggetto che ospita lo stato dei pulsanti che servono
let keyboard = {
	isSKeyPressed: false,
	isCKeyPressed: false,
	isFKeyPressed: false
}

let userChoise = '';

// Creo i controlli aggiungendo dei listeners
function createKeyboardControls() {
	// abilito la possibilità di premere tasti (la tastiera)
	var locked = false;

	// Quando il player preme un pulsante
	document.addEventListener('keydown', function (e) {
		if(gameOver){
			locked = true;
			return
		}

		// Controllo tasto ha premuto
		if(e.code === 'KeyS'){
			keyboard.isSKeyPressed = true;
			createRock();
			setWinner();
		}
		if(e.code === 'KeyC'){
			keyboard.isCKeyPressed = true;
			createPaper();
			setWinner();
		}
		if(e.code === 'KeyF'){
			keyboard.isFKeyPressed = true;
			createScissors();
			setWinner();
		}
		// disabilito la possibilità di fare altri lanci nel frattempo
		locked = true;
		// la riabilito dopo 1 secondo e intanto pulisco la canvas, per giocare nuovamente
		setTimeout( function(){ locked = false; },1000);
		setTimeout(clearCanvas, 1000)
	})
}

function createRock() {
	canvas.canvasContext.beginPath();
	canvas.canvasContext.drawImage(rock, 140, 250);
	userChoise = 'rock';
}

function createPaper() {
	canvas.canvasContext.beginPath();
	canvas.canvasContext.drawImage(paper, 140, 250);
	userChoise = 'paper';
}

function createScissors() {
	canvas.canvasContext.beginPath();
	canvas.canvasContext.drawImage(scissors, 140, 250);
	userChoise = 'scissors';
}

export { createKeyboardControls, userChoise}