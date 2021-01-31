class Bullet {

  constructor() {
    this.r = 20;
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random() + 0.3, random() + 0.5);
    this.vel.normalize();

    this.vel.mult(sml / 100);


    this.life = 3;
    this.score = 0;
    this.diamond = 0;
  }
  update() {
    if (this.pos.y > height) {
      this.gameover();
      return;
    }
    if (this.pos.x > width - this.r) {
      this.vel.x = -abs(this.vel.x);
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

    } else if (this.pos.x < this.r) {
      this.vel.x = abs(this.vel.x);
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

    } else if (this.pos.y < this.r) {
      this.vel.y = abs(this.vel.y);
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

    } else {
      this.pos.x += this.vel.x;

      this.pos.y += this.vel.y;

    }
  }
  render() {
    colorMode(RGB);
    fill(col);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  hits(ship) {

    if (ship.pos.y - ship.h / 2 < this.pos.y + this.r && this.pos.x < ship.pos.x + ship.w / 2 && this.pos.x > ship.pos.x - ship.w / 2 && this.pos.y < ship.pos.y) {

      snap.play();
      this.vel.y = -abs(this.vel.y);
      this.pos.y += this.vel.y;

    }

  }
  hitstar(star) {
    if (dist(this.pos.x, this.pos.y, star.pos.x, star.pos.y) <= this.r + star.r) {


      if (abs(this.pos.y - star.pos.y) < this.r + this.r) {
        //      this.vel.y *= -1;
        this.vel.x *= -1;
      } else {

        this.vel.y *= -1;
      }
      this.score += floor(star.r/5);
      pling.play();
      return true;

    } else
      return false;
  }
  gameover() {
    this.life--;
    losetrack.play();
    if (this.life > 0) {
      this.pos = createVector(width / 2, height / 2);

    } else {
      gameovershow();
      // restart();
      toggle();
      //game is over 
    }

  }









}