// @flow
import anime from "../../../web_modules/animejs.js";

const move = (
  cubes /*: Cubes */,
  speed /*: number */,
  scale /*: number */,
  cols /*: number */,
  rows /*: number */,
  reticleStuff /*: ReticleStuff */,
) /*: Cubes */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/three-bubble-sort/actions/pixelGrid.js (Line 34)
  //
  let x1y1StartPos /*: Object */;
  let pos1 /*: number */;
  let pos2 /*: number */;
  let movingX1Y1 /*: boolean */ = true;
  let movingX2Y2 /*: boolean */ = true;
  let x1Y1 /*: Object */;
  let x2Y2 /*: Object */;

  let x1 = Math.floor(Math.random() * cols);
  let y1 = Math.floor(Math.random() * rows);
  let x2 = Math.floor(Math.random() * cols);
  let y2 = Math.floor(Math.random() * rows);
  x1Y1 = cubes.pixelGrid[x1][y1];
  x2Y2 = cubes.pixelGrid[x2][y2];

  console.log(`Trying [${x1}, ${y1}] and [${x2}, ${y2}]...`);

  if (cubes.moving === false && x1Y1.bubble_value > x2Y2.bubble_value) {
    console.log(`[${x1}, ${y1}] bubble value IS > [${x2}, ${y2}]...`);

    if (cubes.moving === false && x1Y1.pos > x2Y2.pos) {
      console.log(`[${x1}, ${y1}] pos IS > [${x2}, ${y2}]...`);
      console.log(`Preparing to swap [${x1}, ${y1}] and [${x2}, ${y2}]...`);

      x1y1StartPos = {
        x: x1Y1.position.x,
        y: x1Y1.position.y,
      };
      cubes.moving = true;

      // Move x1y1
      anime({
        targets: [x1Y1.position],
        z: [
          {
            value: x1Y1.position.z - 2 * scale,
            duration: (1000 * speed) / 2,
            delay: 0,
          },
          {
            value: x1Y1.position.z,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        x: [
          {
            value: x2Y2.position.x,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        y: [
          {
            value: x2Y2.position.y,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        delay: 500,
        easing: "easeInOutCirc",
        complete: function (anim) {
          //   completeLogEl.value = 'completed : ' + anim.completed;
          // Move x1y1
          movingX1Y1 = false;
          if (movingX2Y2 === false) {
            cubes.moving = false;
          }
          return cubes;
        },
      });
      anime({
        targets: [x2Y2.position],
        z: [
          {
            value: x2Y2.position.z + 2 * scale,
            duration: (1000 * speed) / 2,
            delay: 0,
          },
          {
            value: x2Y2.position.z,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        x: [{ value: x1y1StartPos.x, duration: 1000 * speed, delay: 0 }],
        y: [{ value: x1y1StartPos.y, duration: 1000 * speed, delay: 0 }],
        delay: 500,
        easing: "easeInOutCirc",
        complete: function (anim) {
          //   completeLogEl.value = 'completed : ' + anim.completed;
          pos1 = x1Y1.pos;
          pos2 = x2Y2.pos;
          x1Y1.pos = pos2;
          x2Y2.pos = pos1;
          movingX2Y2 = false;
          if (movingX1Y1 === false) {
            cubes.moving = false;
          }
          return cubes;
        },
      });
    } else {
      //   cubes = move(cubes, speed, cols, rows);
      //   return cubes;
    }
  } else {
    // cubes = move(cubes, speed, cols, rows);
    // return cubes;
  }
  // Never gets called but Flow wants it
  return cubes;
};

export default move;
