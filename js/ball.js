import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./background.js"

const BALL_X = CANVAS_WIDTH / 2
const BALL_Y = CANVAS_HEIGHT - 110
const BALL_SIZE = 10
const BALL_SPEED = 1

export class Ball{

  constructor(){
	this.x = BALL_X
	this.y = BALL_Y
	this.size = BALL_SIZE
	this.xStep = BALL_SPEED
	this.yStep = BALL_SPEED
	this.holdBall = true
  }

  bounceX() {
	this.xStep *= -1
	this.update()
  }

  bounceY() {
	this.yStep *= -1
	this.update()
  }

  holdBallOn(){
	this.holdBall = true
  }

  holdBallOff(){
	this.holdBall = false
  }

  update() {
	this.x += this.xStep
	this.y += this.yStep

	if ((this.x <= BALL_SIZE) || (this.x >= (CANVAS_WIDTH - BALL_SIZE))) {
	  this.bounceX()
	} else if (this.y <= BALL_SIZE) {
	  this.bounceY()
	}
  }

  reset() {
	this.x = BALL_X
	this.y = BALL_Y
	this.xStep = BALL_SPEED
	this.yStep = BALL_SPEED
  }

  box() {
	return {
	  lx: this.x,
	  ly: this.y,
	  rx: this.x + BALL_SIZE,
	  ry: this.y + BALL_SIZE
	};
  }

  draw(context) {
	context.fillStyle = "silver"
	context.beginPath()
	context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
	context.closePath()
	context.fill()
	context.fillStyle = "yellow"
  }
}