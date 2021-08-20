// --------------------------GETTING ELEMENTS FROM HTML--------------------------

// HTML ELEMENTS

const helpButton = document.getElementById("help-button");
const restartButton = document.getElementById("restart-button");
const comboCounter = document.getElementById("combo-counter");
const pointsCounter = document.getElementById("points-counter");

// --------------------------CREATING TIMER--------------------------

//  TIMER ELEMENTS

const clock = document.getElementById("clock");
let time;
let maxTime = 3000000;
let pause = 0;
let callModal = true;

// TIMER FUNCTION

const timer = (seconds) => {
  clearInterval(time);
  time = setInterval(() => {
    if (seconds >= 10) {
      clock.innerHTML = `0:${seconds}`;
      seconds--;
      pause = seconds;
    } else if (seconds < 10 && seconds > 0) {
      clock.innerHTML = `0:0${seconds}`;
      seconds--;
      pause = seconds;
    } else if (seconds === 0) {
      clock.innerHTML = `0:0${seconds}`;
      gameOverModal();
    }
  }, 1000);
  return pause;
};

// --------------------------GAME FUNCTIONS AND EVENTS--------------------------

// IS EMOJI 1 NEXT TO EMOJI 2?

const isNextTo = (emoji1, emoji2) => {
  const firstX = Number(emoji1.dataset.x);
  const firstY = Number(emoji1.dataset.y);
  const secondX = Number(emoji2.dataset.x);
  const secondY = Number(emoji2.dataset.y);
  if (
    (firstX === secondX && firstY === secondY + 1) ||
    (firstX === secondX && firstY === secondY - 1) ||
    (firstY === secondY && firstX === secondX + 1) ||
    (firstY === secondY && firstX === secondX - 1)
  ) {
    return true;
  } else {
    emoji1.classList.remove("clicked");
    return false;
  }
};

// SWAP EMOJIS

const swapEmojis = (emoji1, emoji2) => {
  // Getting emoji's datasets
  const firstX = Number(emoji1.dataset.x);
  const firstY = Number(emoji1.dataset.y);
  const secondX = Number(emoji2.dataset.x);
  const secondY = Number(emoji2.dataset.y);

  // Changing the grid array in JS
  const tempEmoji = gridObj.grid[firstX][firstY];
  gridObj.grid[firstX][firstY] = gridObj.grid[secondX][secondY];
  gridObj.grid[secondX][secondY] = tempEmoji;

  // Changing the HTML grid (visually)
  const innerEmoji1 = emoji1.innerHTML;
  emoji1.innerHTML = emoji2.innerHTML;
  emoji2.innerHTML = innerEmoji1;
  return gridObj;
};

// CHECKING COINCIDENCES

let points = 0;
let gridObj = {
  grid: [],
  columnToDrop: 0,
  rowsToReplace: [],
  rowToDrop: 0,
  columnsToReplace: [],
  points: points,
  difficulty: 0,
  coincidencesHorizontal: false,
  coincidencesVertical: false,
  canMove: true,
};

const checkHorizontal = () => {
  let { grid } = gridObj;
  gridObj.coincidencesHorizontal = false;
  gridObj.rowsToReplace = [];
  gridObj.columnToDrop = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let k = j; k <= grid[i].length; k++) {
        if (grid[i][j] === grid[i][k]) {
          gridObj.rowsToReplace.push(k);
          gridObj.columnToDrop = i;
        } else {
          if (gridObj.rowsToReplace.length >= 3) {
            gridObj.coincidencesHorizontal = true;
            return gridObj;
          } else {
            gridObj.rowsToReplace = [];
            gridObj.columnToDrop = 0;
          }
        }
      }
    }
  }
  if (!gridObj.coincidencesHorizontal) {
    gridObj.rowsToReplace = [];
    gridObj.columnToDrop = 0;
    return gridObj;
  }
};

const checkVertical = () => {
  let { grid } = gridObj;
  gridObj.coincidencesVertical = false;
  gridObj.rowToDrop = 0;
  gridObj.columnsToReplace = [];
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      for (let u = i; u <= grid.length; u++) {
        if (grid[u] && grid[i][j] === grid[u][j]) {
          gridObj.rowToDrop = j;
          gridObj.columnsToReplace.push(u);
        } else {
          if (gridObj.columnsToReplace.length >= 3) {
            gridObj.coincidencesVertical = true;
            return gridObj;
          } else {
            gridObj.rowToDrop = 0;
            gridObj.columnsToReplace = [];
          }
        }
      }
    }
  }
  if (!gridObj.coincidencesVertical) {
    gridObj.rowToDrop = 0;
    gridObj.columnsToReplace = [];
    return gridObj;
  }
};

