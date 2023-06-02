let canvasElement = document.getElementById('canvas');
let canvasContext = canvasElement.getContext("2d");

// Creo un oggetto che ospita il canvas, il context e anche la schermata di game over
let canvas = {
	canvasElement,
	canvasContext
}

// pulisce la canvas per poter disegnare nuovamente le emojis
function clearCanvas() {
	canvas.canvasContext.clearRect(0, 0, canvas.canvasElement.width, canvas.canvasElement.height);
}

export {canvas, clearCanvas}