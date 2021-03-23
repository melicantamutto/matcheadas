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
  // Getting emoji's datasets
  const firstX = Number(emoji1.dataset.x);
  const firstY = Number(emoji1.dataset.y);
  const secondX = Number(emoji2.dataset.x);
  const secondY = Number(emoji2.dataset.y);

  // Changing the grid array in JS
  const tempEmoji = gridArray[firstX][firstY];
  gridArray[firstX][firstY] = gridArray[secondX][secondY];
  gridArray[secondX][secondY] = tempEmoji;

  // Changing the HTML grid (visually)
  const innerEmoji1 = emoji1.innerHTML;
  emoji1.innerHTML = emoji2.innerHTML;
  emoji2.innerHTML = innerEmoji1;
};

// CHECKING COINCIDENCES

let points = 0;
let columnToDrop = 0;
let rowsToReplace = [];

let rowToDrop = 0;
let columnsToReplace = [];

const checkHorizontal = () => {
  columnToDrop = 0;
  rowsToReplace = [];
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      if (
        gridArray[i][j] === gridArray[i][j + 1] &&
        gridArray[i][j] === gridArray[i][j + 2] &&
        gridArray[i][j] === gridArray[i][j + 3] &&
        gridArray[i][j] === gridArray[i][j + 4]
      ) {
        columnToDrop = i;
        rowsToReplace.push(j, j + 1, j + 2, j + 3, j + 4);
        gridArray[i][j] = "";
        gridArray[i][j + 1] = "";
        gridArray[i][j + 2] = "";
        gridArray[i][j + 3] = "";
        gridArray[i][j + 4] = "";
      } else if (
        gridArray[i][j] === gridArray[i][j + 1] &&
        gridArray[i][j] === gridArray[i][j + 2] &&
        gridArray[i][j] === gridArray[i][j + 3]
      ) {
        columnToDrop = i;
        rowsToReplace.push(j, j + 1, j + 2, j + 3);
        gridArray[i][j] = "";
        gridArray[i][j + 1] = "";
        gridArray[i][j + 2] = "";
        gridArray[i][j + 3] = "";
      } else if (
        gridArray[i][j] === gridArray[i][j + 1] &&
        gridArray[i][j] === gridArray[i][j + 2]
      ) {
        columnToDrop = i;
        rowsToReplace.push(j, j + 1, j + 2);
        gridArray[i][j] = "";
        gridArray[i][j + 1] = "";
        gridArray[i][j + 2] = "";
      }
    }
  }
  return columnToDrop, rowsToReplace;
};

const checkVertical = () => {
  rowToDrop = 0;
  columnsToReplace = [];
  let coincidences = 0;
  for (let j = 0; j < gridArray[0].length; j++) {
    for (let i = 0; i < gridArray.length; i++) {
      for (let u = 0; u < gridArray.length; u++) {
        if (gridArray[i][j] === gridArray[u][j]) {
          coincidences++;
          columnsToReplace.push(Number(u));
          rowToDrop = j;
        } else {
          if (coincidences >= 3) {
            return columnsToReplace, rowToDrop;
          } else {
            rowToDrop = 0;
            columnsToReplace = [];
          }
        }
      }
    }
  }
  console.log(columnsToReplace);
  return rowToDrop, columnsToReplace;
};

// DROPPING THE EMOJIS IN gridArray

const dropHorizontal = (x, rest) => {
  for (let i = x; i >= 0; i--) {
    rest.forEach((el) => {
      gridArray[i][el] =
        i !== 0 ? gridArray[i - 1][el] : food[getRandomInt(0, 6)];
    });
  }
};

const dropVertical = (x, ...rest) => {
  const restReverse = rest.reverse();
  for (let i = restReverse[0]; i >= 0; i--) {
    console.log();
    restReverse.forEach((el) => {
      gridArray[el][x] =
        i !== 0 ? gridArray[i - 1][x] : food[getRandomInt(0, 6)];
    });
  }
  return gridArray;
};

// PRINTING NEW RANDOM EMOJIS IN HTML

const printNewEmoji = (j, slot) => {
  slot.innerHTML = gridArray[0][j];
  twemoji.parse(document.body);
  return slot.innerHTML;
};

// CLEANING THE ELIMINATED EMOJIS (RETURNING POINTS)

const cleanEmojis = (x, rest) => {
  rest.forEach((y) => {
    points += 100;
    let toClean = grid.querySelector(`.square[data-x= "${x}"][data-y= "${y}"]`);
    toClean.innerHTML = "";
    pointsCounter.innerHTML = `${points}`;
  });
  return points;
};

// DROPPING THE EMOJIS VISUALLY IN HTML