// DROPPING THE EMOJIS IN gridArray

const dropHorizontal = (x, rest, grid) => {
  for (let i = x; i >= 0; i--) {
    rest.forEach((el) => {
      grid[i][el] =
        i !== 0 ? grid[i - 1][el] : food[getRandomInt(0, 6)];
    });
  }
  console.log(grid);
  return grid;
};

const dropVertical = (x, rest, grid) => {
  for (let i = rest[rest.length - 1]; i >= 0; i--) {
    grid[i][x] =
      i !== 0 ? grid[i - 1][x] : food[getRandomInt(0, 6)];
    }
    console.log(grid);
    return grid;
};


// PRINTING NEW RANDOM EMOJIS IN HTML

const printNewEmoji = (y, slot, col) => {
  const x = col ? col : 0;
  slot.innerHTML = gridObj.grid[x][y];
  twemoji.parse(document.body);
  return slot.innerHTML;
};

// CLEANING THE ELIMINATED EMOJIS (RETURNING POINTS)

const cleanEmojis = (x, y, points) => {
  points += 100;
  let toClean = gridContainer.querySelector(
    `.square[data-x= "${x}"][data-y= "${y}"]`
  )
    ? gridContainer.querySelector(`.square[data-x= "${x}"][data-y= "${y}"]`)
    : "";
  toClean.innerHTML = "";
  pointsCounter.innerHTML = `${points}`;
  return points;
};

const cleanEmojisHorizontally = (x, rest) => {
  rest.forEach((y) => {
    gridObj.points = cleanEmojis(x, y, gridObj.points);
  });
  return gridObj;
};

const cleanEmojisVertically = (rest, y) => {
  rest.forEach((x) => {
    gridObj.points = cleanEmojis(x, y, gridObj.points);
  });
  return gridObj;
};

// DROPPING THE EMOJIS VISUALLY IN HTML

const dropHorizontalHTML = (x, rest) => {
  cleanEmojisHorizontally(x, rest);
  for (let i = x; i >= 0; i--) {
    setTimeout(() => {
      rest.forEach((el) => {
        let empty = gridContainer.querySelector(
          `.square[data-x= "${i}"][data-y= "${el}"]`
        );
        let full = gridContainer.querySelector(
          `.square[data-x= "${i - 1}"][data-y= "${el}"]`
        );
        empty.innerHTML = i !== 0 ? full.innerHTML : printNewEmoji(el, empty);
      });
    }, 1200);
  }
};

const dropVerticalHTML = (x, rest) => {
  cleanEmojisVertically(rest, x);
  const lengthRest = rest.length;
  for (let i = rest[rest.length - 1]; i >= 0; i--) {
    setTimeout(() => {
      let dataX = i - lengthRest;
      let empty = gridContainer.querySelector(
        `.square[data-x= "${i}"][data-y= "${x}"]`
      );
      let full =
        dataX > 0
          ? gridContainer.querySelector(
              `.square[data-x= "${dataX}"][data-y= "${x}"]`
            )
          : false;
      empty.innerHTML = dataX > 0 ? full.innerHTML : printNewEmoji(i, empty, i);
    }, 1200);
  }
};

// CHECK UNTIL THERE IS NO COINCIDENCES LEFT
const multipleHorizontal = (gridObj, newGrid) => {
  let gridModified = gridObj;
  gridModified.grid = dropHorizontal(gridObj.columnToDrop, gridObj.rowsToReplace, gridModified.grid);
  if (!newGrid) {
    dropHorizontalHTML(gridObj.columnToDrop, gridObj.rowsToReplace);
  }
  gridObj = gridModified;
  return gridObj;
};

const multipleVertical = (gridObj, newGrid) => {
  let gridModified = gridObj;
  gridModified.grid = dropVertical(gridObj.rowToDrop, gridObj.columnsToReplace,gridModified.grid);
  if (!newGrid) {
    dropVerticalHTML(gridObj.rowToDrop, gridObj.columnsToReplace);
  }
  gridObj = gridModified;
  return gridObj;
};

