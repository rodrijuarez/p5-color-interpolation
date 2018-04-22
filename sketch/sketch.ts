var sketch = (p: p5) => {
  p.preload = () => {};

  let tileCountX = 2;
  let tileCountY = 20;

  const colorsLeft = [];
  const colorsRight = [];
  let interpolateShortest = false;

  const shakeColors = () => {
    for (let i = 0; i < tileCountY; i++) {
      colorsLeft[i] = p.color(p.random(0, 60), p.random(0, 100), 100);
      colorsRight[i] = p.color(p.random(160, 190), 100, p.random(0, 100));
    }
  };

  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();
    shakeColors();
  };

  p.windowResized = () => {
    p.resizeCanvas(800, 800);
  };

  p.draw = () => {
    tileCountX = p.map(p.mouseX, 0, p.width, 2, 100);
    tileCountY = p.map(p.mouseY, 0, p.height, 2, 20);

    const tileWidth = p.width / tileCountX;
    const tileHeight = p.height / tileCountY;

    let interCol;
    const colors = [];
    let i = 0;

    for (let gridY = 0; gridY < tileCountY; gridY++) {
      const col1 = colorsLeft[gridY];
      const col2 = colorsRight[gridY];

      for (let gridX = 0; gridX < tileCountX; gridX++) {
        const amount = p.map(gridX, 0, tileCountX - 1, 0, 1);

        if (interpolateShortest) {
          // switch to rgb
          p.colorMode(p.RGB, 255, 255, 255, 255);
          interCol = p.lerpColor(col1, col2, amount);
          // switch back
          p.colorMode(p.HSB, 360, 100, 100, 100);
        } else {
          interCol = p.lerpColor(col1, col2, amount);
        }
        p.fill(interCol);

        const posX = tileWidth * gridX;
        const posY = tileHeight * gridY;
        p.rect(posX, posY, tileWidth, tileHeight);

        // just for ase export
        colors[i] = interCol;
        i++;
      }
    }
  };

  p.mouseReleased = () => {
    shakeColors();
  };

  p.keyReleased = () => {
    //if (p.key == 'c' || p.key == 'C')
    //p.GenerativeDesign.saveASE(this, colors, timestamp() + '.ase');
    //if (p.key == 's' || p.key == 'S') saveFrame(timestamp() + '_##.png');
    //if (p.key == 'p' || p.key == 'P') savePDF = true;
    console.log('key released');

    console.log(p.key);
    if (p.key == '1') interpolateShortest = true;
    if (p.key == '2') interpolateShortest = false;
  };
};

var sketchP = new p5(sketch);
