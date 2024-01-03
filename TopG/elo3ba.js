const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelectorAll('.score')
const andrew = document.querySelectorAll('.Top-G')
const missMessageContainer = document.getElementById('missMessage')
let lastHole
let timeUp = false
let score = 0
const missMessages = [
    "What color is your Bugatti ?",
    "You can't catch me!",
    "HAHAHAHAHAHHAHA",
    "Do some  push ups than come back!",
    "Your worse than a woman!",
    "C'MOOOOOON GRANDPAAA",
    "Is this all you got ?",
    "OMG are you crying???"
  ];

const randomTime = (min,max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const randomHole = (holes) => {
    const index = Math.floor(Math.random() * holes.length)
    const hole = holes[index]
if(hole == lastHole){
    return randomHole(holes)
}
lastHole = hole
return hole
}

const kacha = () =>{
    const time = randomTime(200,1000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(()=>{
        hole.classList.remove('up')
        if (!timeUp) {
            kacha()
        }
    },time)
}

const startGame = () => {
    scoreBoard.textContent = '0';
    timeUp = false;
    score = 0;
    kacha();
    setTimeout(() => timeUp = true, 15000); 
    missMessageContainer.style.display = 'none';
}

function hit(e) {
    if (!e.isTrusted) return; 
    if (this.classList.contains('up')) {
        score++; 
    }
    this.classList.remove('up')
    scoreBoard.textContent = score
}
const showMissMessage = () => {
    const messageIndex = Math.floor(Math.random() * missMessages.length)
    missMessageContainer.textContent = missMessages[messageIndex]
    missMessageContainer.style.display = 'block'
    setTimeout(() => {
        missMessageContainer.style.display = 'none'
    }, 2000)
}
const miss = (e) => {
    if (!e.target.matches('.Top-G.up')) {
        showMissMessage()
    }
}
andrew.forEach(topG => topG.addEventListener('click', hit))
holes.forEach(hole => hole.addEventListener('click', miss))

