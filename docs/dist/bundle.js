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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZzZ2Yy9XZWJzdG9ybVByb2plY3RzL25hbm8vbmFub2xlYWYtbGF5b3V0L3NyYy9OYW5vbGVhZkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0lpQyxPQUFPOzs7O3lCQUNsQixZQUFZOzs7O0FBRWxDLElBQU0sZUFBZSxHQUFHLEFBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksR0FBRyxDQUFDOztJQUUzQyxjQUFjO1dBQWQsY0FBYzs7VUFBZCxjQUFjO3dCQUFkLGNBQWM7OzZCQUFkLGNBQWM7OztjQUFkLGNBQWM7O1NBRUYsNkJBQUc7OztBQUNuQixPQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLE9BQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLE1BQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxNQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFHaEIsT0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNuRCxVQUFNLElBQUksS0FBSyxDQUFDLDRIQUE0SCxDQUFDLENBQUM7SUFDOUk7O0FBRUQsT0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBSztBQUMzQyxVQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEFBQUMsS0FBSyxDQUFDLENB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QUdLLGtCQUFHO0FBQ1IsVUFBUTs7O0lBQUssNkNBQVEsRUFBRSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEFBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEFBQUMsR0FBRTtJQUFNLENBQUU7R0FDMUc7OztPQTlLc0IsZUFBRztBQUN6QixVQUFPO0FBQ04sV0FBTyxFQUFFLENBQUM7QUFDVixXQUFPLEVBQUUsQ0FBQztBQUNWLGdCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFXLEVBQUUsSUFBSTtBQUNqQixnQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVyxFQUFFLFNBQVM7QUFDdEIsVUFBTSxFQUFFLGdCQUFTLElBQUksRUFBRTtBQUFFLFlBQU8sSUFBSSxDQUFDO0tBQUU7SUFDdkMsQ0FBQztHQUNGOzs7UUFoREksY0FBYzs7O0FBdU5wQixjQUFjLENBQUMsU0FBUyxHQUFHO0FBQzFCLGFBQVksRUFBRSx1QkFBVSxNQUFNO0FBQzlCLFlBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLEtBQUksRUFBRSx1QkFBVSxNQUFNLENBQUMsVUFBVTtBQUNqQyxPQUFNLEVBQUUsdUJBQVUsSUFBSTtBQUN0QixhQUFZLEVBQUUsdUJBQVUsTUFBTTtBQUM5QixZQUFXLEVBQUUsdUJBQVUsTUFBTTtBQUM3QixRQUFPLEVBQUUsdUJBQVUsTUFBTTtBQUN6QixRQUFPLEVBQUUsdUJBQVUsTUFBTTs7Q0FFekIsQ0FBQzs7cUJBRWEsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgQ2hyaXN0aWFuIEJhcnRyYW0gb24gNi8yMC8xNy5cbiAqIEdpdGh1YiBAY2JhcnRyYW1cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IENFTlRST0lEX0hFSUdIVCA9IChNYXRoLnNxcnQoMykgLyA2KSAqIDE1MDtcblxuY2xhc3MgTmFub2xlYWZMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0bGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcblx0XHRsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRjdHgudHJhbnNsYXRlKGN0eC53aWR0aCAvIDIsIGN0eC5oZWlnaHQgLyAyKTtcblx0XHRjdHguc2NhbGUoMSwgMSk7XG5cblx0XHRcblx0XHRpZighdGhpcy5wcm9wcy5kYXRhLmhhc093blByb3BlcnR5KCdwb3NpdGlvbkRhdGEnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwcm9wZXJ0eTogcG9zaXRpb25EYXRhIGluIGdpdmVuIHByb3AuIEVuc3VyZSB0aGF0IHlvdXIgZGF0YSBpbmNsdWRlcyBhIHBvc2l0aW9uRGF0YSBrZXkgd2l0aCBhbiBhcnJheSB2YWx1ZScpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLnByb3BzLmRhdGEucG9zaXRpb25EYXRhLm1hcCgodmFsdWUpID0+IHtcblx0XHRcdHRoaXMucHJvcHMub25EcmF3KHRoaXMuZHJhdyhjdHgsICh2YWx1ZS54IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy54T2Zmc2V0LCAodmFsdWUueSAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueU9mZnNldCwgdmFsdWUubywgdmFsdWUuY29sb3IpKTtcblx0XHR9KTtcblx0fTtcblx0XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuXHRcdGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHRcblx0XHRjdHgudHJhbnNsYXRlKGN0eC53aWR0aCAvIDIsIGN0eC5oZWlnaHQgLyAyKTtcblx0XHRjdHguc2NhbGUoMSwgMSk7XG5cblxuXHRcdGlmKCF0aGlzLnByb3BzLmRhdGEuaGFzT3duUHJvcGVydHkoJ3Bvc2l0aW9uRGF0YScpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHByb3BlcnR5OiBwb3NpdGlvbkRhdGEgaW4gZ2l2ZW4gcHJvcC4gRW5zdXJlIHRoYXQgeW91ciBkYXRhIGluY2x1ZGVzIGEgcG9zaXRpb25EYXRhIGtleSB3aXRoIGFuIGFycmF5IHZhbHVlJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMucHJvcHMuZGF0YS5wb3NpdGlvbkRhdGEubWFwKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkRyYXcodGhpcy5kcmF3KGN0eCwgKHZhbHVlLnggLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnhPZmZzZXQsICh2YWx1ZS55IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy55T2Zmc2V0LCB2YWx1ZS5vLCB2YWx1ZS5jb2xvcikpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHhPZmZzZXQ6IDAsXG5cdFx0XHR5T2Zmc2V0OiAwLFxuXHRcdFx0cGFuZWxTcGFjaW5nOiAxLjM3LFxuXHRcdFx0Y2FudmFzV2lkdGg6IDEwMDAsXG5cdFx0XHRjYW52YXNIZWlnaHQ6IDEwMDAsXG5cdFx0XHRzdHJva2VDb2xvcjogJyNGRkZGRkYnLFxuXHRcdFx0b25EcmF3OiBmdW5jdGlvbihkYXRhKSB7IHJldHVybiBkYXRhOyB9XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3cyBhbiBFcXVpbGF0ZXJhbCBUcmlhbmdsZSBvbiB0aGUgQ2FudmFzXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIHggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gbyBpbnRlZ2VyIE9yaWVudGF0aW9uIGluIGRlZ3JlZXNcblx0ICogQHBhcmFtIGNvbG9yIGhleGFkZWNpbWFsIGNvbG9yIGNvZGUgVHJpYW5nbGUgQ29sb3IgaS5lLiAjRkYwMEZGXG5cdCAqL1xuXHRkcmF3KGN0eCwgeCwgeSwgbywgY29sb3IpIHtcblx0XHRcblx0XHRsZXQgb3JpZW50ID0gZmFsc2U7IFxuXHRcdFxuXHRcdGxldCB0b3BQb2ludCA9IHRoaXMuZ2V0VG9wRnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cdFx0bGV0IGxlZnRQb2ludCA9IHRoaXMuZ2V0TGVmdEZyb21DZW50cm9pZChjdHgsIHgseSk7XG5cdFx0bGV0IHJpZ2h0UG9pbnQgPSB0aGlzLmdldFJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cblx0XHRsZXQgdG9wUm90YXRlZFBvaW50ID0gdGhpcy5yb3RhdGVUb3BGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblx0XHRsZXQgbGVmdFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlTGVmdEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXHRcdGxldCByaWdodFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlUmlnaHRGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblxuXHRcdGN0eC5zdHJva2VTdHlsZSA9IHRoaXMucHJvcHMuc3Ryb2tlQ29sb3I7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXHRcdGN0eC5zYXZlKCk7XG5cblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cblx0XHRpZih0aGlzLmRvUm90YXRlKG8pKSB7XG5cblx0XHRcdGN0eC5tb3ZlVG8odG9wUm90YXRlZFBvaW50WzBdLCB0b3BSb3RhdGVkUG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyhsZWZ0Um90YXRlZFBvaW50WzBdLCBsZWZ0Um90YXRlZFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8ocmlnaHRSb3RhdGVkUG9pbnRbMF0sIHJpZ2h0Um90YXRlZFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8odG9wUm90YXRlZFBvaW50WzBdLCB0b3BSb3RhdGVkUG9pbnRbMV0pO1xuXHRcdFx0XG5cdFx0XHRvcmllbnQgPSB0cnVlO1xuXHRcdFx0XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjdHgubW92ZVRvKHRvcFBvaW50WzBdLCB0b3BQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHJpZ2h0UG9pbnRbMF0sIHJpZ2h0UG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyhsZWZ0UG9pbnRbMF0sIGxlZnRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHRvcFBvaW50WzBdLCB0b3BQb2ludFsxXSk7XG5cdFx0fVxuXG5cdFx0Y3R4LmZpbGwoKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cblx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRcblx0XHRpZihvcmllbnQpIHtcblx0XHRcdHJldHVybiBbdG9wUm90YXRlZFBvaW50LCBsZWZ0Um90YXRlZFBvaW50LCByaWdodFJvdGF0ZWRQb2ludF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdG9wUG9pbnQsIGxlZnRQb2ludCwgcmlnaHRQb2ludF07XG5cdFx0fVxuXG5cdH07XG5cblx0LyoqXG5cdCAqIE1hcHMgYSBjYXJ0ZXNpYW4gcG9pbnQgdG8gYSAyRCBIVE1MIENhbnZhcyBwb2ludFxuXHQgKiBAcGFyYW0gY3R4IENsaWVudCBDb250ZXh0IGZvciB0aGUgd2lkdGggYW5kIGhlaWdodFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aGVyZSB0aGUgU2NyZWVuIHBvaW50IHggaXMgaW4gcG9zaXRpb24gMCBhbmQgdGhlIHNjcmVlbiBwb2ludCBZIGlzIGluIHBvc2l0aW9uIDFcblx0ICovXG5cdGNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlblggPSBjeCArIGN0eC5jYW52YXMud2lkdGggLyAyO1xuXHRcdGxldCBzY3JlZW5ZID0gY3R4LmNhbnZhcy5oZWlnaHQgLyAyIC0gY3k7XG5cblx0XHRyZXR1cm4gW3NjcmVlblgsIHNjcmVlblldO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0cmlhbmdsZSBzaG91bGQgYmUgcm90YXRlZFxuXHQgKiBAcGFyYW0gcm90YXRpb24gaW50ZWdlciByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSByb3RhdGlvbiBzaG91bGQgb2NjdXIgZmFsc2Ugb3RoZXJ3aXNlXG5cdCAqL1xuXHRkb1JvdGF0ZShyb3RhdGlvbikge1xuXHRcdHJldHVybiAocm90YXRpb24gLyA2MCkgJSAyICE9PSAwIDtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG9wIG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRUb3BGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSwgc2NyZWVuWzFdIC0gQ0VOVFJPSURfSEVJR0hUXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0TGVmdEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdIC0gQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFRdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSByaWdodCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0UmlnaHRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSArIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSB0aGF0IGlzIHJvdGF0ZWQgMTgwIGRlZ3JlZXMgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSAtIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdIC0gQ0VOVFJPSURfSEVJR0hUICsgMzBdOyAvLzMwIGlzIGZvciBzcGFjaW5nXG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRyb3RhdGVSaWdodEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdICsgQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFQgKyAzMF07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRyb3RhdGVUb3BGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSwgc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUICsgMzBdO1xuXHR9O1xuXG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoPGRpdj48Y2FudmFzIGlkPVwiY2FudmFzXCIgd2lkdGg9e3RoaXMucHJvcHMuY2FudmFzV2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5jYW52YXNIZWlnaHR9Lz48L2Rpdj4pO1xuXHR9XG59XG5cbk5hbm9sZWFmTGF5b3V0LnByb3BUeXBlcyA9IHtcblx0Y2FudmFzSGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRjYW52YXNXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcblx0ZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvL3Nob3VsZCBiZSBhcnJheVxuXHRvbkRyYXc6IFByb3BUeXBlcy5mdW5jLFxuXHRwYW5lbFNwYWNpbmc6IFByb3BUeXBlcy5udW1iZXIsXG5cdHN0cm9rZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR4T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHR5T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hbm9sZWFmTGF5b3V0O1xuXG5cblxuIl19
