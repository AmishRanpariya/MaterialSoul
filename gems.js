class Gem {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2);
    this.acc = createVector(0, 0.5);

  }
  update() {

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.render();

  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    image(diamond_img, 0, 0, 35, 30);
    pop();
  }

  hit(ship) {
    if (this.pos.y + 15 > ship.pos.y - ship.h / 2 && abs(this.pos.x - ship.pos.x) < ship.w ) {
      return true;
    }
    return false;
  }

}