const dropHorizontalHTML = (x, rest) => {
  cleanEmojis(x, rest);
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
  // cleanEmojis(x, rest);
  // setTimeout(() => {
  //   for (let i = x; i >= 0; i--) {
  //     rest.forEach((el) => {
  //       let empty = grid.querySelector(
  //         `.square[data-x= "${i}"][data-y= "${el}"]`
  //       );
  //       let full = grid.querySelector(
  //         `.square[data-x= "${i - 1}"][data-y= "${el}"]`
  //       );
  //       empty.innerHTML = i !== 0 ? full.innerHTML : 2;
  //     });
  //   }
  // }, 1000);
};

// CHECK TIL THERE IS NO COINCIDENCES LEFT

// const multipleCheck = () => {
//   do {
//     setTimeout(() => {
//       checkHorizontal();
//       checkVertical();
//       dropHorizontal(columnToDrop, rowsToReplace);
//       dropHorizontalHTML(columnToDrop, rowsToReplace);
//       dropVertical(rowToDrop, columnsToReplace);
//       dropVerticalHTML(rowToDrop, columnsToReplace);
//     }, 2000)
//   } while (rowsToReplace.length >= 3 || columnsToReplace.length >= 3)
// }

// EMOJI CLICK EVENT

const emojiClick = (e) => {
  let clickedEmoji = document.querySelector(".clicked");
  let secondEmoji = e.target.parentNode;
  if (clickedEmoji) {
    if (isNextTo(clickedEmoji, secondEmoji)) {
      swapEmojis(clickedEmoji, secondEmoji);
      checkHorizontal();
      checkVertical();
      if (rowsToReplace.length >= 3 || columnsToReplace.length >= 3) {
        dropHorizontal(columnToDrop, rowsToReplace);
        dropHorizontalHTML(columnToDrop, rowsToReplace);
        dropVertical(rowToDrop, columnsToReplace);
        dropVerticalHTML(rowToDrop, columnsToReplace);
        multipleCheck();
      } else {
        setTimeout(() => {
          swapEmojis(clickedEmoji, secondEmoji);
        }, 600);
      }
      clickedEmoji.classList.remove("clicked");
    }
  } else {
    e.target.parentNode.classList.add("clicked");
  }
};

// --------------------------CREATING GRID--------------------------

// GRID ELEMENTS

const pizza = "🍕";
const hamburguer = "🍔";
const sushi = "🍣";
const pasta = "🍝";
const sandwich = "🥪";
const salad = "🥗";

let difficulty = 0;

const food = [pizza, hamburguer, sushi, pasta, sandwich, salad];

const grid = document.getElementById("grid");
let gridArray = [];

// GRID FUNCTIONS

// Random number

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Clean grid html

const cleanGrid = () => {
  grid.innerHTML = "";
};

// Styling each emoji

const stylingGrid = (difficulty, emoji) => {
  grid.style.height = `${grid.clientWidth}px`;
  emoji.style.width = `calc(${grid.clientWidth}px / ${difficulty} - 0.02px)`;
  emoji.style.height = `calc(${grid.clientWidth}px  / ${difficulty} - 0.02px)`;
};

// Creating emoji squares

const createSquare = (x, y, gridArray) => {
  const newDiv = document.createElement("div");
  newDiv.dataset.x = x;
  newDiv.dataset.y = y;
  stylingGrid(difficulty, newDiv);
  newDiv.innerHTML = gridArray[x][y];
  newDiv.classList.add("square");
  newDiv.addEventListener("click", emojiClick);
  return newDiv;
};

// Printing grid in HTML

const printgrid = (gridArray) => {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      grid.append(createSquare(i, j, gridArray));
    }
  }
};

// Creating grid

const createGrid = (difficulty) => {
  cleanGrid();
  for (let i = 0; i < difficulty; i++) {
    gridArray[i] = [];
    for (let j = 0; j < difficulty; j++) {
      gridArray[i][j] = food[getRandomInt(0, 6)];
    }
  }
  checkHorizontal();
  dropHorizontal(columnToDrop, rowsToReplace);
  checkVertical();
  dropVertical(rowToDrop, columnsToReplace);
  printgrid(gridArray);
  twemoji.parse(document.body);
  timer(maxTime);
  return difficulty;
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
        difficulty = 9;
        createGrid(difficulty);
        break;
      case "normal":
        difficulty = 8;
        createGrid(difficulty);
        break;
      case "hard":
        difficulty = 7;
        createGrid(difficulty);
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
        createGrid(difficulty);
        break;
      default:
    }
  });
};

// MODAL EVENTS

window.addEventListener("load", () => {
  grid.style.height = `${grid.clientWidth}px`;
  welcomeModal();
});

helpButton.addEventListener("click", () => {
  welcomeModal();
});

restartButton.addEventListener("click", () => {
  restartModal();
});
