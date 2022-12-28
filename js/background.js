export const CANVAS_WIDTH = 900
export const CANVAS_HEIGHT = 630

const MESSAGE_X = Math.floor(CANVAS_WIDTH / 2)
const MESSAGE_Y = Math.floor(CANVAS_HEIGHT / 2)

const SCORE_X = 20
const SCORE_Y = CANVAS_HEIGHT - 40

const LEVEL_X = 20
const LEVEL_Y = CANVAS_HEIGHT - 15

const ATTEMPT_X = CANVAS_WIDTH - 10
const ATTEMPT_Y = CANVAS_HEIGHT - 40

export class Background{

  constructor(){
    this.canvas = document.getElementById("canvas")
	this.context = this.canvas.getContext("2d")
  }

  clear(attempts, score, level) {
	this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	this.context.fillStyle = "#F0F8FF"
	this.context.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)

	this.context.font = "18px sans"
	this.context.textAlign = "left"
	this.context.fillStyle = "#000000"
	this.context.fillText(`Score: ${score}`, SCORE_X, SCORE_Y)

	this.context.font = "18px sans"
	this.context.textAlign = "left"
	this.context.fillStyle = "#000000"
	this.context.fillText(`Level: ${level}`, LEVEL_X, LEVEL_Y)

	this.image = document.getElementById("attempts")
	for(let i = 1; i <= attempts; i++){
	  this.context.drawImage(this.image, ATTEMPT_X - (i * 35), ATTEMPT_Y)
	}
	
  }

  drawMessage(message, messageX = MESSAGE_X, messageY = MESSAGE_Y) {
	this.context.font = "32px sans"
	this.context.textAlign = "center"
	this.context.fillStyle = "#7A7A52"
	this.context.fillText(message, messageX, messageY)
  }

  drawGameOver() {
	this.drawMessage("Game Over!")
	this.drawMessage("Press R to try again", MESSAGE_X, MESSAGE_Y + 30)
  }

  drawWin() {
	this.drawMessage("You Win!")
  }

  drawMenu(){
	this.context.fillStyle = "#748cf7"
	this.context.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)

	this.context.font = "64px sans"
	this.context.textAlign = "center"
	this.context.fillStyle = "#000000"
	this.context.fillText("HIT BLOCKS", MESSAGE_X, MESSAGE_Y - 90)

	this.context.beginPath();
	this.context.ellipse(MESSAGE_X, MESSAGE_Y + 25, 120, 45, 0, 0, 2 * Math.PI)
	this.context.fillStyle = "#FFFFFF" 
	this.context.fillStyle = "#EDA761"
	this.context.fill()
	this.context.lineWidth = 2
	this.context.stroke()
	this.context.closePath()
	this.context.font = "24px sans"
	this.context.fillStyle = "#000000"
	this.context.fillText("Press ENTER to play", MESSAGE_X, MESSAGE_Y + 30)

	this.context.font = "18px sans"
	this.context.textAlign = "center"
	this.context.fillStyle = "#000000"
	this.context.fillText("Controls: \u2190, \u2192, Space(start game)", MESSAGE_X, MESSAGE_Y + 270)
  }
}