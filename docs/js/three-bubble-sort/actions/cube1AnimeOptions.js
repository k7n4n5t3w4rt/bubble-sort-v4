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
) /*: Object */ => {
  return {
    targets: [cube1.position],
    x: [
      {
        value: cube1.position.x - 2 * scaleZ,
        duration: (1000 * speed) / 2,
        delay: 0,
      },
      {
        value: cube1.position.x,
        duration: 1000 * speed,
        delay: 0,
      },
    ],
    z: [
      {
        value: cube2.position.z,
        duration: 1000 * speed,
        delay: 0,
      },
    ],
    y: [
      {
        value: cube2.position.y,
        duration: 1000 * speed,
        delay: 0,
      },
    ],
    delay: 500,
    easing: "easeInOutCirc",
    complete: (anim /*: any */) /*: Cubes | void */ => {
      // Move cube1
      movingCube1 = false;
      if (movingCube2 === false) {
        cubes.moving = false;
        cubes.currentIndex = nextIndex;
        cubes.pixelGrid[currentIndex] = cube2;
        cubes.pixelGrid[nextIndex] = cube1;
        return cubes;
      }
    },
  };
};
