// HTML ELEMENTS

const helpButton = document.getElementById("help-button");
const restartButton = document.getElementById("restart-button");
const comboCounter = document.getElementById("combo-counter");
const pointsCounter = document.getElementById("points-counter");

//  TIMER

const clock = document.getElementById("clock");
let time;
let maxTime = 30;
let pause = 0;
let callModal = true;

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
  emoji.style.width = `calc(${grid.clientWidth}px / ${difficulty} - 1.01rem)`;
  emoji.style.height = `calc(${grid.clientWidth}px  / ${difficulty} - 1.01rem)`;
  grid.style.height = `${grid.clientWidth}px`;
};

// Creating grid

const createGrid = (difficulty) => {
  for (let i = 0; i < difficulty; i++) {
    for (let j = 0; j < difficulty; j++) {
      const newP = document.createElement("p");
      stylingGrid(difficulty, newP);
      newP.innerHTML = food[getRandomInt(0, 6)];
      grid.appendChild(newP);
    }
  }
  twemoji.parse(document.body);
  timer(maxTime);
  return difficulty;
};

//SWEET ALERT

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
      return callModal = false;
    } else if (!callModal){
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


// // emoji events

// let emojis = grid.children;

// for (let i = 0; i < emojis.length; i++) {
//   emojis[i].addEventListener('click', () =>{
//     alert('click')
//   })
  
// }