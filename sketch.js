// remove loader
window.onload = function() {
  document.querySelector("#loader").style.display = "none";
}


//buttons
const setting_btn = document.querySelector("#setting-btn");
const play_btns = document.querySelectorAll(".play");
const restart_btns = document.querySelectorAll(".restart");

//popups/models
const intro_model = document.querySelector(".hero.intro");
const settings_model = document.querySelector(".hero.settings");
const gameover_model = document.querySelector(".hero.gameover");

//health/life left
const lifes = document.querySelectorAll(".life");


//score
const coin = document.querySelector("#coin");

//diamond score
const diamond = document.querySelector("#diamond");




//Ship class
let ship;

//Bullet class
let bullet;

//Star class
let stars = [];

//Gem class (diamond)
let gems = [];
let diamond_img;

let col; //color of ship and bullet

//sounds
let success;
let pling;
let snap;
let starttrack;
let losetrack;


let isPlaying = false;


//size of obstacles(star)
let min_star_size, max_star_size;

//width or height whichever is small
let sml;

function preload() {

  diamond_img = loadImage('./Assets/Img/Coin/tileRed_16.png');

  success = loadSound('./Assets/Sound/Success.mp3');
  pling = loadSound('./Assets/Sound/Pling.mp3');
  snap = loadSound('./Assets/Sound/Snap.mp3');
  starttrack = loadSound('./Assets/Sound/Fairy.mp3');
  losetrack = loadSound('./Assets/Sound/Game2.mp3');

}


function setup() {
  createCanvas(windowWidth, windowHeight);


  //listening for click events on btns
  play_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeAllModels();
      toggle("play");
    });
  });

  restart_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeAllModels();
      toggle("play");
      restart();
    });
  });
  setting_btn.addEventListener("click", () => {
    settingsShow();
    toggle("pause");
    // }
  });


  sml = width < height ? width : height;

  min_star_size = sml / 20;
  max_star_size = sml / 6;

  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  noFill();
  noStroke();

  col = color(125);

  //initializations
  ship = new Ship();
  bullet = new Bullet();
  for (let i = 0; i < 10; i++) {
    stars.push(new Star(random(min_star_size, max_star_size)));
  }


  noLoop();
}


//display remaining life via adding removing class of icon of heart
function updateLife(n) {
  for (let i = 0; i < 3; i++) {
    // fas is solid heart 
    // far is hollow heart 
    if (i < n) {
      lifes[i].classList.remove("far");
      lifes[i].classList.add("fas");
    } else {
      lifes[i].classList.add("far");
      lifes[i].classList.remove("fas");
    }
  }
}



//show gameover model and restart game 
function gameovershow() {
  closeAllModels();
  gameover_model.style.display = "block";
  restart();
}

//show setting model
function settingsShow() {
  closeAllModels();
  settings_model.style.display = "block";
}

//closing all models
function closeAllModels() {
  settings_model.style.display = "none";
  intro_model.style.display = "none";
  gameover_model.style.display = "none";
}


function toggle(type) {
  if (type == "play") {
    loop();
    isPlaying = true;
  } else if (type == "pause") {
    noLoop();
    isPlaying = false;
  } else {
    if (isPlaying) {
      noLoop();
      isPlaying = false;
    } else {
      loop();
      isPlaying = true;
    }
  }
}


function restart() {
  
  //delete old
  delete ship;
  delete bullet;
  stars.splice(0, 10);

  //create new
  ship = new Ship();
  bullet = new Bullet();
  for (let i = 0; i < 10; i++) {
    stars.push(new Star(random(min_star_size, max_star_size)));
  }
  
  
  starttrack.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  sml = width < height ? width : height;
}


function keyPressed() {
  //play/pause with spacebar
  if (keyCode === 32) {
    toggle();
    closeAllModels();
  }
  return false;
}

function touchStarted() {
  if (isPlaying) {
    ship.update();
    ship.render();
  }
}

function doubleClicked() {

  // prevent default browser action
  return false;
}


function draw() {
  if (frameCount > 1) {
    clear();

    //about ship
    ship.update();
    ship.render();

    //bounce the bullet if it hits the ship 
    bullet.hits(ship);
    bullet.render();



    //all about STAR 
    for (let i = stars.length - 1; i >= 0; i--) {

      stars[i].render();

      if (bullet.hitstar(stars[i])) {

        //every hit makes bullet faster to speed up game 
        bullet.vel.mult(1.005);


        if (stars[i].r > max_star_size / 2) {
          // drop diamond if it hit bigger star
          gems.push(new Gem(stars[i].pos.x, stars[i].pos.y));
          //     stars.push(new Star(stars[i].r / 2));

          //also adding new star of its half a radius
          stars.push(new Star(stars[i].r / 2));
        } else {
          //add random sized star if hits small star
          stars.push(new Star(random(min_star_size, max_star_size)));
        }

        //remove the hitted star
        stars.splice(i, 1);

      }
    }


    //all about DIAMOND 
    for (let i = gems.length - 1; i >= 0; i--) {
      gems[i].update();
      if (gems[i].hit(ship)) {
        bullet.diamond++;
        success.play();
        gems.splice(i, 1);
      }
      if (gems[i] && gems[i].pos.y > height) {
        gems.splice(i, 1);
      }
    }

    //scoring update 
    coin.innerText = floor(bullet.score);
    diamond.innerText = floor(bullet.diamond);
    updateLife(bullet.life);

    //bullet updating
    bullet.update();
  }
}