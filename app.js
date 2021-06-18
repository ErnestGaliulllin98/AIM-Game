const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'orange', 'yellow', 'green', '#31C1E7', 'blue', 'purple']

let time = 0
let score = 0

startBtn.addEventListener('click', event => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
  setTime(current)
  }
}

function setTime(time) {
  timeEl.innerHTML = `00:${time}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle =  document.createElement('div')
  circle.classList.add('circle')
  
  const {width, height} = board.getBoundingClientRect()
  const size = generateRandomInteger(15, 60)
  const x = generateRandomInteger(0, width - size)
  const y = generateRandomInteger(0, height - size)
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${x}px`
  circle.style.left = `${y}px`
  circle.style.background = `${colors[generateRandomInteger(0, colors.length)]}`

  board.append(circle)
}

function generateRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
