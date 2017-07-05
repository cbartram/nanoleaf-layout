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
				_this.props.onDraw(_this.draw(ctx, value.x / _this.props.panelSpacing + _this.props.xOffset, value.y / _this.props.panelSpacing + _this.props.yOffset, value.o, value.color, value.panelId));
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
				console.log(value.panelId);
				_this2.props.onDraw(_this2.draw(ctx, value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color, value.panelId));
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
   * @param id integer the panel identifier
   */
		value: function draw(ctx, x, y, o, color, id) {
			var orient = false;

			var centroid = this.cartesianToScreen(ctx, x, y);

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

			if (this.props.showId) {
				ctx.font = '14px Arial';
				ctx.fillStyle = '#FFFFFF';
				ctx.fillText(id, centroid[0] - 3, centroid[1] + 15);
				ctx.save();
			}

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
				},
				showId: false
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
	yOffset: _propTypes2['default'].number,
	showId: _propTypes2['default'].bool
};

exports['default'] = NanoleafLayout;
module.exports = exports['default'];

},{"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZzZ2Yy9XZWJzdG9ybVByb2plY3RzL25hbm8vbmFub2xlYWYtbGF5b3V0L3NyYy9OYW5vbGVhZkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0lpQyxPQUFPOzs7O3lCQUNsQixZQUFZOzs7O0FBRWxDLElBQU0sZUFBZSxHQUFHLEFBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksR0FBRyxDQUFDOztJQUUzQyxjQUFjO1dBQWQsY0FBYzs7VUFBZCxjQUFjO3dCQUFkLGNBQWM7OzZCQUFkLGNBQWM7OztjQUFkLGNBQWM7O1NBRUYsNkJBQUc7OztBQUNuQixPQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLE9BQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLE1BQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxNQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFHaEIsT0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNuRCxVQUFNLElBQUksS0FBSyxDQUFDLDRIQUE0SCxDQUFDLENBQUM7SUFDOUk7O0FBRUQsT0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBSztBQUMzQyxVQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEFBQUMsS0FBSyxDQUFDLENB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dUJBQVUsTUFBTTtBQUM5QixZQUFXLEVBQUUsdUJBQVUsTUFBTTtBQUM3QixLQUFJLEVBQUUsdUJBQVUsTUFBTSxDQUFDLFVBQVU7QUFDakMsT0FBTSxFQUFFLHVCQUFVLElBQUk7QUFDdEIsYUFBWSxFQUFFLHVCQUFVLE1BQU07QUFDOUIsWUFBVyxFQUFFLHVCQUFVLE1BQU07QUFDN0IsUUFBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsUUFBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsT0FBTSxFQUFFLHVCQUFVLElBQUk7Q0FDdEIsQ0FBQzs7cUJBRWEsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgQ2hyaXN0aWFuIEJhcnRyYW0gb24gNi8yMC8xNy5cbiAqIEdpdGh1YiBAY2JhcnRyYW1cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IENFTlRST0lEX0hFSUdIVCA9IChNYXRoLnNxcnQoMykgLyA2KSAqIDE1MDtcblxuY2xhc3MgTmFub2xlYWZMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0bGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcblx0XHRsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRjdHgudHJhbnNsYXRlKGN0eC53aWR0aCAvIDIsIGN0eC5oZWlnaHQgLyAyKTtcblx0XHRjdHguc2NhbGUoMSwgMSk7XG5cblx0XHRcblx0XHRpZighdGhpcy5wcm9wcy5kYXRhLmhhc093blByb3BlcnR5KCdwb3NpdGlvbkRhdGEnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBwcm9wZXJ0eTogcG9zaXRpb25EYXRhIGluIGdpdmVuIHByb3AuIEVuc3VyZSB0aGF0IHlvdXIgZGF0YSBpbmNsdWRlcyBhIHBvc2l0aW9uRGF0YSBrZXkgd2l0aCBhbiBhcnJheSB2YWx1ZScpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLnByb3BzLmRhdGEucG9zaXRpb25EYXRhLm1hcCgodmFsdWUpID0+IHtcblx0XHRcdHRoaXMucHJvcHMub25EcmF3KHRoaXMuZHJhdyhjdHgsICh2YWx1ZS54IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy54T2Zmc2V0LCAodmFsdWUueSAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueU9mZnNldCwgdmFsdWUubywgdmFsdWUuY29sb3IsIHZhbHVlLnBhbmVsSWQpKTtcblx0XHR9KTtcblx0fTtcblx0XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuXHRcdGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHRcblx0XHRjdHgudHJhbnNsYXRlKGN0eC53aWR0aCAvIDIsIGN0eC5oZWlnaHQgLyAyKTtcblx0XHRjdHguc2NhbGUoMSwgMSk7XG5cblxuXHRcdGlmKCF0aGlzLnByb3BzLmRhdGEuaGFzT3duUHJvcGVydHkoJ3Bvc2l0aW9uRGF0YScpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHByb3BlcnR5OiBwb3NpdGlvbkRhdGEgaW4gZ2l2ZW4gcHJvcC4gRW5zdXJlIHRoYXQgeW91ciBkYXRhIGluY2x1ZGVzIGEgcG9zaXRpb25EYXRhIGtleSB3aXRoIGFuIGFycmF5IHZhbHVlJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMucHJvcHMuZGF0YS5wb3NpdGlvbkRhdGEubWFwKCh2YWx1ZSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2codmFsdWUucGFuZWxJZCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uRHJhdyh0aGlzLmRyYXcoY3R4LCAodmFsdWUueCAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueE9mZnNldCwgKHZhbHVlLnkgLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnlPZmZzZXQsIHZhbHVlLm8sIHZhbHVlLmNvbG9yLCB2YWx1ZS5wYW5lbElkKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0eE9mZnNldDogMCxcblx0XHRcdHlPZmZzZXQ6IDAsXG5cdFx0XHRwYW5lbFNwYWNpbmc6IDEuMzcsXG5cdFx0XHRjYW52YXNXaWR0aDogMTAwMCxcblx0XHRcdGNhbnZhc0hlaWdodDogMTAwMCxcblx0XHRcdHN0cm9rZUNvbG9yOiAnI0ZGRkZGRicsXG5cdFx0XHRvbkRyYXc6IGZ1bmN0aW9uKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0sXG5cdFx0XHRzaG93SWQ6IGZhbHNlLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYW4gRXF1aWxhdGVyYWwgVHJpYW5nbGUgb24gdGhlIENhbnZhc1xuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSB4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0geSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIG8gaW50ZWdlciBPcmllbnRhdGlvbiBpbiBkZWdyZWVzXG5cdCAqIEBwYXJhbSBjb2xvciBoZXhhZGVjaW1hbCBjb2xvciBjb2RlIFRyaWFuZ2xlIENvbG9yIGkuZS4gI0ZGMDBGRlxuXHQgKiBAcGFyYW0gaWQgaW50ZWdlciB0aGUgcGFuZWwgaWRlbnRpZmllclxuXHQgKi9cblx0ZHJhdyhjdHgsIHgsIHksIG8sIGNvbG9yLCBpZCkge1xuICAgICAgICBsZXQgb3JpZW50ID0gZmFsc2U7XG5cblx0XHRsZXQgY2VudHJvaWQgPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgeCwgeSk7XG5cblx0XHRsZXQgdG9wUG9pbnQgPSB0aGlzLmdldFRvcEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXHRcdGxldCBsZWZ0UG9pbnQgPSB0aGlzLmdldExlZnRGcm9tQ2VudHJvaWQoY3R4LCB4LHkpO1xuXHRcdGxldCByaWdodFBvaW50ID0gdGhpcy5nZXRSaWdodEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXG5cdFx0bGV0IHRvcFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlVG9wRnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cdFx0bGV0IGxlZnRSb3RhdGVkUG9pbnQgPSB0aGlzLnJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblx0XHRsZXQgcmlnaHRSb3RhdGVkUG9pbnQgPSB0aGlzLnJvdGF0ZVJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cblx0XHRjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnByb3BzLnN0cm9rZUNvbG9yO1xuXHRcdGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0XHRjdHguc2F2ZSgpO1xuXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXG5cdFx0aWYodGhpcy5kb1JvdGF0ZShvKSkge1xuXG5cdFx0XHRjdHgubW92ZVRvKHRvcFJvdGF0ZWRQb2ludFswXSwgdG9wUm90YXRlZFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8obGVmdFJvdGF0ZWRQb2ludFswXSwgbGVmdFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHJpZ2h0Um90YXRlZFBvaW50WzBdLCByaWdodFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKHRvcFJvdGF0ZWRQb2ludFswXSwgdG9wUm90YXRlZFBvaW50WzFdKTtcblx0XHRcdFxuXHRcdFx0b3JpZW50ID0gdHJ1ZTtcblx0XHRcdFxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y3R4Lm1vdmVUbyh0b3BQb2ludFswXSwgdG9wUG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyhyaWdodFBvaW50WzBdLCByaWdodFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8obGVmdFBvaW50WzBdLCBsZWZ0UG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyh0b3BQb2ludFswXSwgdG9wUG9pbnRbMV0pO1xuXHRcdH1cblxuXHRcdGN0eC5maWxsKCk7XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXG5cdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdGN0eC5zYXZlKCk7XG5cblx0XHRpZih0aGlzLnByb3BzLnNob3dJZCkge1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGlkLCBjZW50cm9pZFswXSAtIDMsIGNlbnRyb2lkWzFdICsgMTUpO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9yaWVudCkge1xuXHRcdFx0cmV0dXJuIFt0b3BSb3RhdGVkUG9pbnQsIGxlZnRSb3RhdGVkUG9pbnQsIHJpZ2h0Um90YXRlZFBvaW50XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0b3BQb2ludCwgbGVmdFBvaW50LCByaWdodFBvaW50XTtcblx0XHR9XG5cblx0fTtcblxuXHQvKipcblx0ICogTWFwcyBhIGNhcnRlc2lhbiBwb2ludCB0byBhIDJEIEhUTUwgQ2FudmFzIHBvaW50XG5cdCAqIEBwYXJhbSBjdHggQ2xpZW50IENvbnRleHQgZm9yIHRoZSB3aWR0aCBhbmQgaGVpZ2h0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdoZXJlIHRoZSBTY3JlZW4gcG9pbnQgeCBpcyBpbiBwb3NpdGlvbiAwIGFuZCB0aGUgc2NyZWVuIHBvaW50IFkgaXMgaW4gcG9zaXRpb24gMVxuXHQgKi9cblx0Y2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuWCA9IGN4ICsgY3R4LmNhbnZhcy53aWR0aCAvIDI7XG5cdFx0bGV0IHNjcmVlblkgPSBjdHguY2FudmFzLmhlaWdodCAvIDIgLSBjeTtcblxuXHRcdHJldHVybiBbc2NyZWVuWCwgc2NyZWVuWV07XG5cdH07XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRyaWFuZ2xlIHNob3VsZCBiZSByb3RhdGVkXG5cdCAqIEBwYXJhbSByb3RhdGlvbiBpbnRlZ2VyIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHJvdGF0aW9uIHNob3VsZCBvY2N1ciBmYWxzZSBvdGhlcndpc2Vcblx0ICovXG5cdGRvUm90YXRlKHJvdGF0aW9uKSB7XG5cdFx0cmV0dXJuIChyb3RhdGlvbiAvIDYwKSAlIDIgIT09IDAgO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSB0b3AgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdGdldFRvcEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdLCBzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFRdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRMZWZ0RnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0gLSBDRU5UUk9JRF9IRUlHSFQsIHNjcmVlblsxXSArIENFTlRST0lEX0hFSUdIVF07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIHJpZ2h0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRSaWdodEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdICsgQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFRdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIHRoYXQgaXMgcm90YXRlZCAxODAgZGVncmVlcyBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0cm90YXRlTGVmdEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdIC0gQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFQgKyAzMF07IC8vMzAgaXMgZm9yIHNwYWNpbmdcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSB0aGF0IGlzIHJvdGF0ZWQgMTgwIGRlZ3JlZXMgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZVJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCBjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0gKyBDRU5UUk9JRF9IRUlHSFQsIHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCArIDMwXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSB0aGF0IGlzIHJvdGF0ZWQgMTgwIGRlZ3JlZXMgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZVRvcEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdLCBzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFQgKyAzMF07XG5cdH07XG5cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuICg8ZGl2PjxjYW52YXMgaWQ9XCJjYW52YXNcIiB3aWR0aD17dGhpcy5wcm9wcy5jYW52YXNXaWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmNhbnZhc0hlaWdodH0vPjwvZGl2Pik7XG5cdH1cbn1cblxuTmFub2xlYWZMYXlvdXQucHJvcFR5cGVzID0ge1xuXHRjYW52YXNIZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGNhbnZhc1dpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vc2hvdWxkIGJlIGFycmF5XG5cdG9uRHJhdzogUHJvcFR5cGVzLmZ1bmMsXG5cdHBhbmVsU3BhY2luZzogUHJvcFR5cGVzLm51bWJlcixcblx0c3Ryb2tlQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHhPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdHlPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdHNob3dJZDogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYW5vbGVhZkxheW91dDtcblxuXG5cbiJdfQ==
