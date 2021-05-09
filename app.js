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
let isHorizontal = true;

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

//Ships
const shipArray = [
  {
    name: "destroyer",
    directions: [
      [0, 1],
      [0, BOARD_WIDTH],
    ],
  },
  {
    name: "submarine",
    directions: [
      [0, 1, 2],
      [0, BOARD_WIDTH, BOARD_WIDTH * 2],
    ],
  },
  {
    name: "cruiser",
    directions: [
      [0, 1, 2],
      [0, BOARD_WIDTH, BOARD_WIDTH * 2],
    ],
  },
  {
    name: "battleship",
    directions: [
      [0, 1, 2, 3],
      [0, BOARD_WIDTH, BOARD_WIDTH * 2, BOARD_WIDTH * 3],
    ],
  },
  {
    name: "carrier",
    directions: [
      [0, 1, 2, 3, 4],
      [0, BOARD_WIDTH, BOARD_WIDTH * 2, BOARD_WIDTH * 3, BOARD_WIDTH * 4],
    ],
  },
];

//Generate computer's ships
function generateComputerShips(ship) {
  let randomDirection = Math.floor(Math.random() * ship.directions.length);
  let current = ship.directions[randomDirection];
  if (randomDirection === 0) direction = 1;
  else direction = 10;
  let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - ship.directions[0].length * direction));

  const isTaken = current.some((index) => computerSquares[randomStart + index].classList.contains("taken"));
  const isAtRightEdge = current.some((index) => (randomStart + index) % BOARD_WIDTH === BOARD_WIDTH - 1);
  const isAtLeftEdge = current.some((index) => (randomStart + index) % BOARD_WIDTH === 0);

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach((index) => computerSquares[randomStart + index].classList.add("taken", ship.name));
  else generateComputerShips(ship);
}

shipArray.forEach((ship) => {
  generateComputerShips(ship);
});

//Rotate the ships
function rotateShips() {
  if (isHorizontal) {
    destroyer.classList.toggle("destroyer-container-vertical");
    submarine.classList.toggle("submarine-container-vertical");
    cruiser.classList.toggle("cruiser-container-vertical");
    battleship.classList.toggle("battleship-container-vertical");
    carrier.classList.toggle("carrier-container-vertical");
    isHorizontal = false;
  } else {
    destroyer.classList.toggle("destroyer-container-vertical");
    submarine.classList.toggle("submarine-container-vertical");
    cruiser.classList.toggle("cruiser-container-vertical");
    battleship.classList.toggle("battleship-container-vertical");
    carrier.classList.toggle("carrier-container-vertical");
    isHorizontal = true;
  }
}

rotateBtn.addEventListener("click", rotateShips);

//Move user ships
let selectedShipNameWithIndex;
let draggedShip;
let draggedShipLength;

ships.forEach((ship) => ship.addEventListener("mousedown", (e) => (selectedShipNameWithIndex = e.target.id)));
ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
userSquares.forEach((square) => square.addEventListener("dragstart", dragStart));
userSquares.forEach((square) => square.addEventListener("dragover", dragOver));
userSquares.forEach((square) => square.addEventListener("dragenter", dragEnter));
userSquares.forEach((square) => square.addEventListener("dragleave", dragLeave));
userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
userSquares.forEach((square) => square.addEventListener("dragend", dragEnd));

function dragStart() {
  draggedShip = this;
  draggedShipLength = this.children.length;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  let shipNameWithLastId = draggedShip.lastElementChild.id;
  let shipClass = shipNameWithLastId.slice(0, -2);
  let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
  let shipLastId = lastShipIndex + parseInt(this.dataset.id);
  const notAllowedHorizontalArr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92];
  const notAllowedVerticalArr = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61];

  let notAllowedHorizontal = notAllowedHorizontalArr.splice(0, 10 * lastShipIndex);
  let notAllowedVertical = notAllowedVerticalArr.splice(0, 10 * lastShipIndex);

  selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

  shipLastId = shipLastId - selectedShipIndex;

  if (isHorizontal && !notAllowedHorizontal.includes(shipLastId)) {
    for (let i = 0; i < draggedShipLength; i++) {
      userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add("taken", shipClass);
    }
  } else if (!isHorizontal && !notAllowedVertical.includes(shipLastId)) {
    for (let i = 0; i < draggedShipLength; i++) {
      userSquares[parseInt(this.dataset.id) - selectedShipIndex + BOARD_WIDTH * i].classList.add("taken", shipClass);
    }
  } else {
    return;
  }

  displayGrid.removeChild(draggedShip);
}

function dragEnd() {}
