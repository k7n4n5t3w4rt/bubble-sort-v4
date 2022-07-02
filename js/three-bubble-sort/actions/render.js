// @flow

export default (
  scene /*: Object */,
  camera /*: Object */,
  renderer /*: Object */,
) /*: function */ => {
  return () /*: void */ => {
    renderer.render(scene, camera);
  };
};
