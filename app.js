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
let maxTime = 1200;
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
    emoji1.classList.remove('clicked')
    return false;
  }
};

// SWAP EMOJIS

const swapEmojis = (emoji1, emoji2) =>{
  // Getting emoji's datasets
  const firstX = Number(emoji1.dataset.x);
  const firstY = Number(emoji1.dataset.y);
  const secondX = Number(emoji2.dataset.x);
  const secondY = Number(emoji2.dataset.y);

  // Changing the grid array in JS
  let tempEmoji = gridArray[firstX][firstY];
  gridArray[firstX][firstY] = gridArray[secondX][secondY];
  gridArray[secondX][secondY] = tempEmoji;

  // Changing the HTML grid (visually)
  const innerEmoji1 = emoji1.innerHTML;
  emoji1.innerHTML = emoji2.innerHTML;
  emoji2.innerHTML = innerEmoji1;
}






// EMOJI CLICK EVENT

const emojiClick = (e) => {
  let clickedEmoji = document.querySelector(".clicked");
  if (clickedEmoji) {
    if(isNextTo(clickedEmoji, e.target.parentNode)){
      swapEmojis(clickedEmoji, e.target.parentNode);
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
  emoji.style.width = `calc(${grid.clientWidth}px / ${difficulty})`;
  emoji.style.height = `calc(${grid.clientWidth}px  / ${difficulty})`;
};

// Creating emoji squares

const createSquare = (x, y, gridArray) => {
  const newDiv = document.createElement("div");
  newDiv.dataset.x = x;
  newDiv.dataset.y = y;
  stylingGrid(difficulty, newDiv);
  newDiv.innerHTML = gridArray[x][y];
  newDiv.classList.add('square');
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
  for (let i = 0; i < difficulty; i++) {
    gridArray[i] = [];
    for (let j = 0; j < difficulty; j++) {
      gridArray[i][j] = food[getRandomInt(0, 6)];
    }
  }
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
    className: "modal",
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
    className: "modal",
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
    text: `Puntaje final: `, //'${finalScore}'
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
