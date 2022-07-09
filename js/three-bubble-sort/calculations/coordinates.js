// @flow

export default (
  pos /*: number */,
  cols /*: number */,
  rows /*: number */,
) /*: {z: number, y: number, } */ => {
  const z = pos % cols;
  const y = Math.floor(pos / cols);
  return { z, y };
};
