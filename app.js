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
  let randomStart = Math.abs(
    Math.floor(
      Math.random() * computerSquares.length -
        ship.directions[0].length * direction
    )
  );

  const isTaken = current.some((index) =>
    computerSquares[randomStart + index].classList.contains("taken")
  );
  const isAtRightEdge = current.some(
    (index) => (randomStart + index) % BOARD_WIDTH === BOARD_WIDTH - 1
  );
  const isAtLeftEdge = current.some(
    (index) => (randomStart + index) % BOARD_WIDTH === 0
  );

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
    current.forEach((index) =>
      computerSquares[randomStart + index].classList.add("taken", ship.name)
    );
  else generateComputerShips(ship);
}

shipArray.forEach((ship) => {
  generateComputerShips(ship);
});
