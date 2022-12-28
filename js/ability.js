const ABILITY_SPEED = 0.5
const ABILITY_SIZE = 5

export class Ability{
    
  constructor(x, y, ability){
	this.x = x
	this.y = y
	this.speed = ABILITY_SPEED
	this.ability = ability    
  }

  update() {
	this.y += this.speed
  }

  box() {
	return {
	  lx: this.x,
	  ly: this.y,
	  rx: this.x + ABILITY_SIZE,
	  ry: this.y + ABILITY_SIZE
	};
  }

  applyAbility(obj, ability){
	let saveValue
	if(ability == "speed"){
	  saveValue = obj.speed
	  obj.speed = 10
	  setTimeout(() => {
		obj.speed = saveValue
	  }, 3000)
	} else if(ability == "player"){
	  saveValue = obj.playerWidth
	  obj.playerWidth = 45
	  setTimeout(() => {
		obj.playerWidth = saveValue
	  }, 3000)
	}	
  }

  draw(context) {
	context.fillStyle = "orange"
	context.beginPath()
	context.arc(this.x, this.y, ABILITY_SIZE, 0, Math.PI * 2)
	context.closePath()
	context.fill()
  }
}