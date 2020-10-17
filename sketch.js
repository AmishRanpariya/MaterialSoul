let ship;
let bullet;
let stars = [];
let gems = [];

let isPC = false; //for computers

//images
let pointimg;
let bulletimg = [];
let spepointimg;
let healthimg;
let nonhealthimg;
let shipimg = [];

//sounds
let success;
let pling;
let snap;
let starttrack;
let losetrack;

let scl; //scaling
let isPlaying = false;

let playpausebtn, restartbtn; //buttons

let bgbody; //for background

let starmin, starmax; //size of obstacles
let sml; //width or height whichever is small

let n = 1;


function preload() {
  pointimg = loadImage('./Assets/Img/Coin/coin_01.png');

  bulletimg.push(loadImage('./Assets/Img/Ball/ball.png'));
  bulletimg.push(loadImage('./Assets/Img/Ball/ballBlack_05.png'));
  bulletimg.push(loadImage('./Assets/Img/Ball/ballBlue_10.png'));
  bulletimg.push(loadImage('./Assets/Img/Ball/ballGrey_10.png'));
  bulletimg.push(loadImage('./Assets/Img/Ball/ballYellow_10.png'));



  spepointimg = loadImage('./Assets/Img/Coin/tileRed_16.png');
  healthimg = loadImage('./Assets/Img/tileRed_24.png');
  nonhealthimg = loadImage('./Assets/Img/tileGrey_24.png');


  success = loadSound('./Assets/Sound/Success.mp3');
  pling = loadSound('./Assets/Sound/Pling.mp3');
  snap = loadSound('./Assets/Sound/Snap.mp3');
  starttrack = loadSound('./Assets/Sound/Fairy.mp3');
  losetrack = loadSound('./Assets/Sound/Game2.mp3');


  shipimg.push(loadImage('./Assets/Img/Paddle/ground_cake.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/ground_grass.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/ground_sand.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/ground_snow.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/ground_stone.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/ground_wood.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/paddle_01.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/paddle_06.png'));
  shipimg.push(loadImage('./Assets/Img/Paddle/paddle_10.png'));

}

function setup() {
  noSmooth();
  pixelDensity(1);

  if (windowWidth < windowHeight && deviceOrientation == PORTRAIT) {
    //mobile potrait
    createCanvas(windowWidth, windowHeight * 0.8);
    scl = width / 1080;
    isPC = false;


  } else if (windowWidth < windowHeight && deviceOrientation == LANDSCAPE) {
    //mobile LANDSCAPE
    createCanvas(windowWidth, windowHeight);
    // scl = height/ 1080;
    scl = height / 1080 / 1.3;
    isPC = true;

  } else {
    //pc
    createCanvas(windowWidth, windowHeight);
    // scl = height/ 1080;
    scl = height / 1080 / 1.3;
    isPC = true;

  }
  sml = width > height ? height : width;

  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(LEFT, CENTER);
  strokeWeight(scl * sml * 7 / 1080);
  noFill();


  if (isPC) {
    textSize((height / 9) * scl);
    starmin = width / 40;
    starmax = width / 10;
  } else {
    textSize((height / 32) * scl);
    starmin = height / 47;
    starmax = height / 12;
  }

  bgbody = select('#body');

  setbuttons();
  ship = new Ship();
  bullet = new Bullet();

  shufflegame();
  noLoop();

}

function setbuttons() {
  playpausebtn = createButton('PLAY');
  restartbtn = createButton('RESTART');

  playpausebtn.mousePressed(toggle);
  restartbtn.mousePressed(shufflegame);
  let div = createDiv();
  div.child(playpausebtn);
  div.child(restartbtn);

  if (isPC) {
    playpausebtn.html('\u23f5');
    restartbtn.html('\u21ba');

    playpausebtn.style('width:4vw; height:4vw;margin:10px auto;display: block;padding: 0.25em 0.25em;text-decoration: none;color: #FFF;background: #03A9F480;border-radius: 100%;font-weight: bold;font-size:2vw;border:none;outline: inherit;');

    restartbtn.style('width:4vw; height:4vw;margin:10px auto;display: block;padding: 0.25em 0.25em;text-decoration: none;color: #FFF;background: #03A9F480;border-radius: 100%;font-weight: bold;font-size:2vw;border:none;outline: inherit;');


    div.style('position:fixed;margin:auto;top:2.5%;right:2.5%;');

    //  playpausebtn.size(480*scl,120*scl);
    // restartbtn.size(480*scl,120*scl);



  } else {
    playpausebtn.style('width:45%; height:20%;margin:auto;display: inline-block;padding: 0.25em 0.5em;text-decoration: none;color: #FFF;background: #03A9F480;border-radius: 15px;font-weight: bold;font-size:4em;outline: inherit;');

    restartbtn.style('width:45%; height:20%;margin:auto;display: inline-block;padding: 0.25em 0.5em;text-decoration: none;color: #FFF;background: #03A9F480;border-radius: 15px;font-weight: bold;font-size:4em;outline: inherit;');


    div.style('width:100%;margin:auto;display:flex');

    playpausebtn.size(480 * scl, 120 * scl);
    restartbtn.size(480 * scl, 120 * scl);

  }

}

function toggle() {

  if (isPlaying) {

    noLoop();
    isPlaying = false;
    if (isPC) {
      playpausebtn.html('\u23f5');

    } else {
      playpausebtn.html('PLAY');

    }
  } else {
    loop();
    isPlaying = true;
    if (isPC) {
      playpausebtn.html('\u23f8');

    } else {
      playpausebtn.html('PAUSE');

    }

  }
}

