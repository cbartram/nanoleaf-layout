const Utils = require('../lib/utils'); //tests the transpiled lib folder
const UtilsSrc = require('../src/utils'); //Tests the src folder utils


test('do rotate returns true', () => {
    expect(Utils.doRotate(120)).toBe(false);
    expect(UtilsSrc.doRotate(120)).toBe(false);
});

test('centroid height is constant', () => {
   expect(Utils.getCentroidHeight()).toBe(Math.sqrt(3) / 6 * 150);
   expect(UtilsSrc.doRotate(120)).toBe(false);
});

test('cartesian to screen is accurate', () => {
    expect(Utils.cartesianToScreen(100, 100, 1000, 1000)).toContain(600);
    expect(Utils.cartesianToScreen(100, 100, 1000, 1000)).toContain(400);

    expect(UtilsSrc.cartesianToScreen(100, 100, 1000, 1000)).toContain(600);
    expect(UtilsSrc.cartesianToScreen(100, 100, 1000, 1000)).toContain(400);
});

test('top point is accurate', () => {
   expect(Utils.getTopFromCentroid(100, 100, 1000, 1000)).toContain(600);
   expect(Utils.getTopFromCentroid(100, 100, 1000, 1000)).toContain(357);

    expect(UtilsSrc.getTopFromCentroid(100, 100, 1000, 1000)).toContain(600);
    expect(UtilsSrc.getTopFromCentroid(100, 100, 1000, 1000)).toContain(357);
});

test('left point is accurate', () => {
    expect(Utils.getLeftFromCentroid(100, 100, 1000, 1000)).toContain(557);
    expect(Utils.getLeftFromCentroid(100, 100, 1000, 1000)).toContain(443);

    expect(UtilsSrc.getLeftFromCentroid(100, 100, 1000, 1000)).toContain(557);
    expect(UtilsSrc.getLeftFromCentroid(100, 100, 1000, 1000)).toContain(443);
});

test('right point is accurate', () => {
    expect(Utils.getRightFromCentroid(100, 100, 1000, 1000)).toContain(643);
    expect(Utils.getRightFromCentroid(100, 100, 1000, 1000)).toContain(443);

    expect(UtilsSrc.getRightFromCentroid(100, 100, 1000, 1000)).toContain(643);
    expect(UtilsSrc.getRightFromCentroid(100, 100, 1000, 1000)).toContain(443);
});

test('top rotated point is accurate', () => {
    expect(Utils.rotateTopFromCentroid(100, 100, 1000, 1000)).toContain(600);
    expect(Utils.rotateTopFromCentroid(100, 100, 1000, 1000)).toContain(473);

    expect(UtilsSrc.rotateTopFromCentroid(100, 100, 1000, 1000)).toContain(600);
    expect(UtilsSrc.rotateTopFromCentroid(100, 100, 1000, 1000)).toContain(473);
});

test('right rotated point is accurate', () => {
    expect(Utils.rotateRightFromCentroid(100, 100, 1000, 1000)).toContain(643);
    expect(Utils.rotateRightFromCentroid(100, 100, 1000, 1000)).toContain(387);

    expect(UtilsSrc.rotateRightFromCentroid(100, 100, 1000, 1000)).toContain(643);
    expect(UtilsSrc.rotateRightFromCentroid(100, 100, 1000, 1000)).toContain(387);
});

test('left rotated point is accurate', () => {
    expect(Utils.rotateLeftFromCentroid(100, 100, 1000, 1000)).toContain(557);
    expect(Utils.rotateLeftFromCentroid(100, 100, 1000, 1000)).toContain(387);

    expect(UtilsSrc.rotateLeftFromCentroid(100, 100, 1000, 1000)).toContain(557);
    expect(UtilsSrc.rotateLeftFromCentroid(100, 100, 1000, 1000)).toContain(387);
});