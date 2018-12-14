/**
 * Utils.js File Unit Tests
 * @author Christian bartram
 * @github cbartram
 */
const { expect } = require('chai');
const {
    rotateLeftFromCentroid,
    rotateTopFromCentroid,
    rotateRightFromCentroid,
    getLeftFromCentroid,
    getTopFromCentroid,
    getRightFromCentroid,
    doRotate,
    cartesianToScreen,
} = require('../src/utils');

describe('Util.js Unit Tests', () => {

    /**
     * doRotate() Function Tests
     */
    describe('doRotate() Unit Tests', () => {
        it('Returns false when rotation is 120 degrees', () => {
            expect(doRotate(120)).to.be.a('boolean').to.equal(false);
        });

        it('Returns true when rotation is X degrees', () => {

        });
    });

    /**
     * cartesianToScreen() function Tests
     */
    describe('cartesianToScreen() Unit Tests', () => {
        it('cartesianToScreen() returns the correct values', () => {
            expect(cartesianToScreen(100, 100, 1000, 1000)).to.be.a('array').to.have.members([600, 400]);
        });
    });

    /**
     * SVG Triangle Point Unit Tests
     */
    describe('SVG Triangle Point Unit Tests', () => {
        it('Asserts the top triangle point is accurate', () => {
            expect(getTopFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([600, 357]);
        });

        it('Asserts the left triangle point is accurate', () => {
            expect(getLeftFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([557, 443]);
        });

        it('Asserts the right triangle point is accurate', () => {
            expect(getRightFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([643, 443]);
        });
    });

    /**
     * SVG Triangle Rotation Unit Tests
     */
    describe('SVG Triangle Rotated Points Unit Tests', () => {
        it('Asserts the top rotated point is accurate', () => {
            expect(rotateTopFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([600, 473]);
        });

        it('Asserts the right rotated point is accurate', () => {
            expect(rotateRightFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([643, 387]);
        });

        it('Asserts the left rotated point is accurate', () => {
            expect(rotateLeftFromCentroid(100, 100, 1000, 1000)).to.be.a('array').to.have.members([557, 387]);
        });
    });
});
