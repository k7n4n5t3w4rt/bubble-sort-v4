// @flow

export default (
  cube1 /*: Cube */,
  cube2 /*: Cube */,
  speed /*: number */,
  scaleZ /*: number */,
  movingCube1 /*: boolean */,
  movingCube2 /*: boolean */,
  cubes /*: Cubes */,
  nextIndex /*: number */,
  currentIndex /*: number */,
  cube1StartPos /*: {y: number,z: number,} */,
) /*: Object */ => {
  return {
    targets: [cube2.position],
    x: [
      {
        value: cube2.position.x + 2 * scaleZ,
        duration: (1000 * speed) / 2,
        delay: 0,
      },
      {
        value: cube2.position.x,
        duration: 1000 * speed,
        delay: 0,
      },
    ],
    z: [{ value: cube1StartPos.z, duration: 1000 * speed, delay: 0 }],
    y: [{ value: cube1StartPos.y, duration: 1000 * speed, delay: 0 }],
    delay: 500,
    easing: "cubicBezier(.5, .05, .1, .3)",
    complete: (anim) /*: Cubes | void */ => {
      //   completeLogEl.value = 'completed : ' + anim.completed;
      movingCube2 = false;
      if (movingCube1 === false) {
        cubes.moving = false;
        cubes.currentIndex = nextIndex;
        cubes.pixelGrid[currentIndex] = cube2;
        cubes.pixelGrid[nextIndex] = cube1;
        return cubes;
      }
    },
  };
};