function shufflegame() {


  let i = floor(random(11));
  switch (i) {
    case 0:
      bgbody.style("  background-image: url('./Assets/background/backgroundColorFall.png')");
      break;
    case 1:
      bgbody.style("  background-image: url('./Assets/background/backgroundCastles.png')");
      break;
    case 2:
      bgbody.style("  background-image: url('./Assets/background/backgroundColorDesert.png')");
      break;
    case 3:
      bgbody.style("  background-image: url('./Assets/background/backgroundColorForest.png')");
      break;
    case 4:
      bgbody.style("  background-image: url('./Assets/background/backgroundColorGrass.png')");
      break;
    case 5:
      bgbody.style("  background-image: url('./Assets/background/blue_grass.png')");
      break;
    case 6:
      bgbody.style("  background-image: url('./Assets/background/colored_desert.png')");
      break;
    case 7:
      bgbody.style("  background-image: url('./Assets/background/colored_grass.png')");
      break;
    case 8:
      bgbody.style("  background-image: url('./Assets/background/colored_land.png')");
      break;
    case 9:
      bgbody.style("  background-image: url('./Assets/background/bg.png')");
      break;
    case 10:
      bgbody.style("  background-image: url('./Assets/background/backgroundForest.png')");
      break;
  }
  shuffle(shipimg, true);
  shuffle(bulletimg, true);
  restart();


}

function gameovershow() {
  push();
  fill(0);
  rect(width / 2, height / 3, 700 * scl, 200 * scl, 20 * scl);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(70 * scl);
  text("GAME OVER", width / 2, height / 3);
  pop();

}

function restart() {
  ship.pos.x = width / 2;

  bullet.pos.x = width / 2;
  bullet.pos.y = height / 2;
  stars.splice(0, 10);
  for (let i = 0; i < 10; i++) {

    stars.push(new Star(random(starmin * scl, starmax * scl)));

  }
  bullet.score = 0;
  bullet.diamond = 0;
  bullet.life = 3;
  bullet.vel = createVector(random() + 0.3, 0.5 + random());
  bullet.vel.normalize();
  bullet.vel.mult(sml / 100);
  starttrack.play();
  //redraw();



}

function windowResized() {

  if (windowWidth < windowHeight && deviceOrientation == PORTRAIT) {
    //mobile potrait
    resizeCanvas(windowWidth, windowHeight * 0.8);
    scl = width / 1080;
    isPC = false;


  } else if (windowWidth < windowHeight && deviceOrientation == LANDSCAPE) {
    //mobile LANDSCAPE
    resizeCanvas(windowWidth, windowHeight);
    // scl = height/ 1080;
    scl = height / 1080 / 1.3;
    isPC = true;

  } else {
    //pc
    resizeCanvas(windowWidth, windowHeight);
    // scl = height/ 1080;
    scl = height / 1080 / 1.3;
    isPC = true;

  }
}


function keyPressed() {
  if (keyCode === 32) {
    toggle();
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

  // prevent default
  return false;
}

function draw() {
  clear();
  //background(200,100);


  push();
  noStroke();
  fill(0);
  image(pointimg, sml * 0.05, sml * 0.05, sml * 0.05, sml * 0.05); //65 * scl, 65 * scl);  
  text(floor(bullet.score), sml * 0.1, sml * 0.05);
  image(spepointimg, sml * 0.05, sml * 0.115, sml * 0.05, sml * 0.040);
  text(bullet.diamond, sml * 0.1, sml * 0.115);


  if (isPC) {
    for (let i = -1; i < bullet.life - 1; i++) {
      image(healthimg, width * 0.5 - 100 * scl * i, sml * 0.05, 70 * scl, 70 * scl);
    }

    for (let i = bullet.life - 1; i < 3 - 1; i++) {
      image(nonhealthimg, width * 0.5 - 100 * scl * i, sml * 0.05, 70 * scl, 70 * scl);
    }


  } else {
    for (let i = -1; i < bullet.life - 1; i++) {
      image(healthimg, sml * 0.85 - 100 * scl * i, sml * 0.05, 70 * scl, 70 * scl);
    }

    for (let i = bullet.life - 1; i < 3 - 1; i++) {
      image(nonhealthimg, sml * 0.85 - 100 * scl * i, sml * 0.05, 70 * scl, 70 * scl);
    }
  }
  pop();




  ship.update();
  ship.render();


  bullet.hits(ship);

  bullet.render();
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].render();
    if (bullet.hitstar(stars[i])) {
      bullet.vel.mult(1.005);

      if (stars[i].r > starmax * scl / 2) {
        gems.push(new Gem(stars[i].pos.x, stars[i].pos.y));
        //     stars.push(new Star(stars[i].r / 2));
        stars.push(new Star(stars[i].r / 2));
      } else {
        stars.push(new Star(random(starmin * scl, starmax * scl)));
      }
      stars.splice(i, 1);

    }
  }

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
  bullet.update();


  if (n) {
    n--;
    push();
    noStroke();
    fill(0, 250);
    if (isPC) {
      rect(width / 2, height / 3, 450 * width / 1080, 250 * height / 1080, 20 * scl);
    } else {
      rect(width / 2, height / 3, 750 * sml * scl / 1080, 350 * sml * scl / 1080, 20 * scl);
    }
    fill(240);
    textAlign(CENTER, CENTER);
    textSize(75 * scl);
    text("MATERIAL SOUL", width / 2, height / 3.15);
    textAlign(LEFT, CENTER);
    textSize(30 * scl);
    text("By Amish Ranpariya", width / 2, height / 2.75);
    pop();
  }

}
