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

			ctx.lineWidth = this.props.strokeWidth;
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
				showId: false,
				strokeWidth: 2
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
	showId: _propTypes2['default'].bool,
	strokeWidth: _propTypes2['default'].number
};

exports['default'] = NanoleafLayout;
module.exports = exports['default'];

},{"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2hyaXN0aWFuYmFydHJhbS9XZWJzdG9ybVByb2plY3RzL25hbm9sZWFmLWxheW91dC9zcmMvTmFub2xlYWZMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNJaUMsT0FBTzs7Ozt5QkFDbEIsWUFBWTs7OztBQUVsQyxJQUFNLGVBQWUsR0FBRyxBQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLEdBQUcsQ0FBQzs7SUFFM0MsY0FBYztXQUFkLGNBQWM7O1VBQWQsY0FBYzt3QkFBZCxjQUFjOzs2QkFBZCxjQUFjOzs7Y0FBZCxjQUFjOztTQUVGLDZCQUFHOzs7QUFDbkIsT0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQyxPQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVsQyxNQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0MsTUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBR2hCLE9BQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDbkQsVUFBTSxJQUFJLEtBQUssQ0FBQyw0SEFBNEgsQ0FBQyxDQUFDO0lBQzlJOztBQUVELE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDM0MsVUFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxBQUFDLEtBQUss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LENBQUMsU0FBUyxHQUFHO0FBQzFCLGFBQVksRUFBRSx1QkFBVSxNQUFNO0FBQzlCLFlBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLEtBQUksRUFBRSx1QkFBVSxNQUFNLENBQUMsVUFBVTtBQUNqQyxPQUFNLEVBQUUsdUJBQVUsSUFBSTtBQUN0QixhQUFZLEVBQUUsdUJBQVUsTUFBTTtBQUM5QixZQUFXLEVBQUUsdUJBQVUsTUFBTTtBQUM3QixRQUFPLEVBQUUsdUJBQVUsTUFBTTtBQUN6QixRQUFPLEVBQUUsdUJBQVUsTUFBTTtBQUN6QixPQUFNLEVBQUUsdUJBQVUsSUFBSTtBQUN0QixZQUFXLEVBQUUsdUJBQVUsTUFBTTtDQUM3QixDQUFDOztxQkFFYSxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBDaHJpc3RpYW4gQmFydHJhbSBvbiA2LzIwLzE3LlxuICogR2l0aHViIEBjYmFydHJhbVxuICovXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgQ0VOVFJPSURfSEVJR0hUID0gKE1hdGguc3FydCgzKSAvIDYpICogMTUwO1xuXG5jbGFzcyBOYW5vbGVhZkxheW91dCBleHRlbmRzIENvbXBvbmVudCB7XG5cdFxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuXHRcdGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdGN0eC50cmFuc2xhdGUoY3R4LndpZHRoIC8gMiwgY3R4LmhlaWdodCAvIDIpO1xuXHRcdGN0eC5zY2FsZSgxLCAxKTtcblxuXHRcdFxuXHRcdGlmKCF0aGlzLnByb3BzLmRhdGEuaGFzT3duUHJvcGVydHkoJ3Bvc2l0aW9uRGF0YScpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHByb3BlcnR5OiBwb3NpdGlvbkRhdGEgaW4gZ2l2ZW4gcHJvcC4gRW5zdXJlIHRoYXQgeW91ciBkYXRhIGluY2x1ZGVzIGEgcG9zaXRpb25EYXRhIGtleSB3aXRoIGFuIGFycmF5IHZhbHVlJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMucHJvcHMuZGF0YS5wb3NpdGlvbkRhdGEubWFwKCh2YWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkRyYXcodGhpcy5kcmF3KGN0eCwgKHZhbHVlLnggLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnhPZmZzZXQsICh2YWx1ZS55IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy55T2Zmc2V0LCB2YWx1ZS5vLCB2YWx1ZS5jb2xvciwgdmFsdWUucGFuZWxJZCkpO1xuXHRcdH0pO1xuXHR9O1xuXHRcblx0Y29tcG9uZW50RGlkVXBkYXRlKCkge1xuXHRcdGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG5cdFx0bGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdFxuXHRcdGN0eC50cmFuc2xhdGUoY3R4LndpZHRoIC8gMiwgY3R4LmhlaWdodCAvIDIpO1xuXHRcdGN0eC5zY2FsZSgxLCAxKTtcblxuXG5cdFx0aWYoIXRoaXMucHJvcHMuZGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25EYXRhJykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcHJvcGVydHk6IHBvc2l0aW9uRGF0YSBpbiBnaXZlbiBwcm9wLiBFbnN1cmUgdGhhdCB5b3VyIGRhdGEgaW5jbHVkZXMgYSBwb3NpdGlvbkRhdGEga2V5IHdpdGggYW4gYXJyYXkgdmFsdWUnKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5wcm9wcy5kYXRhLnBvc2l0aW9uRGF0YS5tYXAoKHZhbHVlKSA9PiB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRHJhdyh0aGlzLmRyYXcoY3R4LCAodmFsdWUueCAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueE9mZnNldCwgKHZhbHVlLnkgLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnlPZmZzZXQsIHZhbHVlLm8sIHZhbHVlLmNvbG9yLCB2YWx1ZS5wYW5lbElkKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0eE9mZnNldDogMCxcblx0XHRcdHlPZmZzZXQ6IDAsXG5cdFx0XHRwYW5lbFNwYWNpbmc6IDEuMzcsXG5cdFx0XHRjYW52YXNXaWR0aDogMTAwMCxcblx0XHRcdGNhbnZhc0hlaWdodDogMTAwMCxcblx0XHRcdHN0cm9rZUNvbG9yOiAnI0ZGRkZGRicsXG5cdFx0XHRvbkRyYXc6IGZ1bmN0aW9uKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0sXG5cdFx0XHRzaG93SWQ6IGZhbHNlLFxuXHRcdFx0c3Ryb2tlV2lkdGg6IDIsXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3cyBhbiBFcXVpbGF0ZXJhbCBUcmlhbmdsZSBvbiB0aGUgQ2FudmFzXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIHggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSB5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gbyBpbnRlZ2VyIE9yaWVudGF0aW9uIGluIGRlZ3JlZXNcblx0ICogQHBhcmFtIGNvbG9yIGhleGFkZWNpbWFsIGNvbG9yIGNvZGUgVHJpYW5nbGUgQ29sb3IgaS5lLiAjRkYwMEZGXG5cdCAqIEBwYXJhbSBpZCBpbnRlZ2VyIHRoZSBwYW5lbCBpZGVudGlmaWVyXG5cdCAqL1xuXHRkcmF3KGN0eCwgeCwgeSwgbywgY29sb3IsIGlkKSB7XG4gICAgICAgIGxldCBvcmllbnQgPSBmYWxzZTtcblxuXHRcdGxldCBjZW50cm9pZCA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3R4LCB4LCB5KTtcblxuXHRcdGxldCB0b3BQb2ludCA9IHRoaXMuZ2V0VG9wRnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cdFx0bGV0IGxlZnRQb2ludCA9IHRoaXMuZ2V0TGVmdEZyb21DZW50cm9pZChjdHgsIHgseSk7XG5cdFx0bGV0IHJpZ2h0UG9pbnQgPSB0aGlzLmdldFJpZ2h0RnJvbUNlbnRyb2lkKGN0eCwgeCwgeSk7XG5cblx0XHRsZXQgdG9wUm90YXRlZFBvaW50ID0gdGhpcy5yb3RhdGVUb3BGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblx0XHRsZXQgbGVmdFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlTGVmdEZyb21DZW50cm9pZChjdHgsIHgsIHkpO1xuXHRcdGxldCByaWdodFJvdGF0ZWRQb2ludCA9IHRoaXMucm90YXRlUmlnaHRGcm9tQ2VudHJvaWQoY3R4LCB4LCB5KTtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5wcm9wcy5zdHJva2VXaWR0aDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5wcm9wcy5zdHJva2VDb2xvcjtcblx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cdFx0Y3R4LnNhdmUoKTtcblxuXHRcdGN0eC5iZWdpblBhdGgoKTtcblxuXHRcdGlmKHRoaXMuZG9Sb3RhdGUobykpIHtcblxuXHRcdFx0Y3R4Lm1vdmVUbyh0b3BSb3RhdGVkUG9pbnRbMF0sIHRvcFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKGxlZnRSb3RhdGVkUG9pbnRbMF0sIGxlZnRSb3RhdGVkUG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyhyaWdodFJvdGF0ZWRQb2ludFswXSwgcmlnaHRSb3RhdGVkUG9pbnRbMV0pO1xuXHRcdFx0Y3R4LmxpbmVUbyh0b3BSb3RhdGVkUG9pbnRbMF0sIHRvcFJvdGF0ZWRQb2ludFsxXSk7XG5cdFx0XHRcblx0XHRcdG9yaWVudCA9IHRydWU7XG5cdFx0XHRcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGN0eC5tb3ZlVG8odG9wUG9pbnRbMF0sIHRvcFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8ocmlnaHRQb2ludFswXSwgcmlnaHRQb2ludFsxXSk7XG5cdFx0XHRjdHgubGluZVRvKGxlZnRQb2ludFswXSwgbGVmdFBvaW50WzFdKTtcblx0XHRcdGN0eC5saW5lVG8odG9wUG9pbnRbMF0sIHRvcFBvaW50WzFdKTtcblx0XHR9XG5cblx0XHRjdHguZmlsbCgpO1xuXHRcdGN0eC5zdHJva2UoKTtcblxuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRjdHguc2F2ZSgpO1xuXG5cdFx0aWYodGhpcy5wcm9wcy5zaG93SWQpIHtcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE0cHggQXJpYWwnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjRkZGRkZGJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChpZCwgY2VudHJvaWRbMF0gLSAzLCBjZW50cm9pZFsxXSArIDE1KTtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcmllbnQpIHtcblx0XHRcdHJldHVybiBbdG9wUm90YXRlZFBvaW50LCBsZWZ0Um90YXRlZFBvaW50LCByaWdodFJvdGF0ZWRQb2ludF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdG9wUG9pbnQsIGxlZnRQb2ludCwgcmlnaHRQb2ludF07XG5cdFx0fVxuXG5cdH07XG5cblx0LyoqXG5cdCAqIE1hcHMgYSBjYXJ0ZXNpYW4gcG9pbnQgdG8gYSAyRCBIVE1MIENhbnZhcyBwb2ludFxuXHQgKiBAcGFyYW0gY3R4IENsaWVudCBDb250ZXh0IGZvciB0aGUgd2lkdGggYW5kIGhlaWdodFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aGVyZSB0aGUgU2NyZWVuIHBvaW50IHggaXMgaW4gcG9zaXRpb24gMCBhbmQgdGhlIHNjcmVlbiBwb2ludCBZIGlzIGluIHBvc2l0aW9uIDFcblx0ICovXG5cdGNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KSB7XG5cdFx0bGV0IHNjcmVlblggPSBjeCArIGN0eC5jYW52YXMud2lkdGggLyAyO1xuXHRcdGxldCBzY3JlZW5ZID0gY3R4LmNhbnZhcy5oZWlnaHQgLyAyIC0gY3k7XG5cblx0XHRyZXR1cm4gW3NjcmVlblgsIHNjcmVlblldO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0cmlhbmdsZSBzaG91bGQgYmUgcm90YXRlZFxuXHQgKiBAcGFyYW0gcm90YXRpb24gaW50ZWdlciByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSByb3RhdGlvbiBzaG91bGQgb2NjdXIgZmFsc2Ugb3RoZXJ3aXNlXG5cdCAqL1xuXHRkb1JvdGF0ZShyb3RhdGlvbikge1xuXHRcdHJldHVybiAocm90YXRpb24gLyA2MCkgJSAyICE9PSAwIDtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG9wIG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRUb3BGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSwgc2NyZWVuWzFdIC0gQ0VOVFJPSURfSEVJR0hUXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0TGVmdEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdIC0gQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFRdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSByaWdodCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN0eCBjbGllbnQgY29udGV4dFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0UmlnaHRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSArIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSB0aGF0IGlzIHJvdGF0ZWQgMTgwIGRlZ3JlZXMgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjdHggY2xpZW50IGNvbnRleHRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSAtIENFTlRST0lEX0hFSUdIVCwgc2NyZWVuWzFdIC0gQ0VOVFJPSURfSEVJR0hUICsgMzBdOyAvLzMwIGlzIGZvciBzcGFjaW5nXG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRyb3RhdGVSaWdodEZyb21DZW50cm9pZChjdHgsIGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN0eCwgY3gsIGN5KTtcblxuXHRcdHJldHVybiBbc2NyZWVuWzBdICsgQ0VOVFJPSURfSEVJR0hULCBzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFQgKyAzMF07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3R4IGNsaWVudCBjb250ZXh0XG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRyb3RhdGVUb3BGcm9tQ2VudHJvaWQoY3R4LCBjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjdHgsIGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXSwgc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUICsgMzBdO1xuXHR9O1xuXG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoPGRpdj48Y2FudmFzIGlkPVwiY2FudmFzXCIgd2lkdGg9e3RoaXMucHJvcHMuY2FudmFzV2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5jYW52YXNIZWlnaHR9Lz48L2Rpdj4pO1xuXHR9XG59XG5cbk5hbm9sZWFmTGF5b3V0LnByb3BUeXBlcyA9IHtcblx0Y2FudmFzSGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRjYW52YXNXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcblx0ZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvL3Nob3VsZCBiZSBhcnJheVxuXHRvbkRyYXc6IFByb3BUeXBlcy5mdW5jLFxuXHRwYW5lbFNwYWNpbmc6IFByb3BUeXBlcy5udW1iZXIsXG5cdHN0cm9rZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR4T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHR5T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzaG93SWQ6IFByb3BUeXBlcy5ib29sLFxuXHRzdHJva2VXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hbm9sZWFmTGF5b3V0O1xuXG5cblxuIl19
