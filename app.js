// HTML ELEMENTS
const modalWelcome = document.getElementById('modal-welcome');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalRestart = document.getElementById('modal-restart');

const newGame = document.getElementById('new-game')
const cancelButton = document.getElementById('cancel-button');
const restartGame = document.getElementById('restart-game');

const difficultyEasy = document.getElementById('difficulty-easy');
const difficultyNormal = document.getElementById('difficulty-normal');
const difficultyHard = document.getElementById('difficulty-hard');


// GRID ELEMENTS

const pizza
pizza.textContent = 'U+1F355';
const hamburguer
hamburguer.textContent = 'U+1F354';
const sushi  
sushi.textContent = 'U+1F363';
const pasta
pasta.textContent = 'U+1F35D';

twemoji.parse(document.body);

const food = [pizza, hamburguer, sushi, pasta]

const grid = document.getElementById('grid');


// GRID FUNCTIONS
const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min
}

const obtenerEmoji = food[getRandomInt(0, 7)];

const createGrid = () =>{
    for(let i=0; i < 7; i++){
        for(let j=0; j < 7; j++){
            
        }
    }
}


// MODAL FUNCTIONS


cta.addEventListener('click', (e) =>{
    e.preventDefault();
    modalContainer.style.opacity = '1';
    modalContainer.style.visibility = 'visible';
    modal.classList.toggle('modal-close');
})
close.addEventListener('click', () =>{
    modal.classList.add('modal-close');
    setTimeout(() =>{
        modalContainer.style.opacity = '0';
        modalContainer.style.visibility = 'hidden';
    },400)
})
window.addEventListener('click', e =>{
    if(e.target === modalContainer){
        modal.classList.add('modal-close');
        setTimeout(() =>{
            modalContainer.style.opacity = '0';
            modalContainer.style.visibility = 'hidden';
        },400)
    }
})





//SWEET ALERT

const modalWelcomeModal = () =>{
    swal({
        title: "Bienvenidas!",
        text: "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.",
        text: "Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!",
        title: "Controles",
        text: "Click izquierdo: selección",
        text: "Enter o Espacio: selección",
        text: "Flechas o WASD: movimiento e intercambio",
        button: "A jugar!",
      });
}

const difficultyModal = () =>{
    swal({
        title: "Nuevo juego",
        text: "Selecciona una dificultad",
        buttons: {
            easy: {
                text: "Normal",
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
      });
}
.then((value) =>{
    switch(value){
        case "easy":
            createGrid(easy);
            break;
        case "normal":
            createGrid(normal);
            break;
        case "hard":
            createGrid(hard);
            break;
        default:
    }
})

const restartModal = () =>{
    swal({
        title: "Reiniciar juego?",
        text: "Perderás todo tu puntaje acumulado!",
        buttons: {
            cancel: {
                text: "Cancelar",
                value: "cancel",
              },
            newGame: {
              text: "Nuevo Juego",
              value: "newGame",
            },
          },
      });
}
.then((value) =>{
    switch(value){
        case "cancel":
            createGrid(easy);
            break;
        case "newGame":
            difficultyModal();
            break;
        default:
    }
})
const gameOverModal = () =>{
    swal({
        title: "¡Juego terminado!",
        text: `Puntaje final: ${finalScore}`,
        icon: "success",
        button: "Nuevo Juego",
        button: "Reiniciar",
      });
}


window.addEventListener('click', ()=>{
   modalWelcome;
})

