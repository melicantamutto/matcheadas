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
let maxTime = 30;
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
  let { grid } = gridObj;
  // Getting emoji's datasets
  const firstX = Number(emoji1.dataset.x);
  const firstY = Number(emoji1.dataset.y);
  const secondX = Number(emoji2.dataset.x);
  const secondY = Number(emoji2.dataset.y);

  // Changing the grid array in JS
  const tempEmoji = grid[firstX][firstY];
  grid[firstX][firstY] = grid[secondX][secondY];
  grid[secondX][secondY] = tempEmoji;

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
  coincidencesFound: false
};

const checkHorizontal = () => {
  let { grid, rowsToReplace, coincidencesFound, columnToDrop } = gridObj;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let k = j; k <= grid[i].length; k++) {
        if (grid[i][j] === grid[i][k]) {
          rowsToReplace.push(k);
          columnToDrop = i;
        } else {
          if (rowsToReplace.length >= 3) {
            console.log(rowsToReplace);
            coincidencesFound = true;
            return gridObj;
          }
        }
      }
    }
  }
  if(!coincidencesFound){
    rowsToReplace = [];
    columnToDrop = 0;
    return false;
  }
};

const checkVertical = () => {
  let { grid, columnsToReplace, rowToDrop, coincidencesFound } = gridObj;
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      for (let u = i; u <= grid.length; u++) {
        if (grid[u] && grid[i][j] === grid[u][j]) {
          columnsToReplace.push(u);
          rowToDrop = j;
        } else {
          if (columnsToReplace.length >= 3) {
            coincidencesFound = true;
            return true;
          }
        }
      }
    }
  }
  if(!coincidencesFound){
    rowToDrop = 0;
    columnsToReplace = [];
    return false;
  }
};

// DROPPING THE EMOJIS IN gridArray

const dropHorizontal = (x, rest) => {
  let { grid, coincidencesFound } = gridObj;
  for (let i = x; i >= 0; i--) {
    rest.forEach((el) => {
      grid[i][el] = i !== 0 ? grid[i - 1][el] : food[getRandomInt(0, 6)];
    });
  }
  coincidencesFound = false;
  return gridObj;
};

const dropVertical = (x, ...rest) => {
  let { grid, coincidencesFound } = gridObj;
  const restReverse = rest.reverse();
  for (let i = restReverse[0]; i >= 0; i--) {
    restReverse.forEach((el) => {
      grid[x][el] = i !== 0 ? grid[x][i - 1] : food[getRandomInt(0, 6)];
    });
  }
  coincidencesFound = false;
  return gridObj;
};

// PRINTING NEW RANDOM EMOJIS IN HTML

const printNewEmoji = (j, slot) => {
  slot.innerHTML = gridObj.grid[0][j];
  twemoji.parse(document.body);
  return slot.innerHTML;
};

// CLEANING THE ELIMINATED EMOJIS (RETURNING POINTS)

const cleanEmojis = (x, y, points) => {
  points += 100;
  let toClean =
    gridContainer.querySelector(`.square[data-x= "${x}"][data-y= "${y}"]`) ===
    true
      ? gridContainer.querySelector(`.square[data-x= "${x}"][data-y= "${y}"]`)
      : "";
  toClean.innerHTML = "";
  pointsCounter.innerHTML = `${points}`;
};

const cleanEmojisHorizontally = (x, rest) => {
  let { points } = gridObj;
  rest.forEach((y) => {
    cleanEmojis(x, y, points);
  });
  return gridObj;
};

const cleanEmojisVertically = (rest, y) => {
  let { points } = gridObj;
  rest.forEach((x) => {
    cleanEmojis(x, y, points);
  });
  return gridObj;
};

// DROPPING THE EMOJIS VISUALLY IN HTML

