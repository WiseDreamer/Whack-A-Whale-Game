const holes = Array.from(document.querySelectorAll('.hole'))
const whales = Array.from(document.querySelectorAll('[data-whale]'))
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const startBtn = document.getElementById('start')
const difficultyEl = document.getElementById('difficulty')

let lastHole
let time = 30
let score = 0
let gameTimer = null
let popTimer = null
let running = false

const difficultyMap = {
  easy: { popMin: 800, popMax: 1400 },
  medium: { popMin: 500, popMax: 900 },
  hard: { popMin: 300, popMax: 600 }
}

function randomTime(min, max){
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes){
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if(hole === lastHole) return randomHole(holes)
  lastHole = hole
  return hole
}

function showWhale(){
  const difficulty = difficultyEl.value || 'easy'
  const { popMin, popMax } = difficultyMap[difficulty]
  const timeUp = randomTime(popMin, popMax)
  const hole = randomHole(holes)
  const whale = hole.querySelector('.whale')
  whale.classList.add('up','appear')
  // remove appear class after animation so it can re-trigger next time
  setTimeout(() => whale.classList.remove('appear'), 350)

  // hide after timeUp
  setTimeout(() => {
    if(whale.classList.contains('up')) whale.classList.remove('up')
  }, timeUp)

  // schedule next pop while game running
  if(running){
    popTimer = setTimeout(showWhale, Math.max(120, timeUp - 80))
  }
}

function startGame(){
  if(running) return
  running = true
  score = 0
  time = 30
  scoreEl.textContent = score
  timeEl.textContent = time
  // start popping
  showWhale()
  gameTimer = setInterval(() => {
    time -= 1
    timeEl.textContent = time
    if(time <= 0){
      endGame()
    }
  }, 1000)
}

function endGame(){
  running = false
  clearInterval(gameTimer)
  clearTimeout(popTimer)
  // hide any visible whales
  whales.forEach(w => w.classList.remove('up','appear'))
  alert('Game over! Your score: ' + score)
}

function whack(e){
  // only count real clicks
  if(!e.isTrusted) return
  if(!this.classList.contains('up')) return

  // prevent double-clicks while hit animation runs
  if(this.classList.contains('hit')) return

  score += 1
  this.classList.remove('up')
  this.classList.add('hit')
  scoreEl.textContent = score
  // keep the hit class for the duration of the splash animation
  setTimeout(() => this.classList.remove('hit'), 520)
}

whales.forEach(w => w.addEventListener('click', whack))
startBtn.addEventListener('click', startGame)

// allow Enter to start
difficultyEl.addEventListener('keydown', (e) => { if(e.key === 'Enter') startGame() })

// expose for debugging
window.__whack = { startGame, endGame }