const multipleCheck = async (newGrid) => {
  let gridCheck = checkHorizontal();
  gridCheck = checkVertical();
  let continueDroppingHor = gridCheck.coincidencesHorizontal;
  let continueDroppingVer = gridCheck.coincidencesVertical;

  while (continueDroppingHor || continueDroppingVer) {
    if (continueDroppingHor) gridCheck = multipleHorizontal(gridCheck, newGrid);
    gridCheck = checkHorizontal();
    if (continueDroppingVer) gridCheck = multipleVertical(gridCheck, newGrid);
    gridCheck = checkVertical();
    continueDroppingHor = gridCheck.coincidencesHorizontal;
    continueDroppingVer = gridCheck.coincidencesVertical;
    console.log(gridCheck);
  }
  gridObj = gridCheck;
  return gridObj;
};

// EMOJI CLICK EVENT

const emojiClick = (e) => {
  gridObj.canMove = false;
  let clickedEmoji = document.querySelector(".clicked");
  let secondEmoji = e.target.classList.contains("square")
    ? e.target
    : e.target.parentNode;
  if (clickedEmoji) {
    if (isNextTo(clickedEmoji, secondEmoji)) {
      swapEmojis(clickedEmoji, secondEmoji);
      let gridCheck = checkHorizontal();
      gridCheck = checkVertical();
      if (
        gridCheck.rowsToReplace.length >= 3 ||
        gridCheck.columnsToReplace.length >= 3
      ) {
        multipleCheck();
      } else {
        setTimeout(() => {
          swapEmojis(clickedEmoji, secondEmoji);
        }, 600);
        gridObj.canMove = true;
      }
      clickedEmoji.classList.remove("clicked");
    } else {
      clickedEmoji.classList.remove("clicked");
      e.target.parentNode.classList.add("clicked");
      gridObj.canMove = true;
    }
  } else {
    e.target.parentNode.classList.add("clicked");
    gridObj.canMove = true;
  }
};

// --------------------------CREATING GRID--------------------------

// GRID ELEMENTS

const food = ["🍕", "🍔", "🍣", "🍝", "🥪", "🥗"];

const gridContainer = document.getElementById("grid");

// GRID FUNCTIONS

// Random number

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Clean grid html

const cleanGrid = () => {
  gridContainer.innerHTML = "";
};

// Styling each emoji

const stylingGrid = (difficulty, emoji) => {
  gridContainer.style.height = `${gridContainer.clientWidth}px`;
  emoji.style.width = `calc(${gridContainer.clientWidth}px / ${difficulty} - 0.02px)`;
  emoji.style.height = `calc(${gridContainer.clientWidth}px  / ${difficulty} - 0.02px)`;
};

// Creating emoji squares

const createSquare = (x, y, gridArray) => {
  const newDiv = document.createElement("div");
  newDiv.dataset.x = x;
  newDiv.dataset.y = y;
  stylingGrid(gridObj.difficulty, newDiv);
  newDiv.innerHTML = gridArray[x][y];
  newDiv.classList.add("square");
  newDiv.addEventListener("click", emojiClick);
  return newDiv;
};

// Printing grid in HTML

const printgrid = (gridArray) => {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      gridContainer.append(createSquare(i, j, gridArray));
    }
  }
};

// Creating grid

const createGrid = async (difficulty) => {
  let gridArray = [];
  cleanGrid();
  for (let i = 0; i < difficulty; i++) {
    gridArray[i] = [];
    for (let j = 0; j < difficulty; j++) {
      gridArray[i][j] = food[getRandomInt(0, 6)];
    }
  }
  gridObj.grid = gridArray;
  gridObj.difficulty = difficulty;
  gridObj = await multipleCheck("new grid");
  console.log(gridObj.grid);
  printgrid(gridObj.grid);
  twemoji.parse(document.body);
  timer(maxTime);
  return gridObj;
};

// --------------------------CREATING ALERTS (Sweet Alerts)--------------------------

// MODAL WELCOME

const welcomeText = document.createElement("span");
welcomeText.innerHTML =
  "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. <br /> <br /> Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!<br /> <br /> <strong>Controles</strong> <br /> Click izquierdo: selección <br />Enter o Espacio: selección <br /> Flechas o WASD: movimiento e intercambio";

