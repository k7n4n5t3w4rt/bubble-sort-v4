// @flow

export default (
  state /*: {} */,
  action /*: { type: string, payload: Object } */,
) /*: {} */ => {
  switch (action.type) {
    case "CHANGE_COLS":
      return {
        ...state,
        cols: action.payload,
      };

    default:
      return { ...state };
  }
};
