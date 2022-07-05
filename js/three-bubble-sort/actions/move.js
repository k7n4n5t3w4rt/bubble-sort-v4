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
  let z1y1StartPos /*: Object */;
  let pos1 /*: number */;
  let pos2 /*: number */;
  let movingZ1Y1 /*: boolean */ = true;
  let movingZ2Y2 /*: boolean */ = true;
  let z1Y1 /*: Object */;
  let z2Y2 /*: Object */;

  let z1 = Math.floor(Math.random() * cols);
  let y1 = Math.floor(Math.random() * rows);
  let z2 = Math.floor(Math.random() * cols);
  let y2 = Math.floor(Math.random() * rows);
  z1Y1 = cubes.pixelGrid[z1][y1];
  z2Y2 = cubes.pixelGrid[z2][y2];

  console.log(`Trying [${z1}, ${y1}] and [${z2}, ${y2}]...`);

  if (cubes.moving === false && z1Y1.bubble_value > z2Y2.bubble_value) {
    console.log(`[${z1}, ${y1}] bubble value IS > [${z2}, ${y2}]...`);

    if (cubes.moving === false && z1Y1.pos > z2Y2.pos) {
      console.log(`[${z1}, ${y1}] pos IS > [${z2}, ${y2}]...`);
      console.log(`Preparing to swap [${z1}, ${y1}] and [${z2}, ${y2}]...`);

      z1y1StartPos = {
        z: z1Y1.position.z,
        y: z1Y1.position.y,
      };
      cubes.moving = true;

      // Move z1y1
      anime({
        targets: [z1Y1.position],
        x: [
          {
            value: z1Y1.position.x - 2 * scale,
            duration: (1000 * speed) / 2,
            delay: 0,
          },
          {
            value: z1Y1.position.x,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        z: [
          {
            value: z2Y2.position.z,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        y: [
          {
            value: z2Y2.position.y,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        delay: 500,
        easing: "easeInOutCirc",
        complete: function (anim) {
          //   completeLogEl.value = 'completed : ' + anim.completed;
          // Move z1y1
          movingZ1Y1 = false;
          if (movingZ2Y2 === false) {
            cubes.moving = false;
          }
          return cubes;
        },
      });
      anime({
        targets: [z2Y2.position],
        x: [
          {
            value: z2Y2.position.x + 2 * scale,
            duration: (1000 * speed) / 2,
            delay: 0,
          },
          {
            value: z2Y2.position.x,
            duration: 1000 * speed,
            delay: 0,
          },
        ],
        z: [{ value: z1y1StartPos.z, duration: 1000 * speed, delay: 0 }],
        y: [{ value: z1y1StartPos.y, duration: 1000 * speed, delay: 0 }],
        delay: 500,
        easing: "easeInOutCirc",
        complete: function (anim) {
          //   completeLogEl.value = 'completed : ' + anim.completed;
          pos1 = z1Y1.pos;
          pos2 = z2Y2.pos;
          z1Y1.pos = pos2;
          z2Y2.pos = pos1;
          movingZ2Y2 = false;
          if (movingZ1Y1 === false) {
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
