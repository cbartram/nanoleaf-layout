require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Christian Bartram
 * Github @cbartram
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cartesianToScreen = cartesianToScreen;
exports.doRotate = doRotate;
exports.getTopFromCentroid = getTopFromCentroid;
exports.getLeftFromCentroid = getLeftFromCentroid;
exports.getRightFromCentroid = getRightFromCentroid;
exports.rotateLeftFromCentroid = rotateLeftFromCentroid;
exports.rotateRightFromCentroid = rotateRightFromCentroid;
exports.rotateTopFromCentroid = rotateTopFromCentroid;
var CENTROID_HEIGHT = Math.sqrt(3) / 6 * 150;

/**
 * Maps a cartesian point to a 2D HTML Canvas point
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array where the Screen point x is in position 0 and the screen point Y is in position 1
 */

function cartesianToScreen(cx, cy, height, width) {
    var screenX = cx + width / 2;
    var screenY = height / 2 - cy;

    return [screenX, screenY];
}

/**
 * Determines if the given triangle should be rotated
 * @param rotation integer rotation in degrees
 * @returns {boolean} true if the rotation should occur false otherwise
 */

function doRotate(rotation) {
    return rotation / 60 % 2 !== 0;
}

/**
 * Calculates the top most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getTopFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [screen[0].toFixed(), (screen[1] - CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getLeftFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the right most point of the equilateral triangle given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function getRightFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] + CENTROID_HEIGHT).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateLeftFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] - CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()]; //30 is for spacing
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateRightFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [(screen[0] + CENTROID_HEIGHT).toFixed(), (screen[1] - CENTROID_HEIGHT + 30).toFixed()];
}

/**
 * Calculates the left most point of the equilateral triangle that is rotated 180 degrees given the centroid
 * @param cx integer Cartesian X coordinate
 * @param cy integer Cartesian Y coordinate
 * @param height integer the height of the SVG
 * @param width integer the width of the SVG
 * @returns {[*,*]} Array with the x coordinate in the 0 position and the Y coordinate in the 1st position
 */

