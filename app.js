const pizza = '🍕';
const hamburguer = '🍔';
const sushi = '🍣';
const pancakes = '🥞';
const food = ['🍕', '🥞', '🍣', '🍔']

const grid = document.getElementById('grid');

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


// MODAL

const close = document.getElementById('close');
const cta = document.getElementById('cta');
const modal = document.getElementById('modal');
const modalContainer = document.getElementById('modalContainer');

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