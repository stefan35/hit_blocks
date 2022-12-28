import { Background, CANVAS_HEIGHT } from "./background.js"
import { Player } from "./player.js"
import { Ball } from "./ball.js"
import { createBlocks } from "./block.js"
import { Ability } from "./ability.js"

export class Main{

  constructor(background){
	this.level = 1
	this.background = background 
	this.player = new Player()
	this.ball = new Ball()
	this.blocks = createBlocks(this.level)
	this.ability = {}
	this.score = 0
	this.gameOver = false
	this.attempts = 3

	document.addEventListener("keydown", (event) => {
	  if (!this.gameOver) {
		  if (event.key === "ArrowLeft") {
		    this.player.moveLeft()
		  } else if (event.key === "ArrowRight") {
			this.player.moveRight()
		  } else if(event.key === " "){
			this.ball.holdBallOff()
		  }
	  } else {
	    if(event.key === "r"){
		  this.gameOver = false
		  this.score = 0
		  this.attempts = 3

		  this.ball.reset()
		  this.ball.holdBallOn()
		  this.player.reset()
		  this.blocks = createBlocks(this.level)

		  this.start()
		}
	  }
	});

	document.addEventListener("keyup", (event) => {
	  if ((event.key === "ArrowLeft") || (event.key === "ArrowRight")) {
	    this.player.stopMove()
	  }
	});
}

  start() {
	this.gameLoop()
  }

  update() {
	this.player.update()

	if(!this.ball.holdBall)
	  this.ball.update()
	if(Object.keys(this.ability).length !== 0)
	  this.ability.update()
  }

  draw() {
	this.player.draw(this.background.context)
	this.ball.draw(this.background.context)

	this.blocks.forEach((brick) => {
	  brick.draw(this.background.context)
	});

	if(Object.keys(this.ability).length !== 0)
	  this.ability.draw(this.background.context)
  }

  checkBallBrickCollision() {
	const ballBox = this.ball.box()

	for(let i= 0; i < this.blocks.length; i++){
	  //x
	  if(this.blocks[i].checkEnergy() && (ballBox.lx <= this.blocks[i].box().rx + 15) && (ballBox.rx >= this.blocks[i].box().lx) && (ballBox.ry > this.blocks[i].box().ly + 2) && (ballBox.ly <= this.blocks[i].box().ry)){
		  this.ball.bounceX()
		  this.actionAfterCollision(i, ballBox)

		  break
	  }
	  //y
	  if (this.blocks[i].checkEnergy() && (ballBox.lx <= this.blocks[i].box().rx + 10) && (ballBox.rx >= this.blocks[i].box().lx) && (ballBox.ry >= this.blocks[i].box().ly) && (ballBox.ly <= this.blocks[i].box().ry + 10)) {
		  this.ball.bounceY()
		  this.actionAfterCollision(i, ballBox)

		  break
	  }
	}
  }

  actionAfterCollision(specificBlock, ballBox){
	this.blocks[specificBlock].hit()

	if (!this.blocks[specificBlock].checkEnergy()) 
	  this.score++

	if(Object.keys(this.ability).length === 0 && this.blocks.length > 1)
	  if(this.generateNumber() % 2 === 0)
		this.ability = new Ability(ballBox.lx, ballBox.ly, 5)
  }


  checkblocksCount() {
	return this.blocks.map(block => block.energy).reduce((a, b) => a + b)
  }

 checkPlayerBallCollision(player, ball){
	if((ball.ry > player.ly + 3) && (ball.ly < player.ry + 3) && (ball.rx > player.lx) && (ball.lx < player.rx))
	  this.ball.bounceX()
	if((ball.ry > player.ly) && (ball.ly < player.ry) && (ball.rx > player.lx) && (ball.lx < player.rx))
	  this.ball.bounceY()
 }

  generateNumber(){
	return Math.floor(Math.random() * 101)
  }

  checkPlayerAbilityCollision(player, abilityBox){
	if(abilityBox.ly > CANVAS_HEIGHT)
	  this.ability = {}
	if(abilityBox.ly + 15 >= player.ry && abilityBox.ly < player.ry && abilityBox.rx > player.lx && abilityBox.lx < player.rx){
	  if(this.generateNumber() % 2 == 0)
		this.ability.applyAbility(this.player, "speed")
	  else if(this.generateNumber() % 2 != 0)
		this.ability.applyAbility(this.player, "player")
	  this.ability = {}
	}
  }

  gameLoop() {
	let youWin = false

	this.update()

	if(this.attempts === 0)
	  this.gameOver = true

	if (CANVAS_HEIGHT < this.ball.y - this.ball.size) {
	  this.attempts--
	  this.ball.reset()
	  this.ball.holdBallOn()
	  this.player.reset()
	  this.ability = {}
	} else {
	  this.checkPlayerBallCollision(this.player.box(), this.ball.box())
	  this.checkBallBrickCollision()
	  if(Object.keys(this.ability).length !== 0)
		this.checkPlayerAbilityCollision(this.player.box(), this.ability.box())

	  if (this.checkblocksCount() === 0 && this.level === 2) {
	    this.gameOver = true
		youWin = true
	  } else if(this.checkblocksCount() === 0 && this.level === 1){
		this.level = 2

		this.ball.reset()
		this.ball.holdBallOn()
		this.player.reset()
		this.blocks = createBlocks(this.level)
	  }
	}

	this.background.clear(this.attempts, this.score, this.level)

	if (this.gameOver) {
	  if (youWin) {
	    this.background.drawWin()
	  } else if(this.attempts === 0){
		this.background.drawGameOver()
	  }
	} else {
	  this.draw();
	  window.requestAnimationFrame(() => this.gameLoop());
	}
  }
}