const welcomeModal = () => {
  clearInterval(time);
  swal({
    title: "¡Bienvenida!",
    content: welcomeText,
    button: "A jugar!",
    className: "modal",
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then(() => {
    if (callModal) {
      difficultyModal();
      return (callModal = false);
    } else if (!callModal) {
      timer(pause);
    }
  });
};

// MODAL DIFICULTY

const difficultyModal = () => {
  swal({
    title: "Nuevo juego",
    text: "Selecciona una dificultad",
    buttons: {
      easy: {
        text: "Fácil",
        value: "easy",
      },
      normal: {
        text: "Normal",
        value: "normal",
      },
      hard: {
        text: "Difícil",
        value: "hard",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "easy":
        createGrid(9);
        break;
      case "normal":
        createGrid(8);
        break;
      case "hard":
        createGrid(7);
        break;
      default:
    }
  });
};
// MODAL RESTART GAME

const restartModal = () => {
  clearInterval(time);
  swal({
    title: "Reiniciar juego?",
    text: "Perderás todo tu puntaje acumulado!",
    buttons: {
      cancelRestart: {
        text: "Cancelar",
        value: "cancelRestart",
      },
      newGame: {
        text: "Nuevo Juego",
        value: "newGame",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "cancelRestart":
        timer(pause);
        break;
      case "newGame":
        cleanGrid();
        difficultyModal();
        break;
      default:
    }
  });
};

// MODAL GAME OVER

const gameOverModal = () => {
  clearInterval(time);
  swal({
    title: "¡Juego terminado!",
    text: `Puntaje final: ${points}`,
    buttons: {
      newGame: {
        text: "Nuevo Juego",
        value: "newGame",
      },
      redo: {
        text: "Reiniciar",
        value: "redo",
      },
    },
    className: "modal",
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "newGame":
        cleanGrid();
        difficultyModal();
        break;
      case "redo":
        cleanGrid();
        createGrid(gridObj.difficulty);
        break;
      default:
    }
  });
};
const moveClick = (direction) => {
  if (document.querySelector(".square.clicked")) {
    const clickedEmoji = document.querySelector(".square.clicked");
  } else {
    document
      .querySelector('.square[data-x="0"][data-y="0"]')
      .classList.add("clicked");
    return;
  }

  let x = Number(clickedEmoji.dataset.x);
  let y = Number(clickedEmoji.dataset.y);

  switch (direction) {
    case "up": {
      y = y === 0 ? gridObj.difficulty - 1 : y - 1;
      break;
    }
    case "left": {
      x = x === 0 ? gridObj.difficulty - 1 : x - 1;
      break;
    }
    case "down": {
      y = y === gridObj.difficulty - 1 ? 0 : y + 1;
      break;
    }
    case "right": {
      x = x === gridObj.difficulty - 1 ? 0 : x + 1;
      break;
    }
    default:
      break;
  }
  const nextEmoji = document.querySelector(
    `.square[data-x="${x}"][data-y="${y}"]`
  );
  clicked.classList.remove("seleccionado");
  nextEmoji.classList.add("seleccionado");
};

const checkMovement = (direction) => {
  if (!document.querySelector(".square.clicked")) {
    document
      .querySelector('.square[data-x="0"][data-y="0"]')
      .classList.add("clicked");
  } else {
    const cuadrado = document.querySelector(".square.clicked");
    if (cuadrado.classList.contains("clicked")) {
      emojiClick(cuadrado);
    } else {
      moveClick(direction);
    }
  }
};

const checkKeyboardInput = (e) => {
  if (!gridObj.canMove) {
    return;
  }
  switch (e.code) {
    case "Enter":
    case "Space":
      const clickedEmoji = document.querySelector(".clicked");
      if (clickedEmoji) {
        clickedEmoji.classList.toggle("clicked");
      }
      break;
    case "KeyW":
    case "ArrowUp":
      checkMovement("up");
      break;
    case "KeyA":
    case "ArrowLeft":
      checkMovement("left");
      break;
    case "KeyS":
    case "ArrowDown":
      checkMovement("down");
      break;
    case "KeyD":
    case "ArrowRight":
      checkMovement("right");
      break;
    case "KeyR":
      restartModal();
      break;
    default:
      break;
  }
};

// PAGE EVENTS

document.addEventListener("keydown", checkKeyboardInput);

window.addEventListener("load", () => {
  gridContainer.style.height = `${gridContainer.clientWidth}px`;
  welcomeModal();
});

helpButton.addEventListener("click", () => {
  welcomeModal();
});

restartButton.addEventListener("click", () => {
  restartModal();
});
