// @flow
import anime from "../../../web_modules/animejs.js";

const move = (
  cubes /*: Cubes */,
  speed /*: number */,
  cols /*: number */,
  rows /*: number */,
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
  let x1 = Math.floor(Math.random() * cols);
  let y1 = Math.floor(Math.random() * rows);
  let x2 = Math.floor(Math.random() * cols);
  let y2 = Math.floor(Math.random() * rows);

  console.log(`Trying [${x1}, ${y1}] and [${x2}, ${y2}]...`);
  if (
    cubes.moving === false &&
    cubes.pixelGrid[x1][y1].bubble_value > cubes.pixelGrid[x2][y2].bubble_value
  ) {
    console.log(`[${x1}, ${y1}] bubble value IS > [${x2}, ${y2}]...`);

    let x1y1StartPos /*: Object */;
    let pos1 /*: number */;
    let pos2 /*: number */;
    let movingX1Y1 /*: boolean */ = true;
    let movingX2Y2 /*: boolean */ = true;

    if (
      cubes.moving === false &&
      cubes.pixelGrid[x1][y1].pos > cubes.pixelGrid[x2][y2].pos
    ) {
      console.log(`[${x1}, ${y1}] pos IS > [${x2}, ${y2}]...`);
      console.log(`Preparing to swap [${x1}, ${y1}] and [${x2}, ${y2}]...`);
      // x1y1StartPos = cubes.pixelGrid[x1][y1].position;
      x1y1StartPos = {
        x: cubes.pixelGrid[x1][y1].position.x,
        y: cubes.pixelGrid[x1][y1].position.y,
      };
      cubes.moving = true;
      // Move x1y1
      anime({
        targets: [cubes.pixelGrid[x1][y1].position],
        z: [
          { value: -0.2, duration: (1000 * speed) / 2, delay: 0 },
          {
            value: 0,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        x: [
          {
            value: cubes.pixelGrid[x2][y2].position.x,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        y: [
          {
            value: cubes.pixelGrid[x2][y2].position.y,
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
        targets: [cubes.pixelGrid[x2][y2].position],
        z: [
          { value: 0.2, duration: (1000 * speed) / 2, delay: 0 },
          {
            value: 0,
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
          pos1 = cubes.pixelGrid[x1][y1].pos;
          pos2 = cubes.pixelGrid[x2][y2].pos;
          cubes.pixelGrid[x1][y1].pos = pos2;
          cubes.pixelGrid[x2][y2].pos = pos1;
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
