import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./background.js"

const PLAYER_WIDTH = 90
const PLAYER_HEIGHT = 15
const PLAYER_BORDER_HEIGHT = 10

const PLAYER_X = Math.floor((CANVAS_WIDTH - PLAYER_WIDTH) / 2)
const PLAYER_Y = CANVAS_HEIGHT - 90
const PLAYER_SPEED = 3

const CANVAS_BEGIN = 0
const CANVAS_END = CANVAS_WIDTH - PLAYER_WIDTH

export class Player{

  constructor(){
    this.x = PLAYER_X
    this.y = PLAYER_Y
    this.speed = PLAYER_SPEED
    this.playerWidth = PLAYER_WIDTH
    this.playerHeight = PLAYER_HEIGHT
    this.move = 0
  }

  moveLeft() {
    this.move = - this.speed
  }

  moveRight() {
    this.move = this.speed
  }

  stopMove() {
    this.move = 0
  }

  update() {
    if (this.move !== 0) {
      this.x += this.move

      if (this.x <= CANVAS_BEGIN) {
        this.x = CANVAS_BEGIN
        this.move = 0
      } else if (this.x >= CANVAS_END) {
        this.x = CANVAS_END
        this.move = 0
      }
    }
  }

  reset() {
    this.x = PLAYER_X
    this.y = PLAYER_Y
    this.playerWidth = PLAYER_WIDTH
    this.playerHeight = PLAYER_HEIGHT
    this.move = 0
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + PLAYER_WIDTH,
      ry: this.y + PLAYER_HEIGHT
    };
  }

  draw(context) {
    context.fillStyle = "#660D78"
    context.beginPath()
    context.rect(this.x,this.y, this.playerWidth, this.playerHeight)
    context.fill()
    context.closePath()
    
    context.beginPath()
    context.fillStyle = "orange"
    context.rect(this.x + 5, this.y, PLAYER_BORDER_HEIGHT, this.playerHeight)
    context.fill()
    context.closePath()

    context.beginPath()
    context.fillStyle = "orange"
    context.rect(this.x + this.playerWidth - 15, this.y, PLAYER_BORDER_HEIGHT, this.playerHeight)
    context.closePath()
    context.fill()
  }

}