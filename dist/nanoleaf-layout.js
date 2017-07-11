(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.NanoleafLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Utils":2,"prop-types":undefined}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});