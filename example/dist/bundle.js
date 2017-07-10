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

var _mobx = require('mobx');

var CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;

var NanoleafLayout = (function (_Component) {
	_inherits(NanoleafLayout, _Component);

	function NanoleafLayout(props) {
		_classCallCheck(this, NanoleafLayout);

		_get(Object.getPrototypeOf(NanoleafLayout.prototype), 'constructor', this).call(this, props);

		(0, _mobx.extendObservable)(this, {
			dataSVG: null
		});
	}

	_createClass(NanoleafLayout, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this = this;

			var data = []; //Data to mutate state

			if (!this.props.data.hasOwnProperty('positionData')) {
				throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
			}

			this.props.data.positionData.map(function (value) {
				var draw = _this.draw(value.x / _this.props.panelSpacing + _this.props.xOffset, value.y / _this.props.panelSpacing + _this.props.yOffset, value.o, value.color, value.panelId);

				_this.props.onDraw(draw);
				data.push(draw);
			});

			this.dataSVG = data;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			var _this2 = this;

			var data = [];

			//Recalculate new positions on the panels
			this.props.data.positionData.map(function (value, key) {
				var draw = _this2.draw(value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color, value.panelId);

				_this2.props.onDraw(draw); //onDraw Callback occurs here
				data.push(draw);
			});

			this.dataSVG = data;
		}
	}, {
		key: 'draw',

		/**
   * Draws an Equilateral Triangle on the Canvas
   * @param x integer Cartesian X coordinate
   * @param y integer Cartesian Y coordinate
   * @param o integer Orientation in degrees
   * @param color hexadecimal color code Triangle Color i.e. #FF00FF
   * @param id integer the panel identifier
   */
		value: function draw(x, y, o, color, id) {
			var orient = false;
			var path = [];

			var centroid = this.cartesianToScreen(x, y);

			var topPoint = this.getTopFromCentroid(x, y);
			var leftPoint = this.getLeftFromCentroid(x, y);
			var rightPoint = this.getRightFromCentroid(x, y);

			var topRotatedPoint = this.rotateTopFromCentroid(x, y);
			var leftRotatedPoint = this.rotateLeftFromCentroid(x, y);
			var rightRotatedPoint = this.rotateRightFromCentroid(x, y);

			if (this.doRotate(o)) {

				path.push('M' + topRotatedPoint[0] + ' ' + topRotatedPoint[1]);
				path.push('L' + leftRotatedPoint[0] + ' ' + leftRotatedPoint[1]);
				path.push('L' + rightRotatedPoint[0] + ' ' + rightRotatedPoint[1]);
				path.push('L' + topRotatedPoint[0] + ' ' + topRotatedPoint[1]);

				orient = true;
			} else {

				path.push('M' + topPoint[0] + ' ' + topPoint[1]);
				path.push('L' + leftPoint[0] + ' ' + leftPoint[1]);
				path.push('L' + rightPoint[0] + ' ' + rightPoint[1]);
				path.push('L' + topPoint[0] + ' ' + topPoint[1]);
			}

			path.push("Z");
			path = path.join(" ");

			id = {
				x: centroid[0] - 3,
				y: centroid[1] + 15,
				id: id
			};

			if (orient) {
				return {
					topPoint: topRotatedPoint,
					leftPoint: leftRotatedPoint,
					rightPoint: rightRotatedPoint,
					centroid: centroid,
					rotated: true,
					color: color,
					path: path,
					id: id
				};
			} else {
				return {
					topPoint: topPoint,
					leftPoint: leftPoint,
					rightPoint: rightPoint,
					centroid: centroid,
					rotated: false,
					color: color,
					path: path,
					id: id
				};
			}
		}
	}, {
		key: 'cartesianToScreen',

		/**
   * Maps a cartesian point to a 2D HTML Canvas point
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
   */
		value: function cartesianToScreen(cx, cy) {
			var screenX = cx + this.props.width / 2;
			var screenY = this.props.height / 2 - cy;

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
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getTopFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [screen[0].toFixed(), (screen[1] - CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'getLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getLeftFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'getRightFromCentroid',

		/**
   * Calculates the right most point of the equilateral triangle given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function getRightFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
		}
	}, {
		key: 'rotateLeftFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateLeftFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()]; //30 is for spacing
		}
	}, {
		key: 'rotateRightFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateRightFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()];
		}
	}, {
		key: 'rotateTopFromCentroid',

		/**
   * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
   * @param cx integer Cartesian X coordinate
   * @param cy integer Cartesian Y coordinate
   * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
   */
		value: function rotateTopFromCentroid(cx, cy) {
			var screen = this.cartesianToScreen(cx, cy);

			return [screen[0].toFixed(), (screen[1] + CENTROID_HEIGHT + 30).toFixed()];
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'svg',
					{ height: this.props.width, width: this.props.height, style: { width: '100%', borderRadius: '50%' }, transform: 'rotate(' + this.props.rotation + ')' },
					this.dataSVG.map(function (value, key) {
						if (_this3.props.showId) {
							return _react2['default'].createElement(
								'g',
								{ key: key },
								_react2['default'].createElement('path', {
									key: key + "_path",
									d: value.path,
									strokeWidth: _this3.props.strokeWidth,
									onMouseOver: function (e) {
										_this3.props.onHover(value);
									},
									onMouseOut: function (e) {
										_this3.props.onExit(value);
									},
									onMouseDown: function (e) {
										_this3.props.onClick(value);
									},
									fill: value.color,
									stroke: _this3.props.strokeColor
								}),
								_react2['default'].createElement(
									'text',
									{
										key: key + "_text",
										x: value.id.x,
										y: value.id.y,
										fill: '#FFFFFF'
									},
									value.id.id
								)
							);
						} else {
							return _react2['default'].createElement('path', {
								key: key + "_path",
								d: value.path,
								strokeWidth: _this3.props.strokeWidth,
								onMouseOver: function (e) {
									_this3.props.onHover(value);
								},
								onMouseOut: function (e) {
									_this3.props.onExit(value);
								},
								onMouseDown: function (e) {
									_this3.props.onClick(value);
								},
								fill: value.color,
								stroke: _this3.props.strokeColor
							});
						}
					})
				)
			);
		}
	}], [{
		key: 'defaultProps',
		get: function get() {
			return {
				xOffset: 0,
				yOffset: 0,
				panelSpacing: 1.37,
				width: 1000,
				height: 1000,
				strokeColor: '#FFFFFF',
				onDraw: function onDraw(data) {
					return data;
				},
				showId: false,
				strokeWidth: 2,
				rotation: 0,
				onHover: function onHover(data) {
					return data;
				},
				onClick: function onClick(data) {
					return data;
				},
				onExit: function onExit(data) {
					return data;
				}
			};
		}
	}]);

	return NanoleafLayout;
})(_react.Component);

