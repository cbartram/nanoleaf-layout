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