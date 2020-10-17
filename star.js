class Star {

  constructor(r) {

    this.pos = createVector(random(0.1, 0.9) * width, random(0.1, 0.8) * height);
    this.r = r;
    this.vel = random(-5, 5);
    let colors = [color(255, 0, 255, 100),
      color(0, 255, 255, 100),
      color(255, 255, 0, 100),
      color(0, 255, 0, 100)
    ];
    this.col = random(colors);

  }
  render() {

    push();
    fill(this.col);
    translate(this.pos.x, this.pos.y);
    rotate((this.vel * frameCount) % 360);
    beginShape();
    for (let i = 0; i < 360; i += 360 / 6) {

      let x = this.r * cos(i);
      let y = this.r * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }


}