function rotateTopFromCentroid(cx, cy, height, width) {
    var screen = this.cartesianToScreen(cx, cy, height, width);

    return [screen[0].toFixed(), (screen[1] + CENTROID_HEIGHT + 30).toFixed()];
}

},{}],"nanoleaf-layout":[function(require,module,exports){
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Utils = require('./Utils');

var Utils = _interopRequireWildcard(_Utils);

var NanoleafLayout = (function (_Component) {
    _inherits(NanoleafLayout, _Component);

    function NanoleafLayout(props) {
        _classCallCheck(this, NanoleafLayout);

        _get(Object.getPrototypeOf(NanoleafLayout.prototype), 'constructor', this).call(this, props);

        this.state = {
            dataSVG: []
        };
    }

    _createClass(NanoleafLayout, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this = this;

            var data = []; //Data to mutate state

            if (!this.props.data.hasOwnProperty('positionData')) {
                throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
            }

            this.props.data.positionData.map(function (value) {
                var draw = _this.calculate(value.x / _this.props.panelSpacing + _this.props.xOffset, value.y / _this.props.panelSpacing + _this.props.yOffset, value.o, value.color, value.panelId, _this.props.height, _this.props.width);

                _this.props.onDraw(draw);
                data.push(draw);
            });

            this.setState({ dataSVG: data });
        }
    }, {
        key: 'calculate',

        /**
         * Draws an Equilateral Triangle on the Canvas
         * @param x integer Cartesian X coordinate
         * @param y integer Cartesian Y coordinate
         * @param o integer Orientation in degrees
         * @param color hexadecimal color code Triangle Color i.e. #FF00FF
        * @param height integer height of the SVG
        * @param width integer width of the SVG
         * @param id integer the panel identifier
         */
        value: function calculate(x, y, o, color, id, height, width) {
            var centroid = Utils.cartesianToScreen(x, y, height, width);

            //The Id that is drawn on top of the SVG when the showIds prop is true
            var panelID = {
                x: centroid[0] - 3,
                y: centroid[1] + 15,
                id: id
            };

            if (Utils.doRotate(o)) {
                var topRotatedPoint = Utils.rotateTopFromCentroid(x, y, height, width);
                var leftRotatedPoint = Utils.rotateLeftFromCentroid(x, y, height, width);
                var rightRotatedPoint = Utils.rotateRightFromCentroid(x, y, height, width);

                var path = 'M' + topRotatedPoint[0] + ' ' + topRotatedPoint[1] + ' L' + leftRotatedPoint[0] + ' ' + leftRotatedPoint[1] + ' L' + rightRotatedPoint[0] + ' ' + rightRotatedPoint[1] + ' L' + topRotatedPoint[0] + ' ' + topRotatedPoint[1] + ' Z';

                return {
                    topPoint: topRotatedPoint,
                    leftPoint: leftRotatedPoint,
                    rightPoint: rightRotatedPoint,
                    centroid: centroid,
                    rotated: true,
                    color: color,
                    path: path,
                    id: id,
                    panelID: panelID
                };
            } else {
                var topPoint = Utils.getTopFromCentroid(x, y, height, width);
                var leftPoint = Utils.getLeftFromCentroid(x, y, height, width);
                var rightPoint = Utils.getRightFromCentroid(x, y, height, width);

                var path = 'M' + topPoint[0] + ' ' + topPoint[1] + ' L' + leftPoint[0] + ' ' + leftPoint[1] + ' L' + rightPoint[0] + ' ' + rightPoint[1] + ' L' + topPoint[0] + ' ' + topPoint[1] + ' Z';

                return {
                    topPoint: topPoint,
                    leftPoint: leftPoint,
                    rightPoint: rightPoint,
                    centroid: centroid,
                    rotated: false,
                    color: color,
                    path: path,
                    id: id,
                    panelID: panelID
                };
            }
        }

        /**
        * Handles recalculating values and updating when the layout changes
         * @returns {Array}
         */
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            var data = []; //Data to mutate state

            if (!this.props.data.hasOwnProperty('positionData')) {
                throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
            }

            this.props.data.positionData.map(function (value) {
                var draw = _this2.calculate(value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color, value.panelId, _this2.props.height, _this2.props.width);

                _this2.props.onDraw(draw);
                data.push(draw);
            });

            return data.map(function (value, key) {
                if (_this2.props.showId) {
                    return _react2['default'].createElement(
                        'g',
                        { key: key },
                        _react2['default'].createElement('path', {
                            key: key + '_path',
                            d: value.path,
                            strokeWidth: _this2.props.strokeWidth,
                            onMouseOver: function (e) {
                                _this2.props.onHover(value);
                            },
                            onMouseOut: function (e) {
                                _this2.props.onExit(value);
                            },
                            onMouseDown: function (e) {
                                _this2.props.onClick(value);
                            },
                            fill: value.color,
                            stroke: _this2.props.strokeColor
                        }),
                        _react2['default'].createElement(
                            'text',
                            {
                                key: key + '_text',
                                x: value.panelID.x,
                                y: value.panelID.y,
                                fill: '#FFFFFF'
                            },
                            value.id
                        )
                    );
                } else {
                    return _react2['default'].createElement('path', {
                        key: key + '_path',
                        d: value.path,
                        strokeWidth: _this2.props.strokeWidth,
                        onMouseOver: function (e) {
                            _this2.props.onHover(value);
                        },
                        onMouseOut: function (e) {
                            _this2.props.onExit(value);
                        },
                        onMouseDown: function (e) {
                            _this2.props.onClick(value);
                        },
                        fill: value.color,
                        stroke: _this2.props.strokeColor
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'svg',
                    { height: this.props.width, width: this.props.height, style: { width: '100%', borderRadius: '50%' }, transform: 'rotate(' + this.props.rotation + ')' },
                    this.update()
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

},{"./Utils":1,"prop-types":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZzZ2Yy9XZWJzdG9ybVByb2plY3RzL25hbm8vbmFub2xlYWYtbGF5b3V0L3NyYy9VdGlscy5qcyIsIi9Vc2Vycy9nNnZjL1dlYnN0b3JtUHJvamVjdHMvbmFuby9uYW5vbGVhZi1sYXlvdXQvc3JjL05hbm9sZWFmTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJQSxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7Ozs7O0FBV3hDLFNBQVMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFFBQUksT0FBTyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLFFBQUksT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUU5QixXQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQzdCOzs7Ozs7OztBQU9NLFNBQVMsUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUMvQixXQUFPLFFBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNsQzs7Ozs7Ozs7Ozs7QUFVTSxTQUFTLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN0RCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTNELFdBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFBLENBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUN6RTs7Ozs7Ozs7Ozs7QUFVTSxTQUFTLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN2RCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTNELFdBQU8sQ0FDSCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUEsQ0FBRSxPQUFPLEVBQUUsRUFDdkMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFBLENBQUUsT0FBTyxFQUFFLENBQzFDLENBQUM7Q0FDTDs7Ozs7Ozs7Ozs7QUFVTSxTQUFTLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4RCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTNELFdBQU8sQ0FDSCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUEsQ0FBRSxPQUFPLEVBQUUsRUFDdkMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFBLENBQUUsT0FBTyxFQUFFLENBQzFDLENBQUM7Q0FDTDs7Ozs7Ozs7Ozs7QUFVTSxTQUFTLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUMxRCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTNELFdBQU8sQ0FDSCxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUEsQ0FBRSxPQUFPLEVBQUUsRUFDdkMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQSxDQUFFLE9BQU8sRUFBRSxDQUMvQyxDQUFDO0NBQ0w7Ozs7Ozs7Ozs7O0FBVU0sU0FBUyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDM0QsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUUzRCxXQUFPLENBQ0gsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFBLENBQUUsT0FBTyxFQUFFLEVBQ3ZDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUEsQ0FBRSxPQUFPLEVBQUUsQ0FDL0MsQ0FBQztDQUNMOzs7Ozs7Ozs7OztBQVVNLFNBQVMscUJBQXFCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3pELFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFM0QsV0FBTyxDQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDcEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQSxDQUFFLE9BQU8sRUFBRSxDQUMvQyxDQUFDO0NBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDNUhnQyxPQUFPOzs7O3lCQUNsQixZQUFZOzs7O3FCQUNYLFNBQVM7O0lBQXBCLEtBQUs7O0lBRVgsY0FBYztjQUFkLGNBQWM7O0FBQ0wsYUFEVCxjQUFjLENBQ0osS0FBSyxFQUFFOzhCQURqQixjQUFjOztBQUVaLG1DQUZGLGNBQWMsNkNBRU4sS0FBSyxFQUFFOztBQUViLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxtQkFBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO0tBQ0w7O2lCQVBDLGNBQWM7O2VBU0MsNkJBQUc7QUFDaEIsZ0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmOzs7ZUFFRyxnQkFBRzs7O0FBQ0gsZ0JBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNqRCxzQkFBTSxJQUFJLEtBQUssQ0FDWCw0SEFBNEgsQ0FDL0gsQ0FBQzthQUNMOztBQUVELGdCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3RDLG9CQUFJLElBQUksR0FBRyxNQUFLLFNBQVMsQ0FDckIsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFLLEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBSyxLQUFLLENBQUMsT0FBTyxFQUN0RCxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQUssS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFLLEtBQUssQ0FBQyxPQUFPLEVBQ3RELEtBQUssQ0FBQyxDQUFDLEVBQ1AsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsT0FBTyxFQUNiLE1BQUssS0FBSyxDQUFDLE1BQU0sRUFDakIsTUFBSyxLQUFLLENBQUMsS0FBSyxDQUNuQixDQUFDOztBQUVGLHNCQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsb0JBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkIsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdkM7Ozs7Ozs7Ozs7Ozs7O2VBd0NXLG1CQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN6QyxnQkFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7QUFHNUQsZ0JBQUksT0FBTyxHQUFHO0FBQ1YsaUJBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixpQkFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ25CLGtCQUFFLEVBQUUsRUFBRTthQUNULENBQUM7O0FBRUYsZ0JBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNuQixvQkFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZFLG9CQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RSxvQkFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTNFLG9CQUFJLElBQUksU0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxVQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxVQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQUksQ0FBQzs7QUFFek0sdUJBQU87QUFDSCw0QkFBUSxFQUFFLGVBQWU7QUFDekIsNkJBQVMsRUFBRSxnQkFBZ0I7QUFDM0IsOEJBQVUsRUFBRSxpQkFBaUI7QUFDN0IsNEJBQVEsRUFBRSxRQUFRO0FBQ2xCLDJCQUFPLEVBQUUsSUFBSTtBQUNiLHlCQUFLLEVBQUwsS0FBSztBQUNMLHdCQUFJLEVBQUosSUFBSTtBQUNKLHNCQUFFLEVBQUYsRUFBRTtBQUNGLDJCQUFPLEVBQVAsT0FBTztpQkFDVixDQUFDO2FBQ0wsTUFBTTtBQUNILG9CQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0Qsb0JBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRCxvQkFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUVqRSxvQkFBSSxJQUFJLFNBQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBSSxDQUFDOztBQUVqSix1QkFBTztBQUNILDRCQUFRLEVBQUUsUUFBUTtBQUNsQiw2QkFBUyxFQUFFLFNBQVM7QUFDcEIsOEJBQVUsRUFBRSxVQUFVO0FBQ3RCLDRCQUFRLEVBQUUsUUFBUTtBQUNsQiwyQkFBTyxFQUFFLEtBQUs7QUFDZCx5QkFBSyxFQUFMLEtBQUs7QUFDTCx3QkFBSSxFQUFKLElBQUk7QUFDSixzQkFBRSxFQUFGLEVBQUU7QUFDRiwyQkFBTyxFQUFQLE9BQU87aUJBQ1YsQ0FBQzthQUNMO1NBQ0o7Ozs7Ozs7O2VBTUssa0JBQUc7OztBQUVMLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDakQsc0JBQU0sSUFBSSxLQUFLLENBQ1gsNEhBQTRILENBQy9ILENBQUM7YUFDTDs7QUFFRCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN0QyxvQkFBSSxJQUFJLEdBQUcsT0FBSyxTQUFTLENBQ3JCLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQUssS0FBSyxDQUFDLE9BQU8sRUFDdEQsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFLLEtBQUssQ0FBQyxZQUFZLEdBQUcsT0FBSyxLQUFLLENBQUMsT0FBTyxFQUN0RCxLQUFLLENBQUMsQ0FBQyxFQUNQLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLE9BQU8sRUFDYixPQUFLLEtBQUssQ0FBQyxNQUFNLEVBQ2pCLE9BQUssS0FBSyxDQUFDLEtBQUssQ0FDbkIsQ0FBQzs7QUFFRix1QkFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLG9CQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CLENBQUMsQ0FBQzs7QUFFTCxtQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUMvQixvQkFBRyxPQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDakIsMkJBQ1I7OzBCQUFHLEdBQUcsRUFBRSxHQUFHLEFBQUM7d0JBQ1g7QUFDQywrQkFBRyxFQUFFLEdBQUcsR0FBRyxPQUFPLEFBQUM7QUFDbkIsNkJBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxBQUFDO0FBQ2QsdUNBQVcsRUFBRSxPQUFLLEtBQUssQ0FBQyxXQUFXLEFBQUM7QUFDcEMsdUNBQVcsRUFBRSxVQUFBLENBQUMsRUFBSTtBQUNJLHVDQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQzdCLEFBQUM7QUFDcEIsc0NBQVUsRUFBRSxVQUFBLENBQUMsRUFBSTtBQUNLLHVDQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQzVCLEFBQUM7QUFDcEIsdUNBQVcsRUFBRSxVQUFBLENBQUMsRUFBSTtBQUNJLHVDQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQzdCLEFBQUM7QUFDcEIsZ0NBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQ2xCLGtDQUFNLEVBQUUsT0FBSyxLQUFLLENBQUMsV0FBVyxBQUFDOzBCQUM5Qjt3QkFDRjs7O0FBQ0MsbUNBQUcsRUFBRSxHQUFHLEdBQUcsT0FBTyxBQUFDO0FBQ25CLGlDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEFBQUM7QUFDbkIsaUNBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQUFBQztBQUNuQixvQ0FBSSxFQUFDLFNBQVM7OzRCQUVLLEtBQUssQ0FBQyxFQUFFO3lCQUNyQjtxQkFDSixDQUNNO2lCQUNMLE1BQU07QUFDUCwyQkFDSjtBQUNDLDJCQUFHLEVBQUUsR0FBRyxHQUFHLE9BQU8sQUFBQztBQUNuQix5QkFBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEFBQUM7QUFDZCxtQ0FBVyxFQUFFLE9BQUssS0FBSyxDQUFDLFdBQVcsQUFBQztBQUNwQyxtQ0FBVyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ0MsbUNBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDN0IsQUFBQztBQUNqQixrQ0FBVSxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ0UsbUNBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDNUIsQUFBQztBQUNqQixtQ0FBVyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ0MsbUNBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDN0IsQUFBQztBQUNqQiw0QkFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLEFBQUM7QUFDbEIsOEJBQU0sRUFBRSxPQUFLLEtBQUssQ0FBQyxXQUFXLEFBQUM7c0JBQzlCLENBQ0Y7aUJBQ0Q7YUFDQyxDQUFDLENBQUE7U0FDSDs7O2VBRVEsa0JBQUc7QUFDTCxtQkFDTDs7O2dCQUNDOztzQkFBSyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEFBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQUFBQyxFQUFDLFNBQVMsY0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsTUFBSTtvQkFDbkksSUFBSSxDQUFDLE1BQU0sRUFBRTtpQkFDeEI7YUFDRCxDQUNDO1NBQ0w7OzthQS9Lc0IsZUFBRztBQUN0QixtQkFBTztBQUNILHVCQUFPLEVBQUUsQ0FBQztBQUNWLHVCQUFPLEVBQUUsQ0FBQztBQUNWLDRCQUFZLEVBQUUsSUFBSTtBQUNsQixxQkFBSyxFQUFFLElBQUk7QUFDWCxzQkFBTSxFQUFFLElBQUk7QUFDWiwyQkFBVyxFQUFFLFNBQVM7QUFDdEIsc0JBQU0sRUFBRSxnQkFBUyxJQUFJLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO0FBQ0Qsc0JBQU0sRUFBRSxLQUFLO0FBQ2IsMkJBQVcsRUFBRSxDQUFDO0FBQ2Qsd0JBQVEsRUFBRSxDQUFDO0FBQ1gsdUJBQU8sRUFBRSxpQkFBUyxJQUFJLEVBQUU7QUFDcEIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO0FBQ0QsdUJBQU8sRUFBRSxpQkFBUyxJQUFJLEVBQUU7QUFDcEIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO0FBQ0Qsc0JBQU0sRUFBRSxnQkFBUyxJQUFJLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0osQ0FBQztTQUNMOzs7V0FsRUMsY0FBYzs7O0FBNE5wQixjQUFjLENBQUMsU0FBUyxHQUFHO0FBQ3ZCLFVBQU0sRUFBRSx1QkFBVSxNQUFNO0FBQ3hCLFNBQUssRUFBRSx1QkFBVSxNQUFNO0FBQ3ZCLFFBQUksRUFBRSx1QkFBVSxNQUFNLENBQUMsVUFBVTtBQUNqQyxVQUFNLEVBQUUsdUJBQVUsSUFBSTtBQUN0QixnQkFBWSxFQUFFLHVCQUFVLE1BQU07QUFDOUIsZUFBVyxFQUFFLHVCQUFVLE1BQU07QUFDN0IsV0FBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsV0FBTyxFQUFFLHVCQUFVLE1BQU07QUFDekIsVUFBTSxFQUFFLHVCQUFVLElBQUk7QUFDdEIsZUFBVyxFQUFFLHVCQUFVLE1BQU07QUFDN0IsWUFBUSxFQUFFLHVCQUFVLE1BQU07QUFDMUIsV0FBTyxFQUFFLHVCQUFVLElBQUk7QUFDdkIsV0FBTyxFQUFFLHVCQUFVLElBQUk7QUFDdkIsVUFBTSxFQUFFLHVCQUFVLElBQUk7Q0FDekIsQ0FBQzs7cUJBRWEsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgQ2hyaXN0aWFuIEJhcnRyYW1cbiAqIEdpdGh1YiBAY2JhcnRyYW1cbiAqL1xuY29uc3QgQ0VOVFJPSURfSEVJR0hUID0gTWF0aC5zcXJ0KDMpIC8gNiAqIDE1MDtcblxuXG4vKipcbiAqIE1hcHMgYSBjYXJ0ZXNpYW4gcG9pbnQgdG8gYSAyRCBIVE1MIENhbnZhcyBwb2ludFxuICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuICogQHBhcmFtIGhlaWdodCBpbnRlZ2VyIHRoZSBoZWlnaHQgb2YgdGhlIFNWR1xuICogQHBhcmFtIHdpZHRoIGludGVnZXIgdGhlIHdpZHRoIG9mIHRoZSBTVkdcbiAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2hlcmUgdGhlIFNjcmVlbiBwb2ludCB4IGlzIGluIHBvc2l0aW9uIDAgYW5kIHRoZSBzY3JlZW4gcG9pbnQgWSBpcyBpbiBwb3NpdGlvbiAxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3ksIGhlaWdodCwgd2lkdGgpIHtcbiAgICBsZXQgc2NyZWVuWCA9IGN4ICsgd2lkdGggLyAyO1xuICAgIGxldCBzY3JlZW5ZID0gaGVpZ2h0IC8gMiAtIGN5O1xuXG4gICAgcmV0dXJuIFtzY3JlZW5YLCBzY3JlZW5ZXTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0cmlhbmdsZSBzaG91bGQgYmUgcm90YXRlZFxuICogQHBhcmFtIHJvdGF0aW9uIGludGVnZXIgcm90YXRpb24gaW4gZGVncmVlc1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHJvdGF0aW9uIHNob3VsZCBvY2N1ciBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvUm90YXRlKHJvdGF0aW9uKSB7XG4gICAgcmV0dXJuIHJvdGF0aW9uIC8gNjAgJSAyICE9PSAwO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHRvcCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcbiAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSBoZWlnaHQgaW50ZWdlciB0aGUgaGVpZ2h0IG9mIHRoZSBTVkdcbiAqIEBwYXJhbSB3aWR0aCBpbnRlZ2VyIHRoZSB3aWR0aCBvZiB0aGUgU1ZHXG4gKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3BGcm9tQ2VudHJvaWQoY3gsIGN5LCBoZWlnaHQsIHdpZHRoKSB7XG4gICAgbGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3gsIGN5LCBoZWlnaHQsIHdpZHRoKTtcblxuICAgIHJldHVybiBbc2NyZWVuWzBdLnRvRml4ZWQoKSwgKHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCkudG9GaXhlZCgpXTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3QgcG9pbnQgb2YgdGhlIGVxdWlsYXRlcmFsIHRyaWFuZ2xlIGdpdmVuIHRoZSBjZW50cm9pZFxuICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuICogQHBhcmFtIGhlaWdodCBpbnRlZ2VyIHRoZSBoZWlnaHQgb2YgdGhlIFNWR1xuICogQHBhcmFtIHdpZHRoIGludGVnZXIgdGhlIHdpZHRoIG9mIHRoZSBTVkdcbiAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExlZnRGcm9tQ2VudHJvaWQoY3gsIGN5LCBoZWlnaHQsIHdpZHRoKSB7XG4gICAgbGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3gsIGN5LCBoZWlnaHQsIHdpZHRoKTtcblxuICAgIHJldHVybiBbXG4gICAgICAgIChzY3JlZW5bMF0gLSBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKSxcbiAgICAgICAgKHNjcmVlblsxXSArIENFTlRST0lEX0hFSUdIVCkudG9GaXhlZCgpXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSByaWdodCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSBnaXZlbiB0aGUgY2VudHJvaWRcbiAqIEBwYXJhbSBjeCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSBjeSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSBoZWlnaHQgaW50ZWdlciB0aGUgaGVpZ2h0IG9mIHRoZSBTVkdcbiAqIEBwYXJhbSB3aWR0aCBpbnRlZ2VyIHRoZSB3aWR0aCBvZiB0aGUgU1ZHXG4gKiBAcmV0dXJucyB7WyosKl19IEFycmF5IHdpdGggdGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgMCBwb3NpdGlvbiBhbmQgdGhlIFkgY29vcmRpbmF0ZSBpbiB0aGUgMXN0IHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSaWdodEZyb21DZW50cm9pZChjeCwgY3ksIGhlaWdodCwgd2lkdGgpIHtcbiAgICBsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3ksIGhlaWdodCwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgKHNjcmVlblswXSArIENFTlRST0lEX0hFSUdIVCkudG9GaXhlZCgpLFxuICAgICAgICAoc2NyZWVuWzFdICsgQ0VOVFJPSURfSEVJR0hUKS50b0ZpeGVkKClcbiAgICBdO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuICogQHBhcmFtIGhlaWdodCBpbnRlZ2VyIHRoZSBoZWlnaHQgb2YgdGhlIFNWR1xuICogQHBhcmFtIHdpZHRoIGludGVnZXIgdGhlIHdpZHRoIG9mIHRoZSBTVkdcbiAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoY3gsIGN5LCBoZWlnaHQsIHdpZHRoKSB7XG4gICAgbGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3gsIGN5LCBoZWlnaHQsIHdpZHRoKTtcblxuICAgIHJldHVybiBbXG4gICAgICAgIChzY3JlZW5bMF0gLSBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKSxcbiAgICAgICAgKHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCArIDMwKS50b0ZpeGVkKClcbiAgICBdOyAvLzMwIGlzIGZvciBzcGFjaW5nXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IHBvaW50IG9mIHRoZSBlcXVpbGF0ZXJhbCB0cmlhbmdsZSB0aGF0IGlzIHJvdGF0ZWQgMTgwIGRlZ3JlZXMgZ2l2ZW4gdGhlIGNlbnRyb2lkXG4gKiBAcGFyYW0gY3ggaW50ZWdlciBDYXJ0ZXNpYW4gWCBjb29yZGluYXRlXG4gKiBAcGFyYW0gY3kgaW50ZWdlciBDYXJ0ZXNpYW4gWSBjb29yZGluYXRlXG4gKiBAcGFyYW0gaGVpZ2h0IGludGVnZXIgdGhlIGhlaWdodCBvZiB0aGUgU1ZHXG4gKiBAcGFyYW0gd2lkdGggaW50ZWdlciB0aGUgd2lkdGggb2YgdGhlIFNWR1xuICogQHJldHVybnMge1sqLCpdfSBBcnJheSB3aXRoIHRoZSB4IGNvb3JkaW5hdGUgaW4gdGhlIDAgcG9zaXRpb24gYW5kIHRoZSBZIGNvb3JkaW5hdGUgaW4gdGhlIDFzdCBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlUmlnaHRGcm9tQ2VudHJvaWQoY3gsIGN5LCBoZWlnaHQsIHdpZHRoKSB7XG4gICAgbGV0IHNjcmVlbiA9IHRoaXMuY2FydGVzaWFuVG9TY3JlZW4oY3gsIGN5LCBoZWlnaHQsIHdpZHRoKTtcblxuICAgIHJldHVybiBbXG4gICAgICAgIChzY3JlZW5bMF0gKyBDRU5UUk9JRF9IRUlHSFQpLnRvRml4ZWQoKSxcbiAgICAgICAgKHNjcmVlblsxXSAtIENFTlRST0lEX0hFSUdIVCArIDMwKS50b0ZpeGVkKClcbiAgICBdO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBwb2ludCBvZiB0aGUgZXF1aWxhdGVyYWwgdHJpYW5nbGUgdGhhdCBpcyByb3RhdGVkIDE4MCBkZWdyZWVzIGdpdmVuIHRoZSBjZW50cm9pZFxuICogQHBhcmFtIGN4IGludGVnZXIgQ2FydGVzaWFuIFggY29vcmRpbmF0ZVxuICogQHBhcmFtIGN5IGludGVnZXIgQ2FydGVzaWFuIFkgY29vcmRpbmF0ZVxuICogQHBhcmFtIGhlaWdodCBpbnRlZ2VyIHRoZSBoZWlnaHQgb2YgdGhlIFNWR1xuICogQHBhcmFtIHdpZHRoIGludGVnZXIgdGhlIHdpZHRoIG9mIHRoZSBTVkdcbiAqIEByZXR1cm5zIHtbKiwqXX0gQXJyYXkgd2l0aCB0aGUgeCBjb29yZGluYXRlIGluIHRoZSAwIHBvc2l0aW9uIGFuZCB0aGUgWSBjb29yZGluYXRlIGluIHRoZSAxc3QgcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVRvcEZyb21DZW50cm9pZChjeCwgY3ksIGhlaWdodCwgd2lkdGgpIHtcbiAgICBsZXQgc2NyZWVuID0gdGhpcy5jYXJ0ZXNpYW5Ub1NjcmVlbihjeCwgY3ksIGhlaWdodCwgd2lkdGgpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgIHNjcmVlblswXS50b0ZpeGVkKCksXG4gICAgICAgIChzY3JlZW5bMV0gKyBDRU5UUk9JRF9IRUlHSFQgKyAzMCkudG9GaXhlZCgpXG4gICAgXTtcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgQ2hyaXN0aWFuIEJhcnRyYW0gb24gNi8yMC8xNy5cbiAqIEdpdGh1YiBAY2JhcnRyYW1cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL1V0aWxzJztcblxuY2xhc3MgTmFub2xlYWZMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGF0YVNWRzogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBbXTsgLy9EYXRhIHRvIG11dGF0ZSBzdGF0ZVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kYXRhLmhhc093blByb3BlcnR5KCdwb3NpdGlvbkRhdGEnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdDb3VsZCBub3QgZmluZCBwcm9wZXJ0eTogcG9zaXRpb25EYXRhIGluIGdpdmVuIHByb3AuIEVuc3VyZSB0aGF0IHlvdXIgZGF0YSBpbmNsdWRlcyBhIHBvc2l0aW9uRGF0YSBrZXkgd2l0aCBhbiBhcnJheSB2YWx1ZSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLmRhdGEucG9zaXRpb25EYXRhLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBsZXQgZHJhdyA9IHRoaXMuY2FsY3VsYXRlKFxuICAgICAgICAgICAgICAgIHZhbHVlLnggLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZyArIHRoaXMucHJvcHMueE9mZnNldCxcbiAgICAgICAgICAgICAgICB2YWx1ZS55IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcgKyB0aGlzLnByb3BzLnlPZmZzZXQsXG4gICAgICAgICAgICAgICAgdmFsdWUubyxcbiAgICAgICAgICAgICAgICB2YWx1ZS5jb2xvcixcbiAgICAgICAgICAgICAgICB2YWx1ZS5wYW5lbElkLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRHJhdyhkcmF3KTtcbiAgICAgICAgICAgIGRhdGEucHVzaChkcmF3KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGFTVkc6IGRhdGEgfSk7XG5cdH1cblxuXG5cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHhPZmZzZXQ6IDAsXG4gICAgICAgICAgICB5T2Zmc2V0OiAwLFxuICAgICAgICAgICAgcGFuZWxTcGFjaW5nOiAxLjM3LFxuICAgICAgICAgICAgd2lkdGg6IDEwMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMDAsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJyNGRkZGRkYnLFxuICAgICAgICAgICAgb25EcmF3OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0lkOiBmYWxzZSxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgICAgICAgICAgcm90YXRpb246IDAsXG4gICAgICAgICAgICBvbkhvdmVyOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIGFuIEVxdWlsYXRlcmFsIFRyaWFuZ2xlIG9uIHRoZSBDYW52YXNcbiAgICAgKiBAcGFyYW0geCBpbnRlZ2VyIENhcnRlc2lhbiBYIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0geSBpbnRlZ2VyIENhcnRlc2lhbiBZIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0gbyBpbnRlZ2VyIE9yaWVudGF0aW9uIGluIGRlZ3JlZXNcbiAgICAgKiBAcGFyYW0gY29sb3IgaGV4YWRlY2ltYWwgY29sb3IgY29kZSBUcmlhbmdsZSBDb2xvciBpLmUuICNGRjAwRkZcblx0ICogQHBhcmFtIGhlaWdodCBpbnRlZ2VyIGhlaWdodCBvZiB0aGUgU1ZHXG5cdCAqIEBwYXJhbSB3aWR0aCBpbnRlZ2VyIHdpZHRoIG9mIHRoZSBTVkdcbiAgICAgKiBAcGFyYW0gaWQgaW50ZWdlciB0aGUgcGFuZWwgaWRlbnRpZmllclxuICAgICAqL1xuICAgIGNhbGN1bGF0ZSh4LCB5LCBvLCBjb2xvciwgaWQsIGhlaWdodCwgd2lkdGgpIHtcbiAgICAgICAgbGV0IGNlbnRyb2lkID0gVXRpbHMuY2FydGVzaWFuVG9TY3JlZW4oeCwgeSwgaGVpZ2h0LCB3aWR0aCk7XG5cbiAgICAgICAgLy9UaGUgSWQgdGhhdCBpcyBkcmF3biBvbiB0b3Agb2YgdGhlIFNWRyB3aGVuIHRoZSBzaG93SWRzIHByb3AgaXMgdHJ1ZVxuICAgICAgICBsZXQgcGFuZWxJRCA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRyb2lkWzBdIC0gMyxcbiAgICAgICAgICAgIHk6IGNlbnRyb2lkWzFdICsgMTUsXG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoVXRpbHMuZG9Sb3RhdGUobykpIHtcbiAgICAgICAgICAgIGxldCB0b3BSb3RhdGVkUG9pbnQgPSBVdGlscy5yb3RhdGVUb3BGcm9tQ2VudHJvaWQoeCwgeSwgaGVpZ2h0LCB3aWR0aCk7XG4gICAgICAgICAgICBsZXQgbGVmdFJvdGF0ZWRQb2ludCA9IFV0aWxzLnJvdGF0ZUxlZnRGcm9tQ2VudHJvaWQoeCwgeSwgaGVpZ2h0LCB3aWR0aCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRSb3RhdGVkUG9pbnQgPSBVdGlscy5yb3RhdGVSaWdodEZyb21DZW50cm9pZCh4LCB5LCBoZWlnaHQsIHdpZHRoKTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSBgTSR7dG9wUm90YXRlZFBvaW50WzBdfSAke3RvcFJvdGF0ZWRQb2ludFsxXX0gTCR7bGVmdFJvdGF0ZWRQb2ludFswXX0gJHtsZWZ0Um90YXRlZFBvaW50WzFdfSBMJHtyaWdodFJvdGF0ZWRQb2ludFswXX0gJHtyaWdodFJvdGF0ZWRQb2ludFsxXX0gTCR7dG9wUm90YXRlZFBvaW50WzBdfSAke3RvcFJvdGF0ZWRQb2ludFsxXX0gWmA7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9wUG9pbnQ6IHRvcFJvdGF0ZWRQb2ludCxcbiAgICAgICAgICAgICAgICBsZWZ0UG9pbnQ6IGxlZnRSb3RhdGVkUG9pbnQsXG4gICAgICAgICAgICAgICAgcmlnaHRQb2ludDogcmlnaHRSb3RhdGVkUG9pbnQsXG4gICAgICAgICAgICAgICAgY2VudHJvaWQ6IGNlbnRyb2lkLFxuICAgICAgICAgICAgICAgIHJvdGF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBwYW5lbElEXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRvcFBvaW50ID0gVXRpbHMuZ2V0VG9wRnJvbUNlbnRyb2lkKHgsIHksIGhlaWdodCwgd2lkdGgpO1xuICAgICAgICAgICAgbGV0IGxlZnRQb2ludCA9IFV0aWxzLmdldExlZnRGcm9tQ2VudHJvaWQoeCwgeSwgaGVpZ2h0LCB3aWR0aCk7XG4gICAgICAgICAgICBsZXQgcmlnaHRQb2ludCA9IFV0aWxzLmdldFJpZ2h0RnJvbUNlbnRyb2lkKHgsIHksIGhlaWdodCwgd2lkdGgpO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9IGBNJHt0b3BQb2ludFswXX0gJHt0b3BQb2ludFsxXX0gTCR7bGVmdFBvaW50WzBdfSAke2xlZnRQb2ludFsxXX0gTCR7cmlnaHRQb2ludFswXX0gJHtyaWdodFBvaW50WzFdfSBMJHt0b3BQb2ludFswXX0gJHt0b3BQb2ludFsxXX0gWmA7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9wUG9pbnQ6IHRvcFBvaW50LFxuICAgICAgICAgICAgICAgIGxlZnRQb2ludDogbGVmdFBvaW50LFxuICAgICAgICAgICAgICAgIHJpZ2h0UG9pbnQ6IHJpZ2h0UG9pbnQsXG4gICAgICAgICAgICAgICAgY2VudHJvaWQ6IGNlbnRyb2lkLFxuICAgICAgICAgICAgICAgIHJvdGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgcGFuZWxJRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuXHQgKiBIYW5kbGVzIHJlY2FsY3VsYXRpbmcgdmFsdWVzIGFuZCB1cGRhdGluZyB3aGVuIHRoZSBsYXlvdXQgY2hhbmdlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBbXTsgLy9EYXRhIHRvIG11dGF0ZSBzdGF0ZVxuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kYXRhLmhhc093blByb3BlcnR5KCdwb3NpdGlvbkRhdGEnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdDb3VsZCBub3QgZmluZCBwcm9wZXJ0eTogcG9zaXRpb25EYXRhIGluIGdpdmVuIHByb3AuIEVuc3VyZSB0aGF0IHlvdXIgZGF0YSBpbmNsdWRlcyBhIHBvc2l0aW9uRGF0YSBrZXkgd2l0aCBhbiBhcnJheSB2YWx1ZSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLmRhdGEucG9zaXRpb25EYXRhLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBsZXQgZHJhdyA9IHRoaXMuY2FsY3VsYXRlKFxuICAgICAgICAgICAgICAgIHZhbHVlLnggLyB0aGlzLnByb3BzLnBhbmVsU3BhY2luZyArIHRoaXMucHJvcHMueE9mZnNldCxcbiAgICAgICAgICAgICAgICB2YWx1ZS55IC8gdGhpcy5wcm9wcy5wYW5lbFNwYWNpbmcgKyB0aGlzLnByb3BzLnlPZmZzZXQsXG4gICAgICAgICAgICAgICAgdmFsdWUubyxcbiAgICAgICAgICAgICAgICB2YWx1ZS5jb2xvcixcbiAgICAgICAgICAgICAgICB2YWx1ZS5wYW5lbElkLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRHJhdyhkcmF3KTtcbiAgICAgICAgICAgIGRhdGEucHVzaChkcmF3KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkYXRhLm1hcCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgXHRpZih0aGlzLnByb3BzLnNob3dJZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcblx0XHRcdFx0PGcga2V5PXtrZXl9PlxuXHRcdFx0XHRcdDxwYXRoXG5cdFx0XHRcdFx0XHRrZXk9e2tleSArICdfcGF0aCd9XG5cdFx0XHRcdFx0XHRkPXt2YWx1ZS5wYXRofVxuXHRcdFx0XHRcdFx0c3Ryb2tlV2lkdGg9e3RoaXMucHJvcHMuc3Ryb2tlV2lkdGh9XG5cdFx0XHRcdFx0XHRvbk1vdXNlT3Zlcj17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkhvdmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG5cdFx0XHRcdFx0XHRvbk1vdXNlT3V0PXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRXhpdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuXHRcdFx0XHRcdFx0b25Nb3VzZURvd249e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuXHRcdFx0XHRcdFx0ZmlsbD17dmFsdWUuY29sb3J9XG5cdFx0XHRcdFx0XHRzdHJva2U9e3RoaXMucHJvcHMuc3Ryb2tlQ29sb3J9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8dGV4dFxuXHRcdFx0XHRcdFx0a2V5PXtrZXkgKyAnX3RleHQnfVxuXHRcdFx0XHRcdFx0eD17dmFsdWUucGFuZWxJRC54fVxuXHRcdFx0XHRcdFx0eT17dmFsdWUucGFuZWxJRC55fVxuXHRcdFx0XHRcdFx0ZmlsbD1cIiNGRkZGRkZcIlxuXHRcdFx0XHRcdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZS5pZH1cblx0XHRcdFx0XHQ8L3RleHQ+XG5cdFx0XHRcdDwvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICBcdFx0cmV0dXJuIChcblx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRrZXk9e2tleSArICdfcGF0aCd9XG5cdFx0XHRcdFx0ZD17dmFsdWUucGF0aH1cblx0XHRcdFx0XHRzdHJva2VXaWR0aD17dGhpcy5wcm9wcy5zdHJva2VXaWR0aH1cblx0XHRcdFx0XHRvbk1vdXNlT3Zlcj17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uSG92ZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuXHRcdFx0XHRcdG9uTW91c2VPdXQ9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkV4aXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG5cdFx0XHRcdFx0ZmlsbD17dmFsdWUuY29sb3J9XG5cdFx0XHRcdFx0c3Ryb2tlPXt0aGlzLnByb3BzLnN0cm9rZUNvbG9yfVxuXHRcdFx0XHQvPlxuXHRcdFx0KVxuXHRcdH1cblx0ICB9KVxuXHR9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8c3ZnIGhlaWdodD17dGhpcy5wcm9wcy53aWR0aH0gd2lkdGg9e3RoaXMucHJvcHMuaGVpZ2h0fSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJSYWRpdXM6ICc1MCUnIH19IHRyYW5zZm9ybT17YHJvdGF0ZSgke3RoaXMucHJvcHMucm90YXRpb259KWB9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy51cGRhdGUoKX1cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbk5hbm9sZWFmTGF5b3V0LnByb3BUeXBlcyA9IHtcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAvL3Nob3VsZCBiZSBhcnJheVxuICAgIG9uRHJhdzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGFuZWxTcGFjaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHN0cm9rZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHhPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeU9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG93SWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHN0cm9rZVdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHJvdGF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRXhpdDogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5hbm9sZWFmTGF5b3V0O1xuIl19
