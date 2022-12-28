import { Background } from "./js/background.js"
import { Main } from "./js/main.js"

let background
let start = false

window.addEventListener("load", () => {
  background = new Background()
  background.drawMenu()
});

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter" && !start){
    const game = new Main(background);
    game.start();

    start = true
  }
});
