const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gravity = 0.1
let gameOver = false

document.querySelector('html').style.width = innerWidth + 'px'
document.querySelector('html').style.height = innerHeight + 'px'

const pole = {
  width: 20,
  height: canvas.height,
  x: canvas.width,
  y: 0,
  velocity: 3,
  color: 'blue',
  create: function () {
    ctx.fillStyle = pole.color
    ctx.fillRect(pole.x, pole.y, pole.width, pole.height)
    this.x -= this.velocity
    if (this.x <= 0 - this.width) {
      this.x = canvas.width
    }
  }
}

const hole = {
  width: 20,
  height: 80,
  x: canvas.width,
  y: undefined,
  velocity: pole.velocity,
  color: 'white',
  create: function () {
    if (this.y === undefined) {
      this.y = Math.round(Math.random() * (canvas.height - this.height))
    }
    ctx.fillStyle = hole.color
    ctx.fillRect(hole.x, hole.y, hole.width, hole.height)
    this.x -= this.velocity
    if (this.x <= -20) {
      this.x = canvas.width
      this.y = Math.round(Math.random() * (canvas.height - this.height))
    }
  }
}

const character = {
  x: 20,
  y: undefined,
  width: 20,
  height: 20,
  velocity: 0.1,
  color: 'red',
  create: function () {
    if (this.y === undefined) {
      this.y = canvas.height/2 - this.height/2
    }
    ctx.fillStyle = character.color
    ctx.fillRect(character.x, character.y, character.width, character.height)
    if (
      this.y >= canvas.height - this.height ||
      this.y <= 0 ||
      (
        this.x >= pole.x - this.width &&
        this.x <= pole.x + pole.width &&
        (
          this.y <= hole.y ||
          this.y + this.height >= hole.y + hole.height
        )
      )
    ) {
      gameOver = true
    } else {
      this.y += this.velocity
      this.velocity += gravity
    }
  },
  jump: function () {
    character.velocity = -3
  }
}

const score = {
  value: 0,
  x: 0,
  y: 16,
  font: '16px sans-serif',
  color: 'black',
  create: function () {
    ctx.font = this.font
    ctx.fillStyle = this.color
    ctx.fillText(score.value, score.x, score.y)
    if (gameOver) {
      this.value = 0
    } else {
      this.value++
    }
  }
}

canvas.addEventListener('click', start)
canvas.addEventListener('click', character.jump)

function start () {
  canvas.removeEventListener('click', start)
  animate()
}

function restart () {
  pole.x = canvas.width
  hole.x = canvas.width
  hole.y = Math.round(Math.random() * (canvas.height - hole.height))
  character.y = canvas.height/2 - character.height/2
  character.velocity = -0.1
  canvas.removeEventListener('click', restart)
  canvas.addEventListener('click', character.jump)
  gameOver = false
  animate()
}

function animate () {
  if (gameOver) {
    canvas.removeEventListener('click', character.jump)
    canvas.addEventListener('click', restart)
    return
  }
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  pole.create()
  hole.create()
  character.create()
  score.create()
}
