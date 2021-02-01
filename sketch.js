// remove loader
window.onload = function() {
  document.querySelector("#loader").style.display = "none";
}


//buttons
const setting_btn = document.querySelector("#setting-btn");
const play_btns = document.querySelectorAll(".play");
const restart_btns = document.querySelectorAll(".restart");

const col_d0004e_btn = document.querySelector("#d0004e");
const col_e66bba_btn = document.querySelector("#e66bba");
const col_d07499_btn = document.querySelector("#d07499");
const col_ffb997_btn = document.querySelector("#ffb997");



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
let colors;
let col_d0004e, col_e66bba, col_d07499, col_ffb997;
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

  col_d0004e_btn.addEventListener("click", ()=>{setColor(col_d0004e);});
  col_e66bba_btn.addEventListener("click", ()=>{setColor(col_e66bba);});
  col_d07499_btn.addEventListener("click",()=>{ setColor(col_d07499);});
  col_ffb997_btn.addEventListener("click", ()=>{setColor(col_ffb997);});


  sml = width < height ? width : height;

  min_star_size = sml / 20;
  max_star_size = sml / 6;

  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  noFill();
  noStroke();

  col = color(125);
  colorMode(HSL, 360, 100, 100);
  col_d0004e = [
    color("#d0004e"),
    color("#00b188"),
    color("#0055fb"),
    color("#ff784b"),
    color("#d250f6"),
    color("#7854f7"),
    color("#ff7d7d"),
    color("#12a5ed"),
    color("#ffca00"),
    color("#7ed321"),
    color("#f5325b"),
    color("#ff8400"),
    color("#06c1ff")
    ];
  

  col_e66bba = [
   color("#e66bba"),
    color("#3b3086"),
    color("#ffc2c0"),
   color("#fae0db"),
    color("#7291f9")
  ];

  col_d07499 = [
     color("#d07499"),
    color("#f88999"),
    color("#b9c4e3"),
    color("#808fba")
   ];
  col_ffb997 = [
     color("#ffb997"),
    color("#f67e7d"),
     color("#843b62"),
     color("#0b032d"),
     color("#621940")
  ];



  //initializations
  ship = new Ship();
  bullet = new Bullet();
  for (let i = 0; i < 10; i++) {
    stars.push(new Star(random(min_star_size, max_star_size)));
  }


  noLoop();
  setColor(col_ffb997);
}

function setColor(color_array) {
  colors = color_array;
  stars.forEach(star=>{
    star.updateColor();
  })
  loop();
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
  gameover_model.classList.remove("hide");
  restart();
}

//show setting model
function settingsShow() {
  closeAllModels();
  settings_model.style.display = "block";
  settings_model.classList.remove("hide");
}

//closing all models
function closeAllModels() {
  // settings_model.style.display = "none";
  // intro_model.style.display = "none";
  // gameover_model.style.display = "none";
  settings_model.classList.add("hide");
  intro_model.classList.add("hide");
  gameover_model.classList.add("hide");
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
  stars.splice(0, stars.length);

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
  if (frameCount > 0) {
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