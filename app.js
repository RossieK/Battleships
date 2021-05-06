//Selectors
const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const displayGrid = document.querySelector(".grid-display");
const ships = document.querySelectorAll(".ship");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const startBtn = document.getElementById("start");
const rotateBtn = document.getElementById("rotate");
const turnDisplay = document.getElementById("whose-go");
const infoDisplay = document.getElementById("info");
const userSquares = [];
const computerSquares = [];

const BOARD_WIDTH = 10;

//Crate Bord
function createBord(grid, squares, width) {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.dataset.id = i;
    grid.appendChild(square);
    squares.push(square);
  }
}

createBord(userGrid, userSquares, BOARD_WIDTH);
createBord(computerGrid, computerSquares, BOARD_WIDTH);
