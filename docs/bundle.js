require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"nanoleaf-layout":[function(require,module,exports){
/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;

var NanoleafLayout = (function (_Component) {
	_inherits(NanoleafLayout, _Component);

	function NanoleafLayout() {
		_classCallCheck(this, NanoleafLayout);

		_get(Object.getPrototypeOf(NanoleafLayout.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(NanoleafLayout, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			var canvas = document.querySelector('#canvas');
			var ctx = canvas.getContext('2d');

			ctx.translate(ctx.width / 2, ctx.height / 2);
			ctx.scale(1, 1);

			if (!this.props.data.hasOwnProperty('positionData')) {
				throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
			}

			this.props.data.positionData.map(function (value) {
				_this.props.onDraw(_this.draw(ctx, value.x / _this.props.panelSpacing + _this.props.xOffset, value.y / _this.props.panelSpacing + _this.props.yOffset, value.o, value.color));
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			var canvas = document.querySelector('#canvas');
			var ctx = canvas.getContext('2d');

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.translate(ctx.width / 2, ctx.height / 2);
			ctx.scale(1, 1);

			if (!this.props.data.hasOwnProperty('positionData')) {
				throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
			}

			this.props.data.positionData.map(function (value) {
				_this2.props.onDraw(_this2.draw(ctx, value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color));
			});
		}
	}, {
		key: 'draw',

		/**
   * Draws an Equilateral Triangle on the Canvas
   * @param ctx client context
   * @param x integer Cartesian X coordinate
   * @param y integer Cartesian Y coordinate
   * @param o integer Orientation in degrees
   * @param color hexadecimal color code Triangle Color i.e. #FF00FF
   */
		value: function draw(ctx, x, y, o, color) {

			var orient = false;

			var topPoint = this.getTopFromCentroid(ctx, x, y);
			var leftPoint = this.getLeftFromCentroid(ctx, x, y);
			var rightPoint = this.getRightFromCentroid(ctx, x, y);

			var topRotatedPoint = this.rotateTopFromCentroid(ctx, x, y);
			var leftRotatedPoint = this.rotateLeftFromCentroid(ctx, x, y);
			var rightRotatedPoint = this.rotateRightFromCentroid(ctx, x, y);

			ctx.strokeStyle = this.props.strokeColor;
			ctx.fillStyle = color;
			ctx.save();

			ctx.beginPath();

			if (this.doRotate(o)) {

				ctx.moveTo(topRotatedPoint[0], topRotatedPoint[1]);
				ctx.lineTo(leftRotatedPoint[0], leftRotatedPoint[1]);
				ctx.lineTo(rightRotatedPoint[0], rightRotatedPoint[1]);
				ctx.lineTo(topRotatedPoint[0], topRotatedPoint[1]);

				orient = true;
			} else {

				ctx.moveTo(topPoint[0], topPoint[1]);
				ctx.lineTo(rightPoint[0], rightPoint[1]);
				ctx.lineTo(leftPoint[0], leftPoint[1]);
				ctx.lineTo(topPoint[0], topPoint[1]);
			}

			ctx.fill();
			ctx.stroke();

			ctx.closePath();
			ctx.save();

			if (orient) {
				return [topRotatedPoint, leftRotatedPoint, rightRotatedPoint];
			} else {
				return [topPoint, leftPoint, rightPoint];
			}
		}
	}, {
		key: 'cartesianToScreen',

		/**
   * Maps a cartesian point to a 2D HTML Canvas point
   * @param ctx Client Context for the width and height
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
   */
		value: function cartesianToScreen(ctx, cx, cy) {
			var screenX = cx + ctx.canvas.width / 2;
			var screenY = ctx.canvas.height / 2 - cy;

			return [screenX, screenY];
		}
	}, {
		key: 'doRotate',

		/**
   * Determines if the given triangle should be rotated
   * @param rotation integer rotation in degrees
   * @returns {boolean} true if the rotation should occur false otherwise
   */
		value: function doRotate(rotation) {
			return rotation / 60 % 2 !== 0;
		}
	}, {
		key: 'getTopFromCentroid',

		/**
   * Calculates the top most point of the equilateral triangle given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getTopFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0], screen[1] - CENTROID_HEIGHT];
		}
	}, {
		key: 'getLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getLeftFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0] - CENTROID_HEIGHT, screen[1] + CENTROID_HEIGHT];
		}
	}, {
		key: 'getRightFromCentroid',

		/**
   * Calculates the right most point of the equilateral triangle given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getRightFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0] + CENTROID_HEIGHT, screen[1] + CENTROID_HEIGHT];
		}
	}, {
		key: 'rotateLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateLeftFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0] - CENTROID_HEIGHT, screen[1] - CENTROID_HEIGHT + 30]; //30 is for spacing
		}
	}, {
		key: 'rotateRightFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateRightFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0] + CENTROID_HEIGHT, screen[1] - CENTROID_HEIGHT + 30];
		}
	}, {
		key: 'rotateTopFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param ctx client context
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateTopFromCentroid(ctx, cx, cy) {
			var screen = this.cartesianToScreen(ctx, cx, cy);

			return [screen[0], screen[1] + CENTROID_HEIGHT + 30];
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement('canvas', { id: 'canvas', width: this.props.canvasWidth, height: this.props.canvasHeight })
			);
		}
	}], [{
		key: 'defaultProps',
		get: function get() {
			return {
				xOffset: 0,
				yOffset: 0,
				panelSpacing: 1.37,
				canvasWidth: 1000,
				canvasHeight: 1000,
				strokeColor: '#FFFFFF',
				onDraw: function onDraw(data) {
					return data;
				}
			};
		}
	}]);

	return NanoleafLayout;
})(_react.Component);

NanoleafLayout.propTypes = {
	canvasHeight: _propTypes2['default'].number,
	canvasWidth: _propTypes2['default'].number,
	data: _propTypes2['default'].object.isRequired, //should be array
	onDraw: _propTypes2['default'].func,
	panelSpacing: _propTypes2['default'].number,
	strokeColor: _propTypes2['default'].string,
	xOffset: _propTypes2['default'].number,
	yOffset: _propTypes2['default'].number

};

exports['default'] = NanoleafLayout;
module.exports = exports['default'];

},{"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2hyaXN0aWFuYmFydHJhbS9XZWJzdG9ybVByb2plY3RzL25hbm9sZWFmLWxheW91dC9zcmMvTmFub2xlYWZMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNJaUMsT0FBTzs7Ozt5QkFDbEIsWUFBWTs7OztBQUVsQyxJQUFNLGVBQWUsR0FBRyxBQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLEdBQUcsQ0FBQzs7SUFFM0MsY0FBYztXQUFkLGNBQWM7O1VBQWQsY0FBYzt3QkFBZCxjQUFjOzs2QkFBZCxjQUFjOzs7Y0FBZCxjQUFjOztTQUVGLDZCQUFHOzs7QUFDbkIsT0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQyxPQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVsQyxNQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0MsTUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBR2hCLE9BQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDbkQsVUFBTSxJQUFJLEtBQUssQ0FBQyw0SEFBNEgsQ0FBQyxDQUFDO0lBQzlJOztBQUVELE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDM0MsVUFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxBQUFDLEtBQUss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Q3JEOzs7U0FHSyxrQkFBRztBQUNSLFVBQVE7OztJQUFLLDZDQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxBQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxBQUFDLEdBQUU7SUFBTSxDQUFFO0dBQzFHOzs7T0E5S3NCLGVBQUc7QUFDekIsVUFBTztBQUNOLFdBQU8sRUFBRSxDQUFDO0FBQ1YsV0FBTyxFQUFFLENBQUM7QUFDVixnQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVyxFQUFFLElBQUk7QUFDakIsZ0JBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVcsRUFBRSxTQUFTO0FBQ3RCLFVBQU0sRUFBRSxnQkFBUyxJQUFJLEVBQUU7QUFBRSxZQUFPLElBQUksQ0FBQztLQUFFO0lBQ3ZDLENBQUM7R0FDRjs7O1FBaERJLGNBQWM7OztBQXVOcEIsY0FBYyxDQUFDLFNBQVMsR0FBRztBQUMxQixhQUFZLEVBQUUsdUJBQVUsTUFBTTtBQUM5QixZQUFXLEVBQUUsdUJBQVUsTUFBTTtBQUM3QixLQUFJLEVBQUUsdUJBQVUsTUFBTSxDQUFDLFVBQVU7QUFDakMsT0FBTSxFQUFFLHVCQUFVLElBQUk7QUFDdEIsYUFBWSxFQUFFLHVCQUFVLE1BQU07QUFDOUIsWUFBVyxFQUFFLHVCQUFVLE1BQU07QUFDN0IsUUFBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsUUFBTyxFQUFFLHVCQUFVLE1BQU07O0NBRXpCLENBQUM7O3FCQUVhLGNBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IENocmlzdGlhbiBCYXJ0cmFtIG9uIDYvMjAvMTcuXG4gKiBHaXRodWIgQGNiYXJ0cmFtXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBDRU5UUk9JRF9IRUlHSFQgPSAoTWF0aC5zcXJ0KDMpIC8gNikgKiAxNTA7XG5cbmNsYXNzIE5hbm9sZWFmTGF5b3V0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG5cdFx0bGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0Y3R4LnRyYW5zbGF0ZShjdHgud2lkdGggLyAyLCBjdHguaGVpZ2h0IC8gMik7XG5cdFx0Y3R4LnNjYWxlKDEsIDEpO1xuXG5cdFx0XG5cdFx0aWYoIXRoaXMucHJvcHMuZGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25EYXRhJykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcHJvcGVydHk6IHBvc2l0aW9uRGF0YSBpbiBnaXZlbiBwcm9wLiBFbnN1cmUgdGhhdCB5b3VyIGRhdGEgaW5jbHVkZXMgYSBwb3NpdGlvbkRhdGEga2V5IHdpdGggYW4gYXJyYXkgdmFsdWUnKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5wcm9wcy5kYXRhLnBvc2l0aW9uRGF0YS5tYXAoKHZhbHVlKSA9PiB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRHJhdyh0aGlzLmRyYXcoY3R4LCAodmFsdWUueCAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueE9mZnNldCwgKHZhbHVlLnkgLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnlPZmZzZXQsIHZhbHVlLm8sIHZhbHVlLmNvbG9yKSk7XG5cdFx0fSk7XG5cdH07XG5cdFxuXHRjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cdFx0bGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcblx0XHRsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0XG5cdFx0Y3R4LnRyYW5zbGF0ZShjdHgud2lkdGggLyAyLCBjdHguaGVpZ2h0IC8gMik7XG5cdFx0Y3R4LnNjYWxlKDEsIDEpO1xuXG5cblx0XHRpZighdGhpcy5wcm9wcy5kYXRhLmhhc093blByb3BlcnR5KCdwb3NpdGlvbkRhdGEnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwcm9wZXJ0eTogcG9zaXRpb25EYXRhIGluIGdpdmVuIHByb3AuIEVuc3VyZSB0aGF0IHlvdXIgZGF0YSBpbmNsdWRlcyBhIHBvc2l0aW9uRGF0YSBrZXkgd2l0aCBhbiBhcnJheSB2YWx1ZScpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLnByb3BzLmRhdGEucG9zaXRpb25EYXRhLm1hcCgodmFsdWUpID0+IHtcblx0XHRcdHRoaXMucHJvcHMub25EcmF3KHRoaXMuZHJhdyhjdHgsICh2YWx1ZS54IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy54T2Zmc2V0LCAodmFsdWUueSAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueU9mZnNldCwgdmFsdWUubywgdmFsdWUuY29sb3IpKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR4T2Zmc2V0OiAwLFxuXHRcdFx0eU9mZnNldDogMCxcblx0XHRcdHBhbmVsU3BhY2luZzogMS4zNyxcblx0XHRcdGNhbnZhc1dpZHRoOiAxMDAwLFxuXHRcdFx0Y2FudmFzSGVpZ2h0OiAxMDAwLFxuXHRcdFx0c3Ryb2tlQ29sb3I6ICcjRkZGRkZGJyxcblx0XHRcdG9uRHJhdzogZnVuY3Rpb24oZGF0YSkgeyByZXR1cm4gZGF0YTsgfVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYW4gRXF1aWxhdGVyYWwgVHJpYW5nbGUgb24gdGhlIENhbnZhc1xuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSB4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0geSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIG8gaW50ZWdlciBPcmllbnRhdGlvbiBpbiBkZWdyZWVzXG5cdCAqIEBwYXJhbSBjb2xvciBoZXhhZGVjaW1hbCBjb2xvciBjb2RlIFRyaWFuZ2xlIENvbG9yIGkuZS4gI0ZGMDBGRlxuXHQgKi9cblx0ZHJhdyhjdHgsIHgsIHksIG8sIGNvbG9yKSB7XG5cdFx0XG5cdFx0bGV0IG9yaWVudCA9IGZhbHNlOyBcblx0XHRcblx0XHRsZXQgdG9wUG9pbnQgPSB0aGlzLmdldFRvcEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXHRcdGxldCBsZWZ0UG9pbnQgPSB0aGlzLmdldExlZnRGcm9tQ2VudHJvaWQoY3R4LCB4LHkpO1xuXHRcdGxldCByaWdodFBvaW50ID0gdGhpcy5nZXRSaWdodEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXG5cdFx0bGV0IHRvcFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlVG9wRnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cdFx0bGV0IGxlZnRSb3RhdGVkUG9pbnQgPSB0aGlzLnJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblx0XHRsZXQgcmlnaHRSb3RhdGVkUG9pbnQgPSB0aGlzLnJvdGF0ZVJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cblx0XHRjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnByb3BzLnN0cm9rZUNvbG9yO1xuXHRcdGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0XHRjdHguc2F2ZSgpO1xuXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXG5cdFx0aWYodGhpcy5kb1JvdGF0ZShvKSkge1xuXG5cdFx0XHRjdHgubW92ZVRvKHRvcFJvdGF0ZWRQb2ludFswXSwgdG9wUm90YXRlZFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8obGVmdFJvdGF0ZWRQb2ludFswXSwgbGVmdFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHJpZ2h0Um90YXRlZFBvaW50WzBdLCByaWdodFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHRvcFJvdGF0ZWRQb2ludFswXSwgdG9wUm90YXRlZFBvaW50WzFdKTtcblx0XHRcdFxuXHRcdFx0b3JpZW50ID0gdHJ1ZTtcblx0XHRcdFxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y3R4Lm1vdmVUbyh0b3BQb2ludFswXSwgdG9wUG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyhyaWdodFBvaW50WzBdLCByaWdodFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8obGVmdFBvaW50WzBdLCBsZWZ0UG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyh0b3BQb2ludFswXSwgdG9wUG9pbnRbMV0pO1xuXHRcdH1cblxuXHRcdGN0eC5maWxsKCk7XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXG5cdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0XG5cdFx0aWYob3JpZW50KSB7XG5cdFx0XHRyZXR1cm4gW3RvcFJvdGF0ZWRQb2ludCwgbGVmdFJvdGF0ZWRQb2ludCwgcmlnaHRSb3RhdGVkUG9pbnRdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RvcFBvaW50LCBsZWZ0UG9pbnQsIHJpZ2h0UG9pbnRdO1xuXHRcdH1cblxuXHR9O1xuXG5cdC8qKlxuXHQgKiBNYXBzIGEgY2FydGVzaWFuIHBvaW50IHRvIGEgMkQgSFRNTCBDYW52YXMgcG9pbnRcblx0ICogQHBhcmFtIGN0eCBDbGllbnQgQ29udGV4dCBmb3IgdGhlIHdpZHRoIGFuZCBoZWlnaHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2hlcmUgdGhlIFNjcmVlbiBwb2ludCB4IGlzIGluIHBvc2l0aW9uIDAgYW5kIHRoZSBzY3JlZW4gcG9pbnQgWSBpcyBpbiBwb3NpdGlvbiAxXG5cdCAqL1xuXHRjYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW5YID0gY3ggKyBjdHguY2FudmFzLndpZHRoIC8gMjtcblx0XHRsZXQgc2NyZWVuWSA9IGN0eC5jYW52YXMuaGVpZ2h0IC8gMiAtIGN5O1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5YLCBzY3JlZW5ZXTtcblx0fTtcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdHJpYW5nbGUgc2hvdWxkIGJlIHJvdGF0ZWRcblx0ICogQHBhcmFtIHJvdGF0aW9uIGludGVnZXIgcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgcm90YXRpb24gc2hvdWxkIG9jY3VyIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0ZG9Sb3RhdGUocm90YXRpb24pIHtcblx0XHRyZXR1cm4gKHJvdGF0aW9uIC8gNjApICUgMiAhPT0gMCA7XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHRvcCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0VG9wRnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0sIHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVF07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdGdldExlZnRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSAtIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgcmlnaHQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdGdldFJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0gKyBDRU5UUk9JRF9IRUlHSFQsIHNjcmVlblsxXSArIENFTlRST0lEX0hFSUdIVF07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRyb3RhdGVMZWZ0RnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0gLSBDRU5UUk9JRF9IRUlHSFQsIHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCArIDMwXTsgLy8zMCBpcyBmb3Igc3BhY2luZ1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIHRoYXQgaXMgcm90YXRlZCAxODAgZGVncmVlcyBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0cm90YXRlUmlnaHRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSArIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdIC0gQ0VOVFJPSURfSEVJR0hUICsgMzBdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIHRoYXQgaXMgcm90YXRlZCAxODAgZGVncmVlcyBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0cm90YXRlVG9wRnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0sIHNjcmVlblsxXSArIENFTlRST0lEX0hFSUdIVCArIDMwXTtcblx0fTtcblxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKDxkaXY+PGNhbnZhcyBpZD1cImNhbnZhc1wiIHdpZHRoPXt0aGlzLnByb3BzLmNhbnZhc1dpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuY2FudmFzSGVpZ2h0fS8+PC9kaXY+KTtcblx0fVxufVxuXG5OYW5vbGVhZkxheW91dC5wcm9wVHlwZXMgPSB7XG5cdGNhbnZhc0hlaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0Y2FudmFzV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG5cdGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy9zaG91bGQgYmUgYXJyYXlcblx0b25EcmF3OiBQcm9wVHlwZXMuZnVuYyxcblx0cGFuZWxTcGFjaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzdHJva2VDb2xvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0eE9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcblx0eU9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcblx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYW5vbGVhZkxheW91dDtcblxuXG5cbiJdfQ==
