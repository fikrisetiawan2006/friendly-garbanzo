var config = {
  type:  Phaser.AUTO,
  width: 320,
  height: 240,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config)

function preload () {
  this.load.image('sky', 'https://friendly-garbanzo.netlify.app/sky.png')
  this.load.image('bird', 'https://friendly-garbanzo.netlify.app/bird.png')
  this.load.image('pole', 'https://friendly-garbanzo.netlify.app/pole.png')
}
function create () {
  this.add.image(160, 120, 'sky')
  this.add.image(16, 16, 'bird')
}
function update () {}
