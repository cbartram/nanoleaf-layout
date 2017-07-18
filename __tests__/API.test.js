/**
 * Created by Christian Bartram on 7/13/17.
 *
 * Github @cbartram
 */

const layout = require("../es/api/layout");
const Utils = require("../es/utils");

test("layout returns an object", () => {
  let object = {
    topPoint: [600, 473],
    leftPoint: [557, 387],
    rightPoint: [643, 387],
    centroid: [600, 400],
    rotated: true,
    color: "#FFFFFF",
    strokeColor: "#FFFFFF",
    path: "M600 473 L557 387 L643 387 L600 473 Z",
    id: 1,
    panelID: {
      id: 1,
      x: 597,
      y: 415
    }
  };

  expect(layout.draw(100, 100, 60, "#FFFFFF", "#FFFFFF", 1, 1000, 1000)).toMatchObject(object);
});
