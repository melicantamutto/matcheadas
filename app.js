// HTML ELEMENTS




// GRID ELEMENTS

const pizza = document.createElement('span');
pizza.textContent = 'U+1F355';
const hamburguer = document.createElement('span');
hamburguer.textContent = 'U+1F354';
const sushi = document.createElement('span');
sushi.textContent = 'U+1F363';
const pasta = document.createElement('span');
pasta.textContent = 'U+1F35D';

twemoji.parse(document.body);

const food = [pizza, hamburguer, sushi, pasta]

const grid = document.getElementById('grid');


// GRID FUNCTIONS
const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log(getRandomInt(0,5))
console.log(getRandomInt(0,5))
console.log(getRandomInt(0,5))
console.log(getRandomInt(0,5))
console.log(getRandomInt(0,5))
console.log(getRandomInt(0,5))

const createGrid = (difficulty) =>{
    let number;
    if(difficulty === 'easy'){
        number= 9;
    } else if(difficulty === 'normal'){
        number = 8;
    } else if(difficulty === 'hard'){
        number = 7;
    }
    for(let i=0; i < number; i++){
        for(let j=0; j < number; j++){
            const newP = document.createElement('p');
            newP.innerHTML = food[getRandomInt(0,4)];
            grid.appendChild(newP);
        }
    }
}






//SWEET ALERT

const modalWelcome = () =>{
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
// .then((value) =>{
//     switch(value){
//         case "easy":
//             createGrid(easy);
//             break;
//         case "normal":
//             createGrid(normal);
//             break;
//         case "hard":
//             createGrid(hard);
//             break;
//         default:
//     }
// })

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
// .then((value) =>{
//     switch(value){
//         case "cancel":
//             createGrid(easy);
//             break;
//         case "newGame":
//             difficultyModal();
//             break;
//         default:
//     }
// })
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

