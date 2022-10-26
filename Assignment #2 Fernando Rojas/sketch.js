var inc = 0.01;
var scl = 40;
var cols, rows;

var zoff = 3;

var fr;

var particles = [];

var flowfield;

function setup() {
  let cnv = createCanvas(2000, 1400)
  cnv.position(0, 0);

  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 1500; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1000);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 10);
    }
    yoff += inc;

    zoff += .001;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

}
