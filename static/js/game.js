const duckWidth = 30
const duckHeight = 30
const boardWidth = 50
const boardHeight = 50
const gridWidth= 560
const gridHeight= 300
let xDirection = -2
let yDirection = 2
let user = null;

const userStart = [600, -520]
let currentPosition = userStart

let timerId1
let timerId2
let score = 0

let start = null

let gridLeft = "";
let gridTop = "";

window.addEventListener('DOMContentLoaded', event => {
  document.getElementById('play_game').addEventListener('click', function() {
    document.getElementById("game").style.display = "block";
    document.getElementById("offensive_meme").style.display = "block";
    document.getElementById("saso").style.display = "block";
    document.getElementById("meme_div").style.display = "none";

    gameOver()

    let rect = document.getElementById("game").getBoundingClientRect();

    gridLeft = rect.left;
    gridTop = rect.top;
  });
});


//my duck
class Duck {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + duckWidth, yAxis]
    this.topRight = [xAxis + duckWidth, yAxis + duckHeight]
    this.topLeft = [xAxis, yAxis + duckHeight]
  }
}

//all my ducks
const ducks = []

// generate ducks
function addDuck(){
  // random position x between 0 and 470
  let randomPosition = Math.floor(Math.random() * 470 + gridLeft)
  // create new duck
  let duck_gen = new Duck(randomPosition, -220)
  // duck div
  const duck = document.createElement('div')
  duck.classList.add('duck')
  // add duck to grid
  duck.style.left = duck_gen.bottomLeft[0] + 'px'  
  duck.style.bottom = duck_gen.bottomLeft[1] + 'px' 
  // add duck to grid
  grid.appendChild(duck)
  // add duck to array
  ducks.push(duck)
}

// duck fall function
function moveDuck() {
  for (let i = 0; i < ducks.length; i++) {
    ducks[i].style.bottom = parseInt(ducks[i].style.bottom) - 10 + 'px'
    // remove duck from array
    if (parseInt(ducks[i].style.bottom) < -520) {
      ducks[i].remove()
      ducks.splice(i, 1)
      score++;
    }
  }
  checkForCollisions();
}

//add user
function addUser() {
  // create user div
  user = document.createElement('div')
  user.classList.add('user')
  grid.appendChild(user)
  drawUser()
}

//move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > gridLeft) {
        currentPosition[0] -= 10
        // console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (gridWidth - boardWidth + gridLeft)) {
        currentPosition[0] += 10
        // console.log(currentPosition[0])
        drawUser()   
      }
      break
  }
}

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//check for collisions
function checkForCollisions() {
  //check for duck collision with user collision
  for (let i = 0; i < ducks.length; i++){
    if (
      (currentPosition[0] <= (parseInt(ducks[i].style.left) + duckWidth)) &&
      ((currentPosition[0] + boardWidth) >= parseInt(ducks[i].style.left)) &&
      (currentPosition[1] <= (parseInt(ducks[i].style.bottom) + duckHeight)) &&
      ((currentPosition[1] + boardHeight) >= parseInt(ducks[i].style.bottom))
    ) {
      //collision detected
      clearInterval(timerId1)
      clearInterval(timerId2)
      document.removeEventListener('keydown', moveUser)
      // clean everything from grid
      while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
      }
      while(ducks.length > 0) {
        ducks.pop()
      }
      // add game over image
      gameOver();
      break 
    }
  }
}

function gameOver(){
  // add game over image

  grid = document.getElementById("grid");
  //grid.classList.add('game-over')
  grid.classList.add("game-over");
  grid.innerHTML ="<div style=\"z-index: 9999; text-align: center; color: white\"><p>Since AI is doing work instead of you, you do not need rubber duck anymore, so try to stay far away from them for as long as possible!</p><div class=\"score\"><p>Score: "+score+"</div></p><button id= \"start\">Start</button></div>"
  start = document.getElementById('start')
  start.addEventListener('click', function() {
    score = 0;
    grid.classList.remove('game-over')
    grid.innerHTML =""
    addUser();

    // call add duck every 1 second	
    timerId1 = setInterval(addDuck, 500)

    // move duck every 100ms
    timerId2 = setInterval(moveDuck, 100)

    document.addEventListener('keydown', moveUser)
  });
}