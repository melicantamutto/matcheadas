// HTML ELEMENTS

const helpButton = document.getElementById('help-button');
const restartButton = document.getElementById('restart-button');
const comboCounter = document.getElementById('combo-counter');
const pointsCounter = document.getElementById('points-counter');


// GRID ELEMENTS

const pizza = document.createElement('span');
pizza.textContent = '&#1F355';
const hamburguer = document.createElement('span');
hamburguer.textContent = '&#1F354';
const sushi = document.createElement('span');
sushi.textContent = '&#1F363';
const pasta = document.createElement('span');
pasta.textContent = '&#1F35D';

twemoji.parse(document.body);

let difficulty = 0;

const food = [pizza, hamburguer, sushi, pasta]

const grid = document.getElementById('grid');



// GRID FUNCTIONS

const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

const stylingGrid = (difficulty, emoji) =>{
    emoji.style.width = `calc(33rem / ${difficulty} - 1rem)`;
    emoji.style.height = `calc(33rem / ${difficulty} - 1rem)`;
}

const createGrid = (difficulty) =>{
    for(let i=0; i < difficulty; i++){
        for(let j=0; j < difficulty; j++){
            const newP = document.createElement('p');
            stylingGrid(difficulty, newP);
            newP.innerHTML = food[getRandomInt(0,4)];
            grid.appendChild(newP);
        }
    }
    return difficulty;
}





//SWEET ALERT

const welcomeText = document.createElement('span');
welcomeText.innerHTML ="En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. <br /> <br /> Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!<br /> <br /> <strong>Controles</strong> <br /> Click izquierdo: selección <br />Enter o Espacio: selección <br /> Flechas o WASD: movimiento e intercambio";

const welcomeModal = () =>{
    swal({
        title:"¡Bienvenida!",
        content: welcomeText,
        button: "A jugar!",
        className: "modal",
        closeOnClickOutside: false,
        closeOnEsc: false,
        
      }).then((value) =>{
        if(value){
           difficultyModal();
        }
    })
}

const infoModal = () =>{
    swal({
        title:"¡Bienvenida!",
        content: welcomeText,
        button: "A jugar!",
        className: "modal",
        closeOnClickOutside: false,
        closeOnEsc: false,
    })
}


const difficultyModal = () =>{
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
      }).then((value) =>{
        switch(value){
            case "easy":
                difficulty= 9;
                createGrid(difficulty);
                break;
            case "normal":
                difficulty= 8;
                createGrid(difficulty);
                break;
            case "hard":
                difficulty= 7;
                createGrid(difficulty);
                break;
            default:
        }
    })
}


const restartModal = () =>{
    swal({
        title: "Reiniciar juego?",
        text: "Perderás todo tu puntaje acumulado!",
        buttons: {
            cancelRestart: {
                text: "Cancelar",
                value: "cancelRestar",
              },
            newGame: {
              text: "Nuevo Juego",
              value: "newGame",
            },
          },
        className: "modal",
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((value) =>{
        switch(value){
            case "cancelRestart":
                break;
            case "newGame":
                grid.innerHTML = '';
                difficultyModal();
                break;
            default:
        }
    })
}

const gameOverModal = () =>{
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
      }).then((value) =>{
        switch(value){
            case "newGame":
                grid.innerHTML = '';
                difficultyModal();
                break;
            case "redo":
                grid.innerHTML = '';
                createGrid(difficulty);
                break;
            default:
        }
    })
}


window.addEventListener('load', ()=>{
   welcomeModal();

})

helpButton.addEventListener('click', ()=>{
    infoModal();
 })

 restartButton.addEventListener('click', () =>{
    restartModal();
 })