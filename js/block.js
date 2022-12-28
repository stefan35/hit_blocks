import { LEVEL_1, LEVEL_2 } from './levels.js'

const BLOCK_PADDING = 10
const BLOCK_WIDTH = 60
const BLOCK_HEIGHT = 20
const BLOCK_COLUMNS = 10

const BLOCK_X = 105
const BLOCK_Y = 50

export class Block{

  constructor(x, y, energy){
    this.x = x
    this.y = y
    this.energy = energy
  }

  hit() {
    if (this.checkEnergy())
      this.energy--
  }

  checkEnergy() {
    return this.energy > 0
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + BLOCK_WIDTH,
      ry: this.y + BLOCK_HEIGHT
    };
  }

  draw(context) {
    if (this.checkEnergy()) {
      if(this.energy == 1)
        context.fillStyle = "#128231"
      else if(this.energy == 2)
        context.fillStyle = "#073815"
      
      context.beginPath()
      context.rect(this.x, this.y, BLOCK_WIDTH, BLOCK_HEIGHT)
      context.closePath()
      context.fill()
    }
  }

}

export function createBlocks(level) {
  const blocks = []

  let x = BLOCK_X
  let y = BLOCK_Y
  let currentLevel

  if(level === 1)
    currentLevel = LEVEL_1[0]
  else
    currentLevel = LEVEL_2[0]

  for (let i = 0; i < currentLevel.length; i++) {
    const block = new Block(x, y, currentLevel[i])
    
    if (block)
      blocks.push(block)

    if ((i + 1) % BLOCK_COLUMNS === 0) {
      x = BLOCK_X
      y += BLOCK_HEIGHT * 2
    } else {
      x += BLOCK_WIDTH + BLOCK_PADDING
    }
  }

  return blocks
}