NanoleafLayout.propTypes = {
	height: _propTypes2['default'].number,
	width: _propTypes2['default'].number,
	data: _propTypes2['default'].object.isRequired, //should be array
	onDraw: _propTypes2['default'].func,
	panelSpacing: _propTypes2['default'].number,
	strokeColor: _propTypes2['default'].string,
	xOffset: _propTypes2['default'].number,
	yOffset: _propTypes2['default'].number,
	showId: _propTypes2['default'].bool,
	strokeWidth: _propTypes2['default'].number,
	rotation: _propTypes2['default'].number,
	onHover: _propTypes2['default'].func,
	onClick: _propTypes2['default'].func,
	onExit: _propTypes2['default'].func
};

exports['default'] = NanoleafLayout;
module.exports = exports['default'];

},{"mobx":undefined,"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZzZ2Yy9XZWJzdG9ybVByb2plY3RzL25hbm8vbmFub2xlYWYtbGF5b3V0L3NyYy9OYW5vbGVhZkxheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0lpQyxPQUFPOzs7O3lCQUNsQixZQUFZOzs7O29CQUNTLE1BQU07O0FBRWpELElBQU0sZUFBZSxHQUFHLEFBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksR0FBRyxDQUFDOztJQUUzQyxjQUFjO1dBQWQsY0FBYzs7QUFFUixVQUZOLGNBQWMsQ0FFUCxLQUFLLEVBQUU7d0JBRmQsY0FBYzs7QUFHbEIsNkJBSEksY0FBYyw2Q0FHWixLQUFLLEVBQUU7O0FBRVAsOEJBQWlCLElBQUksRUFBRTtBQUNuQixVQUFPLEVBQUUsSUFBSTtHQUNoQixDQUFDLENBQUE7RUFDUjs7Y0FSSSxjQUFjOztTQVVELDhCQUFHOzs7QUFDcEIsT0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVSLE9BQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDaEQsVUFBTSxJQUFJLEtBQUssQ0FBQyw0SEFBNEgsQ0FBQyxDQUFDO0lBQ2pKOztBQUVELE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDakQsUUFBSSxJQUFJLEdBQUcsTUFBSyxJQUFJLENBQUMsQUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQUssS0FBSyxDQUFDLFlBQVksR0FBSSxNQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUUsQUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQUssS0FBSyxDQUFDLFlBQVksR0FBSSxNQUFLLEtBQUssQ0FBQyxPQUFP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QUUsU0FBUztBQUN0QixVQUFNLEVBQUUsZ0JBQVMsSUFBSSxFQUFFO0FBQUUsWUFBTyxJQUFJLENBQUM7S0FBRTtBQUN2QyxVQUFNLEVBQUUsS0FBSztBQUNiLGVBQVcsRUFBRSxDQUFDO0FBQ2QsWUFBUSxFQUFFLENBQUM7QUFDWCxXQUFPLEVBQUUsaUJBQVMsSUFBSSxFQUFFO0FBQUUsWUFBTyxJQUFJLENBQUM7S0FBRTtBQUN4QyxXQUFPLEVBQUUsaUJBQVMsSUFBSSxFQUFFO0FBQUUsWUFBTyxJQUFJLENBQUM7S0FBRTtBQUN4QyxVQUFNLEVBQUUsZ0JBQVMsSUFBSSxFQUFFO0FBQUUsWUFBTyxJQUFJLENBQUM7S0FBRTtJQUN2QyxDQUFDO0dBQ0Y7OztRQTFESSxjQUFjOzs7QUF1UnBCLGNBQWMsQ0FBQyxTQUFTLEdBQUc7QUFDMUIsT0FBTSxFQUFFLHVCQUFVLE1BQU07QUFDeEIsTUFBSyxFQUFFLHVCQUFVLE1BQU07QUFDdkIsS0FBSSxFQUFFLHVCQUFVLE1BQU0sQ0FBQyxVQUFVO0FBQ2pDLE9BQU0sRUFBRSx1QkFBVSxJQUFJO0FBQ3RCLGFBQVksRUFBRSx1QkFBVSxNQUFNO0FBQzlCLFlBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLFFBQU8sRUFBRSx1QkFBVSxNQUFNO0FBQ3pCLFFBQU8sRUFBRSx1QkFBVSxNQUFNO0FBQ3pCLE9BQU0sRUFBRSx1QkFBVSxJQUFJO0FBQ3RCLFlBQVcsRUFBRSx1QkFBVSxNQUFNO0FBQzdCLFNBQVEsRUFBRSx1QkFBVSxNQUFNO0FBQzFCLFFBQU8sRUFBRSx1QkFBVSxJQUFJO0FBQ3ZCLFFBQU8sRUFBRSx1QkFBVSxJQUFJO0FBQ3ZCLE9BQU0sRUFBRSx1QkFBVSxJQUFJO0NBQ3RCLENBQUM7O3FCQUVhLGNBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IENocmlzdGlhbiBCYXJ0cmFtIG9uIDYvMjAvMTcuXG4gKiBHaXRodWIgQGNiYXJ0cmFtXG4gKi9cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtvYnNlcnZhYmxlLCBleHRlbmRPYnNlcnZhYmxlfSBmcm9tICdtb2J4J1xuXG5jb25zdCBDRU5UUk9JRF9IRUlHSFQgPSAoTWF0aC5zcXJ0KDMpIC8gNikgKiAxNTA7XG5cbmNsYXNzIE5hbm9sZWFmTGF5b3V0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuICAgICAgICBleHRlbmRPYnNlcnZhYmxlKHRoaXMsIHtcbiAgICAgICAgICAgIGRhdGFTVkc6IG51bGwsXG4gICAgICAgIH0pXG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRsZXQgZGF0YSA9IFtdOyAvL0RhdGEgdG8gbXV0YXRlIHN0YXRlXG5cbiAgICAgICAgaWYoIXRoaXMucHJvcHMuZGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25EYXRhJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgcHJvcGVydHk6IHBvc2l0aW9uRGF0YSBpbiBnaXZlbiBwcm9wLiBFbnN1cmUgdGhhdCB5b3VyIGRhdGEgaW5jbHVkZXMgYSBwb3NpdGlvbkRhdGEga2V5IHdpdGggYW4gYXJyYXkgdmFsdWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvcHMuZGF0YS5wb3NpdGlvbkRhdGEubWFwKCh2YWx1ZSkgPT4ge1xuXHRcdFx0bGV0IGRyYXcgPSB0aGlzLmRyYXcoKHZhbHVlLnggLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZykgKyB0aGlzLnByb3BzLnhPZmZzZXQsICh2YWx1ZS55IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy55T2Zmc2V0LCB2YWx1ZS5vLCB2YWx1ZS5jb2xvciwgdmFsdWUucGFuZWxJZCk7XG5cblx0XHRcdHRoaXMucHJvcHMub25EcmF3KGRyYXcpO1xuXHRcdFx0ZGF0YS5wdXNoKGRyYXcpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGF0YVNWRyA9IGRhdGE7XG5cdH07XG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcblx0XHRsZXQgZGF0YSA9IFtdO1xuXG5cdFx0Ly9SZWNhbGN1bGF0ZSBuZXcgcG9zaXRpb25zIG9uIHRoZSBwYW5lbHNcbiAgICAgICAgdGhpcy5wcm9wcy5kYXRhLnBvc2l0aW9uRGF0YS5tYXAoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBkcmF3ID0gdGhpcy5kcmF3KCh2YWx1ZS54IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcpICsgdGhpcy5wcm9wcy54T2Zmc2V0LCAodmFsdWUueSAvIHRoaXMucHJvcHMucGFuZWxTcGFjaW5nKSArIHRoaXMucHJvcHMueU9mZnNldCwgdmFsdWUubywgdmFsdWUuY29sb3IsIHZhbHVlLnBhbmVsSWQpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRHJhdyhkcmF3KTsgLy9vbkRyYXcgQ2FsbGJhY2sgb2NjdXJzIGhlcmVcbiAgICAgICAgICAgIGRhdGEucHVzaChkcmF3KTtcbiAgICAgICAgfSk7XG5cblx0XHR0aGlzLmRhdGFTVkcgPSBkYXRhO1xuICAgIH1cblxuXHRzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0eE9mZnNldDogMCxcblx0XHRcdHlPZmZzZXQ6IDAsXG5cdFx0XHRwYW5lbFNwYWNpbmc6IDEuMzcsXG5cdFx0XHR3aWR0aDogMTAwMCxcblx0XHRcdGhlaWdodDogMTAwMCxcblx0XHRcdHN0cm9rZUNvbG9yOiAnI0ZGRkZGRicsXG5cdFx0XHRvbkRyYXc6IGZ1bmN0aW9uKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0sXG5cdFx0XHRzaG93SWQ6IGZhbHNlLFxuXHRcdFx0c3Ryb2tlV2lkdGg6IDIsXG5cdFx0XHRyb3RhdGlvbjogMCxcblx0XHRcdG9uSG92ZXI6IGZ1bmN0aW9uKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0sXG5cdFx0XHRvbkNsaWNrOiBmdW5jdGlvbihkYXRhKSB7IHJldHVybiBkYXRhOyB9LFxuXHRcdFx0b25FeGl0OiBmdW5jdGlvbihkYXRhKSB7IHJldHVybiBkYXRhOyB9LFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYW4gRXF1aWxhdGVyYWwgVHJpYW5nbGUgb24gdGhlIENhbnZhc1xuXHQgKiBAcGFyYW0geCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIHkgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBvIGludGVnZXIgT3JpZW50YXRpb24gaW4gZGVncmVlc1xuXHQgKiBAcGFyYW0gY29sb3IgaGV4YWRlY2ltYWwgY29sb3IgY29kZSBUcmlhbmdsZSBDb2xvciBpLmUuICNGRjAwRkZcblx0ICogQHBhcmFtIGlkIGludGVnZXIgdGhlIHBhbmVsIGlkZW50aWZpZXJcblx0ICovXG5cdGRyYXcoeCwgeSwgbywgY29sb3IsIGlkKSB7XG4gICAgICAgIGxldCBvcmllbnQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBhdGggPSBbXTtcblxuICAgICAgICBsZXQgY2VudHJvaWQgPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKHgsIHkpO1xuXG4gICAgICAgIGxldCB0b3BQb2ludCA9IHRoaXMuZ2V0VG9wRnJvbUNlbnRyb2lkKHgsIHkpO1xuXHRcdGxldCBsZWZ0UG9pbnQgPSB0aGlzLmdldExlZnRGcm9tQ2VudHJvaWQoeCx5KTtcblx0XHRsZXQgcmlnaHRQb2ludCA9IHRoaXMuZ2V0UmlnaHRGcm9tQ2VudHJvaWQoeCwgeSk7XG5cblx0XHRsZXQgdG9wUm90YXRlZFBvaW50ID0gdGhpcy5yb3RhdGVUb3BGcm9tQ2VudHJvaWQoeCwgeSk7XG5cdFx0bGV0IGxlZnRSb3RhdGVkUG9pbnQgPSB0aGlzLnJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoeCwgeSk7XG5cdFx0bGV0IHJpZ2h0Um90YXRlZFBvaW50ID0gdGhpcy5yb3RhdGVSaWdodEZyb21DZW50cm9pZCh4LCB5KTtcblxuXHRcdGlmKHRoaXMuZG9Sb3RhdGUobykpIHtcblxuXHRcdFx0cGF0aC5wdXNoKGBNJHt0b3BSb3RhdGVkUG9pbnRbMF19ICR7dG9wUm90YXRlZFBvaW50WzFdfWApO1xuXHRcdFx0cGF0aC5wdXNoKGBMJHtsZWZ0Um90YXRlZFBvaW50WzBdfSAke2xlZnRSb3RhdGVkUG9pbnRbMV19YCk7XG5cdFx0XHRwYXRoLnB1c2goYEwke3JpZ2h0Um90YXRlZFBvaW50WzBdfSAke3JpZ2h0Um90YXRlZFBvaW50WzFdfWApO1xuXHRcdFx0cGF0aC5wdXNoKGBMJHt0b3BSb3RhdGVkUG9pbnRbMF19ICR7dG9wUm90YXRlZFBvaW50WzFdfWApO1xuXG5cdFx0XHRvcmllbnQgPSB0cnVlO1xuXHRcdFx0XG5cblx0XHR9IGVsc2Uge1xuXG4gICAgICAgICAgICBwYXRoLnB1c2goYE0ke3RvcFBvaW50WzBdfSAke3RvcFBvaW50WzFdfWApO1xuICAgICAgICAgICAgcGF0aC5wdXNoKGBMJHtsZWZ0UG9pbnRbMF19ICR7bGVmdFBvaW50WzFdfWApO1xuICAgICAgICAgICAgcGF0aC5wdXNoKGBMJHtyaWdodFBvaW50WzBdfSAke3JpZ2h0UG9pbnRbMV19YCk7XG4gICAgICAgICAgICBwYXRoLnB1c2goYEwke3RvcFBvaW50WzBdfSAke3RvcFBvaW50WzFdfWApO1xuXHRcdH1cblxuICAgICAgICBwYXRoLnB1c2goXCJaXCIpO1xuXHRcdHBhdGggPSBwYXRoLmpvaW4oXCIgXCIpO1xuXG5cdFx0aWQgPSB7XG4gICAgICAgICAgICB4OiBjZW50cm9pZFswXSAtIDMsXG4gICAgICAgICAgICB5OiBjZW50cm9pZFsxXSArIDE1LFxuICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYob3JpZW50KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0b3BQb2ludDogdG9wUm90YXRlZFBvaW50LFxuXHRcdFx0XHRsZWZ0UG9pbnQ6IGxlZnRSb3RhdGVkUG9pbnQsXG5cdFx0XHRcdHJpZ2h0UG9pbnQ6IHJpZ2h0Um90YXRlZFBvaW50LFxuXHRcdFx0XHRjZW50cm9pZDogY2VudHJvaWQsXG5cdFx0XHRcdHJvdGF0ZWQ6IHRydWUsXG5cdFx0XHRcdGNvbG9yOiBjb2xvcixcblx0XHRcdFx0cGF0aDogcGF0aCxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0b3BQb2ludDogdG9wUG9pbnQsXG5cdFx0XHRcdGxlZnRQb2ludDogbGVmdFBvaW50LFxuXHRcdFx0XHRyaWdodFBvaW50OiByaWdodFBvaW50LFxuXHRcdFx0XHRjZW50cm9pZDogY2VudHJvaWQsXG5cdFx0XHRcdHJvdGF0ZWQ6IGZhbHNlLFxuXHRcdFx0XHRjb2xvcjogY29sb3IsXG5cdFx0XHRcdHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgaWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cdC8qKlxuXHQgKiBNYXBzIGEgY2FydGVzaWFuIHBvaW50IHRvIGEgMkQgSFRNTCBDYW52YXMgcG9pbnRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2hlcmUgdGhlIFNjcmVlbiBwb2ludCB4IGlzIGluIHBvc2l0aW9uIDAgYW5kIHRoZSBzY3JlZW4gcG9pbnQgWSBpcyBpbiBwb3NpdGlvbiAxXG5cdCAqL1xuXHRjYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuWCA9IGN4ICsgdGhpcy5wcm9wcy53aWR0aCAvIDI7XG5cdFx0bGV0IHNjcmVlblkgPSB0aGlzLnByb3BzLmhlaWdodCAvIDIgLSBjeTtcblxuXHRcdHJldHVybiBbc2NyZWVuWCwgc2NyZWVuWV07XG5cdH07XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRyaWFuZ2xlIHNob3VsZCBiZSByb3RhdGVkXG5cdCAqIEBwYXJhbSByb3RhdGlvbiBpbnRlZ2VyIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHJvdGF0aW9uIHNob3VsZCBvY2N1ciBmYWxzZSBvdGhlcndpc2Vcblx0ICovXG5cdCBkb1JvdGF0ZShyb3RhdGlvbikge1xuXHRcdHJldHVybiAocm90YXRpb24gLyA2MCkgJSAyICE9PSAwIDtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgdG9wIG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0Z2V0VG9wRnJvbUNlbnRyb2lkKGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gW3NjcmVlblswXS50b0ZpeGVkKCksIChzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKV07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRMZWZ0RnJvbUNlbnRyb2lkKGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gWyhzY3JlZW5bMF0gLSBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKSwgKHNjcmVlblsxXSArIENFTlRST0lEX0hFSUdIVCkudG9GaXhlZCgpXTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgcmlnaHQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgZ2l2ZW4gdGhlIGNlbnRyb2lkXG5cdCAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcblx0ICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuXHQgKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG5cdCAqL1xuXHRnZXRSaWdodEZyb21DZW50cm9pZChjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFsoc2NyZWVuWzBdICsgQ0VOVFJPSURfSEVJR0hUKS50b0ZpeGVkKCksIChzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKV07XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuXHQgKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG5cdCAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcblx0ICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuXHQgKi9cblx0cm90YXRlTGVmdEZyb21DZW50cm9pZChjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFsoc2NyZWVuWzBdIC0gQ0VOVFJPSURfSEVJR0hUKS50b0ZpeGVkKCksIChzY3JlZW5bMV0gLSBDRU5UUk9JRF9IRUlHSFQgKyAzMCkudG9GaXhlZCgpXTsgLy8zMCBpcyBmb3Igc3BhY2luZ1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIHRoYXQgaXMgcm90YXRlZCAxODAgZGVncmVlcyBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZVJpZ2h0RnJvbUNlbnRyb2lkKGN4LCBjeSkge1xuXHRcdGxldCBzY3JlZW4gPSB0aGlzLmNhcnRlc2lhblRvU2NyZWVuKGN4LCBjeSk7XG5cblx0XHRyZXR1cm4gWyhzY3JlZW5bMF0gKyBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKSwgKHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCArIDMwKS50b0ZpeGVkKCldO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIHRoYXQgaXMgcm90YXRlZCAxODAgZGVncmVlcyBnaXZlbiB0aGUgY2VudHJvaWRcblx0ICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuXHQgKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG5cdCAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cblx0ICovXG5cdHJvdGF0ZVRvcEZyb21DZW50cm9pZChjeCwgY3kpIHtcblx0XHRsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3kpO1xuXG5cdFx0cmV0dXJuIFtzY3JlZW5bMF0udG9GaXhlZCgpLCAoc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUICsgMzApLnRvRml4ZWQoKV07XG5cdH07XG5cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxzdmcgaGVpZ2h0PXt0aGlzLnByb3BzLndpZHRofSB3aWR0aD17dGhpcy5wcm9wcy5oZWlnaHR9IHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgYm9yZGVyUmFkaXVzOic1MCUnfX0gdHJhbnNmb3JtPXtgcm90YXRlKCR7dGhpcy5wcm9wcy5yb3RhdGlvbn0pYH0gPlxuXHRcdFx0XHRcdHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNWRy5tYXAoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0aWYodGhpcy5wcm9wcy5zaG93SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHRcdDxnIGtleT17a2V5fT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRrZXk9e2tleSArIFwiX3BhdGhcIn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkPXt2YWx1ZS5wYXRofVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cm9rZVdpZHRoPXt0aGlzLnByb3BzLnN0cm9rZVdpZHRofVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uTW91c2VPdmVyPXsoZSkgPT4geyB0aGlzLnByb3BzLm9uSG92ZXIodmFsdWUpIH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25Nb3VzZU91dD17KGUpID0+IHsgdGhpcy5wcm9wcy5vbkV4aXQodmFsdWUpIH19XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25Nb3VzZURvd249eyhlKSA9PiB7IHRoaXMucHJvcHMub25DbGljayh2YWx1ZSkgfX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxsPXt2YWx1ZS5jb2xvcn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHJva2U9e3RoaXMucHJvcHMuc3Ryb2tlQ29sb3J9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5PXtrZXkgKyBcIl90ZXh0XCJ9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0eD17dmFsdWUuaWQueH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR5PXt2YWx1ZS5pZC55fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbGw9XCIjRkZGRkZGXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Pnt2YWx1ZS5pZC5pZH08L3RleHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2c+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleT17a2V5ICsgXCJfcGF0aFwifVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGQ9e3ZhbHVlLnBhdGh9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3Ryb2tlV2lkdGg9e3RoaXMucHJvcHMuc3Ryb2tlV2lkdGh9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25Nb3VzZU92ZXI9eyhlKSA9PiB7IHRoaXMucHJvcHMub25Ib3Zlcih2YWx1ZSkgfX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbk1vdXNlT3V0PXsoZSkgPT4geyB0aGlzLnByb3BzLm9uRXhpdCh2YWx1ZSkgfX1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvbk1vdXNlRG93bj17KGUpID0+IHsgdGhpcy5wcm9wcy5vbkNsaWNrKHZhbHVlKSB9fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbGw9e3ZhbHVlLmNvbG9yfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cm9rZT17dGhpcy5wcm9wcy5zdHJva2VDb2xvcn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHRcdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbk5hbm9sZWFmTGF5b3V0LnByb3BUeXBlcyA9IHtcblx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcblx0ZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvL3Nob3VsZCBiZSBhcnJheVxuXHRvbkRyYXc6IFByb3BUeXBlcy5mdW5jLFxuXHRwYW5lbFNwYWNpbmc6IFByb3BUeXBlcy5udW1iZXIsXG5cdHN0cm9rZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR4T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHR5T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzaG93SWQ6IFByb3BUeXBlcy5ib29sLFxuXHRzdHJva2VXaWR0aDogUHJvcFR5cGVzLm51bWJlcixcblx0cm90YXRpb246IFByb3BUeXBlcy5udW1iZXIsXG5cdG9uSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblx0b25FeGl0OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hbm9sZWFmTGF5b3V0OyJdfQ==
