class Star {

  constructor(r) {

    this.pos = createVector(random(0.1, 0.9) * width, random(0.1, 0.8) * height);
    this.r = r;
    this.vel = random(-5, 5);
    colorMode(HSL, 360, 100, 100);
    // let colors = [
    //   color("#d0004e"),
    // // color("#fc840b"),
    //   color("#00b188"),
    //   color("#0055fb"),
    //   color("#ff784b"),
    //   // color("#facd23"),
    //   // color("#f0323c"),
    //   color("#d250f6"),
    //   color("#7854f7"),
    //   color("#ff7d7d"),
    //   color("#12a5ed"),
    //   color("#ffca00"),
    //   color("#7ed321"),
    //   color("#f5325b"),
    //   color("#ff8400"),
    //   color("#06c1ff")
    //   ];
    // let colors = [
    //       color("#e66bba"),
    //       color("#3b3086"),
    //       color("#ffc2c0"),
    //       color("#fae0db"),
    //       color("#7291f9")
    //       ];
    // let colors = [
    //           color("#d07499"),
    //           color("#f88999"),
    //           color("#b9c4e3"),
    //           color("#808fba")
    //           ];
    let colors = [
                color("#ffb997"),
                color("#f67e7d"),
                color("#843b62"),
                color("#0b032d"),
                color("#621940")
                  ];
    this.col = random(colors);

  }
  render() {

    push();
    fill(this.col);
    noStroke();
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