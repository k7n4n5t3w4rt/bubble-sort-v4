// @flow
import { test, testPromise, should } from "../server/testy.js";
import coordinates from "../js/three-bubble-sort/calculations/coordinates.js";

test("Coordinates | For 2x2, returns {z: 0, y: 0} based on the pos 0", () /*: void */ => {
  const pos = 0;
  const cols = 2;
  const rows = 2;
  const expectedCoordinates = { z: 0, y: 0 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 2x2, returns {z: 1, y: 0} based on the pos 1", () /*: void */ => {
  const pos = 1;
  const cols = 2;
  const rows = 2;
  const expectedCoordinates = { z: 1, y: 0 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 2x2, returns {z: 0, y: 1} based on the pos 2", () /*: void */ => {
  const pos = 2;
  const cols = 2;
  const rows = 2;
  const expectedCoordinates = { z: 0, y: 1 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 2x2, returns {z: 1, y: 1} based on the pos 3", () /*: void */ => {
  const pos = 3;
  const cols = 2;
  const rows = 2;
  const expectedCoordinates = { z: 1, y: 1 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 3x3, returns {z: 0, y: 1} based on the pos 3", () /*: void */ => {
  const pos = 3;
  const cols = 3;
  const rows = 3;
  const expectedCoordinates = { z: 0, y: 1 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 3x3, returns {z: 2, y: 1} based on the pos 5", () /*: void */ => {
  const pos = 5;
  const cols = 3;
  const rows = 3;
  const expectedCoordinates = { z: 2, y: 1 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});

test("Coordinates | For 4x5, returns {z: 2, y: 2} based on the pos 13", () /*: void */ => {
  const pos = 12;
  const cols = 5;
  const rows = 4;
  const expectedCoordinates = { z: 2, y: 2 };

  should(JSON.stringify(coordinates(pos, cols, rows))).be.exactly(
    JSON.stringify(expectedCoordinates),
  );
});