const dropHorizontalHTML = (x, rest) => {
  cleanEmojisHorizontally(x, rest);
  setTimeout(() => {
    for (let i = x; i >= 0; i--) {
      rest.forEach((el) => {
        let empty = grid.querySelector(
          `.square[data-x= "${i}"][data-y= "${el}"]`
        );
        let full = grid.querySelector(
          `.square[data-x= "${i - 1}"][data-y= "${el}"]`
        );
        empty.innerHTML = i !== 0 ? full.innerHTML : printNewEmoji(el, empty);
      });
    }
  }, 800);
};

const dropVerticalHTML = (x, rest) => {
  cleanEmojisVertically(rest, x);
  setTimeout(() => {
    for (let i = x; i >= 0; i--) {
      rest.forEach((el) => {
        let empty = grid.querySelector(
          `.square[data-x= "${i}"][data-y= "${el}"]`
        );
        let full = grid.querySelector(
          `.square[data-x= "${i - 1}"][data-y= "${el}"]`
        );
        empty.innerHTML = i !== 0 ? full.innerHTML : printNewEmoji(el, empty);
      });
    }
  }, 1000);
};

// CHECK UNTIL THERE IS NO COINCIDENCES LEFT

const multipleCheck = () => {
  checkHorizontal();
  let { grid, coincidencesFound } = gridObj;
 
  let gridObjHorizontal = gridObj;
  while (coincidencesFound) {
    log('encontre lpm')
    const { grid, columnToDrop, rowsToReplace } =
    gridObjHorizontal;
    setTimeout(() => {
      console.log('deberiadropear');
      dropHorizontal(columnToDrop, rowsToReplace);
      console.log('deberiadropearhtml');
      dropHorizontalHTML(columnToDrop, rowsToReplace);
      gridObjHorizontal = checkHorizontal();
    }, 1000);
  }
  checkVertical();
  let gridObjVertical = gridObj;
  while (gridObjVertical.coincidencesFound) {
    const { grid, rowToDrop, columnsToReplace } =
    gridObjVertical;
    setTimeout(() => {
      dropVertical(rowToDrop, columnsToReplace);
      dropVerticalHTML(rowToDrop, columnsToReplace);
      gridObjVertical = checkVertical();
    }, 2000);
  }
};

// EMOJI CLICK EVENT

const emojiClick = (e) => {
  let { rowToDrop, columnToDrop, rowsToReplace, columnsToReplace } = gridObj;
  let clickedEmoji = document.querySelector(".clicked");
  let secondEmoji = e.target.parentNode;
  if (clickedEmoji) {
    if (isNextTo(clickedEmoji, secondEmoji)) {
      swapEmojis(clickedEmoji, secondEmoji);
      checkHorizontal();
      checkVertical();
      if (rowsToReplace.length >= 3 || columnsToReplace.length >= 3) {
        multipleCheck();
      } else {
        setTimeout(() => {
          swapEmojis(clickedEmoji, secondEmoji);
        }, 600);
      }
      clickedEmoji.classList.remove("clicked");
    } else {
      clickedEmoji.classList.remove("clicked");
      e.target.parentNode.classList.add("clicked");
    }
  } else {
    e.target.parentNode.classList.add("clicked");
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

const createGrid = (difficulty) => {
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
  multipleCheck(gridObj.grid);
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

// KEYBOARD EVENTS
const handlerKeyboardInput = (e) => {
  switch (e.code) {
    case 'Enter':
    case 'Space':
      let clickedEmoji = document.querySelector(".clicked");
      if (clickedEmoji) {
        clickedEmoji.classList.remove("clicked");
      }
      break
    case 'KeyW':
    case 'ArrowUp':
      multipleCheck()
      break
    case 'KeyA':
    case 'ArrowLeft':
      multipleCheck()
      break
    case 'KeyS':
    case 'ArrowDown':
      multipleCheck()
      break
    case 'KeyD':
    case 'ArrowRight':
      multipleCheck()
      break
    case 'KeyR':
      restartModal();
      break
  }
}

document.addEventListener('keydown', handlerKeyboardInput);

// MODAL EVENTS

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
