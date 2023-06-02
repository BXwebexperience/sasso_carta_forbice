import { init } from "../script.js";
import { userChoise } from "./keyboard.js";

let winner = document.getElementById('vincitore');
let userScoreboard = document.querySelector('.userScoreboard');
let pcScoreboard = document.querySelector('.pcScoreboard');
let gameScreen = document.getElementById("game-over-screen");

// Creo un oggetto che ospita le emojis
var emojis = [
	'/emojis/rock.png',
	'/emojis/paper.png',
	'/emojis/scissors.png'
];

let gameOver = false;
let pcChoise = '';
let vincitore = '';
let userPunteggio = 0;
let pcPunteggio = 0;
let maxPunteggio = 3;
let trophy = '&#x1F3C6';
let skull = '&#x1F480';

// funzione che genera randomicamente la risposta del computer
function setWinner() {
	// number assegna un numero ad ogni elemento dell'array emojis
	let number = Math.floor(Math.random()*emojis.length);
	let randomEmoji=document.getElementById('randomEmoji');
	randomEmoji.src=emojis[number];
	document.body.append(randomEmoji);
	randomEmoji.onload = function pcEmoji() {
    document.getElementById('canvas').getContext('2d').drawImage(randomEmoji, 140, 30);
      
    // assegno una stringa alla scelta randomica per riutilizzarlo sulla vincita
    if (number == 0)
      pcChoise = "rock";
    if (number == 1)
      pcChoise = "paper";
    if (number == 2)
      pcChoise = "scissors";

    // controllo il vincitore
    if(userChoise == pcChoise){
      vincitore = 'pareggio';
    }
    if(
      userChoise == 'rock' && pcChoise == 'scissors' ||
      userChoise == 'paper' && pcChoise == 'rock' ||
      userChoise == 'scissors' && pcChoise == 'paper' ){
        vincitore = '1 punto per te';
        userScoreboard.innerHTML += trophy;
        userPunteggio++;
        checkPoints();
        pcScoreboard.innerHTML += skull;
      }
    if(
      userChoise == 'rock' && pcChoise == 'paper' ||
      userChoise == 'paper' && pcChoise == 'scissors' ||
      userChoise == 'scissors' && pcChoise == 'rock' ){
        vincitore = '1 punto per computer';
        pcScoreboard.innerHTML += trophy;
        pcPunteggio++;
        checkPoints();
        userScoreboard.innerHTML += skull;
      }

    winner.innerHTML += vincitore;
    setTimeout(clearText, 1000)
	}; 
}

// controllo se user o pc hanno 3 punti (trofei) e mostro madale fine gioco
function checkPoints(){
  if(userPunteggio === maxPunteggio || pcPunteggio === maxPunteggio){
    gameOver = true;
    setTimeout(showGameOver, 1000);
  }
}

// Funzione per far ripartire il gioco
function restart(){
	// Resetto la schermata di gameover e azzero i punti
  gameOver = false;
  gameScreen.innerHTML = "";
	gameScreen.style.display = 'none';
  userPunteggio = 0;
  userScoreboard.innerHTML = '';
  pcPunteggio = 0;
  pcScoreboard.innerHTML = '';
	// Inizializzo il gioco
	init();
}

// Funzione per mostrare la schermata di game over
function showGameOver() {
	gameScreen.style.display = 'flex';
	if(userPunteggio === maxPunteggio){
		// Se il player ha vinto
		gameScreen.innerHTML += "<h2>" +trophy +" Hai vinto! " +trophy +"</h2>";
	}
  if(pcPunteggio === maxPunteggio ) {
		// Se il player ha perso
		gameScreen.innerHTML = "<p>" +skull +" Game over... " +skull +"</p>";
	}
  let button = document.createElement('button')
  button.textContent = 'RESTART'
  button.addEventListener('click', () => {
    restart();
  })
  gameScreen.append(button)
}

function clearText(){
  winner.innerHTML = '';
}

export { setWinner, checkPoints, restart, gameOver }