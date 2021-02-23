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

const pizza = 'U+1F355';
const hamburguer = 'U+1F354';
const sushi = 'U+1F363';
const pasta = 'U+1F35D';
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