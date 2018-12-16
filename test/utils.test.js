import { expect } from 'chai';
import { spy } from 'sinon';
import * as Utils from '../src/utils';
import { PI } from '../src/constants';


describe('colorAsInt() Unit Tests', () => {
 it('Parses the correct color given a Hexidecimal color code', (done) => {
     expect(Utils.colorAsInt('#f21117')).to.be.a('number').that.equals(15864087);
     expect(Utils.colorAsInt('#f26f0f')).to.be.a('number').that.equals(15888143);
     expect(Utils.colorAsInt('#f2ea10')).to.be.a('number').that.equals(15919632);
     expect(Utils.colorAsInt('#00ff00')).to.be.a('number').that.equals(65280);
     expect(Utils.colorAsInt('#1c2ef2')).to.be.a('number').that.equals(1847026);
     expect(Utils.colorAsInt('#ab59f2')).to.be.a('number').that.equals(11229682);
     expect(Utils.colorAsInt('#ffffff')).to.be.a('number').that.equals(16777215);
     done();
 });

 it('Returns 0 for undefined input', (done) => {
     expect(Utils.colorAsInt()).to.be.a('number').that.equals(0);
     done();
 });
});


describe('compute() Unit Tests', () => {
   const props = {
       data: {
           sideLength: 150,
           numPanels: 2,
           positionData: [
               {
                   panelId: 107,
                   x: -74,
                   y: 43,
                   o: 180
               },
               {
                   panelId: 114,
                   x: -149,
                   y: 0,
                   o: 360
               }
           ]
       }
   };

  it('Computes the maxX property of the equilateral triangle', (done) => {
    expect(Utils.compute(props)).to.be.an('object').that.has.property('maxX').that.equals(150);
    done();
  });

  it('Computes the minX property of the equilateral triangle', (done) => {
      expect(Utils.compute(props)).to.be.an('object').that.has.property('minX').that.equals(-299);
      done();
  });

  it('Computes the minY property of the equilateral triangle', (done) => {
    expect(Utils.compute(props)).to.be.an('object').that.has.property('minY').that.equals(-150);
    done();
  });

   it('Computes the maxY property of the equilateral triangle', (done) => {
       expect(Utils.compute(props)).to.be.an('object').that.has.property('maxY').that.equals(193);
       done();
   });

   it('Computes the width property of the equilateral triangle', (done) => {
       expect(Utils.compute(props)).to.be.an('object').that.has.property('width').that.equals(449);
       done();
   });

   it('Computes the height property of the equilateral triangle', (done) => {
       expect(Utils.compute(props)).to.be.an('object').that.has.property('height').that.equals(343);
       done();
   });
});

describe('equilateral() Unit Tests', () => {
  it('Verifies PI Constant', (done) => {
    expect(PI).to.be.a('number').that.equals(3.141592653589793);
    done();
  });

  it('Correctly computes the top vertex of an equilateral triangle', (done) => {
      expect(Utils.equilateral(150, [0, 0])).to.be
          .an('object')
          .that.has.property('topVertex')
          .to.have.members([0, -86.60254037844386]);
      done();
  });

   it('Correctly computes the left vertex of an equilateral triangle', (done) => {
       expect(Utils.equilateral(150, [0, 0])).to.be
           .an('object')
           .that.has.property('leftVertex')
           .to.have.members([-75, 43.301270189221945]);
       done();
   });

   it('Correctly computes the right vertex of an equilateral triangle', (done) => {
       expect(Utils.equilateral(150, [0, 0])).to.be
           .an('object')
           .that.has.property('rightVertex')
           .to.have.members([75, 43.301270189221945]);
       done();
   });
});

describe('draw() Unit Tests', () => {
   const props = {
       data: {
           sideLength: 150,
           numPanels: 2,
           positionData: [
               {
                   panelId: 107,
                   x: -74,
                   y: 43,
                   o: 180,
                   color: '#00ff00',
                   strokeColor: '#ff6caf'
               },
               {
                   panelId: 114,
                   x: -149,
                   y: 0,
                   o: 360,
                   color: '#00ff00',
                   strokeColor: '#ff6caf'
               }
           ]
       }
   };

  it('Correctly Computes the SVG Path', (done) => {
    expect(Utils.draw(props.data.positionData, props.data.sideLength, () => {})[0])
        .to.be.an('object')
        .that.has.property('path')
        .that.equals('M0 -86.60254037844386 L-75 43.301270189221945 L75 43.301270189221945 L0 -86.60254037844386 Z');

      expect(Utils.draw(props.data.positionData, props.data.sideLength, () => {})[1])
          .to.be.an('object')
          .that.has.property('path')
          .that.equals('M0 -86.60254037844386 L-75 43.301270189221945 L75 43.301270189221945 L0 -86.60254037844386 Z');
      done();
  });

  it('draw() calls the onDraw() callback function', (done) => {
      const callback = spy(Utils, 'draw');
      Utils.draw([], 150, callback);

      expect(callback.called).to.be.a('boolean').that.equals(true);
      expect(callback.callCount).to.be.a('number').that.equals(1);
      done();
  });
});
