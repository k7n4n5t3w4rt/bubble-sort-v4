// @flow

const getItem /*: function */ = (
  itemName /*: string */,
) /*: string | null | typeof undefined */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // Always use localStorage
    return localStorage.getItem(itemName);
  } else {
    return "{}";
  }
};

const setItem /*: function */ = (
  itemName /*: string */,
  itemValue /*: Object */,
) /*: void */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    localStorage.setItem(itemName, itemValue);
  }
};

const clear /*: function */ = () /*: void */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    localStorage.clear();
  }
};
export default { getItem, setItem, clear };
