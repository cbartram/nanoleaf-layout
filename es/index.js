'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Christian Bartram on 6/20/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Github @cbartram
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NanoleafLayout = function (_Component) {
    _inherits(NanoleafLayout, _Component);

    function NanoleafLayout(props) {
        _classCallCheck(this, NanoleafLayout);

        var _this = _possibleConstructorReturn(this, (NanoleafLayout.__proto__ || Object.getPrototypeOf(NanoleafLayout)).call(this, props));

        _this.state = {
            dataSVG: []
        };
        return _this;
    }

    _createClass(NanoleafLayout, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this2 = this;

            var data = []; //Data to mutate state

            if (!this.props.data.hasOwnProperty('positionData')) {
                throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
            }

            this.props.data.positionData.map(function (value) {
                var draw = _this2.calculate(value.x / _this2.props.panelSpacing + _this2.props.xOffset, value.y / _this2.props.panelSpacing + _this2.props.yOffset, value.o, value.color, value.strokeColor, value.panelId, _this2.props.height, _this2.props.width);

                _this2.props.onDraw(draw);
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
         * @param strokeColor hexadecimal color code for the Triangles stroke i.e #DDFF90
         * @param height integer height of the SVG
         * @param width integer width of the SVG
         * @param id integer the panel identifier
         */
        value: function calculate(x, y, o, color, strokeColor, id, height, width) {
            var centroid = Utils.cartesianToScreen(x, y, height, width);

            //Default for a single digit ID
            var textXOffset = -3;
            var textYOffset = 18;

            //Determine the Text offset
            if (id > 9 && id <= 99) {
                textXOffset = -10;
                textYOffset = 20;
            }

            if (id >= 100 && id < 999) {
                //Text is > 3 digit ID
                textXOffset = -13;
                textYOffset = 25;
            }

            //The Id that is drawn on top of the SVG when the showIds prop is true
            var panelID = {
                x: centroid[0] + textXOffset,
                y: centroid[1] + textYOffset,
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
                    selected: false,
                    color: color,
                    strokeColor: strokeColor,
                    path: path,
                    id: id,
                    panelID: panelID
                };
            } else {
                var topPoint = Utils.getTopFromCentroid(x, y, height, width);
                var leftPoint = Utils.getLeftFromCentroid(x, y, height, width);
                var rightPoint = Utils.getRightFromCentroid(x, y, height, width);

                var _path = 'M' + topPoint[0] + ' ' + topPoint[1] + ' L' + leftPoint[0] + ' ' + leftPoint[1] + ' L' + rightPoint[0] + ' ' + rightPoint[1] + ' L' + topPoint[0] + ' ' + topPoint[1] + ' Z';

                return {
                    topPoint: topPoint,
                    leftPoint: leftPoint,
                    rightPoint: rightPoint,
                    centroid: centroid,
                    rotated: false,
                    selected: false,
                    color: color,
                    strokeColor: strokeColor,
                    path: _path,
                    id: id,
                    panelID: panelID
                };
            }
        }
    }, {
        key: 'update',


        /**
         * Handles recalculating values and updating when the layout changes
         * @returns {Array}
         */
        value: function update() {
            var _this3 = this;

            var data = []; //Data to mutate state

            if (!this.props.data.hasOwnProperty('positionData')) {
                throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
            }

            this.props.data.positionData.map(function (value) {
                var draw = _this3.calculate(value.x / _this3.props.panelSpacing + _this3.props.xOffset, value.y / _this3.props.panelSpacing + _this3.props.yOffset, value.o, value.color, value.strokeColor, value.panelId, _this3.props.height, _this3.props.width);

                _this3.props.onDraw(draw);
                data.push(draw);
            });

            return data.map(function (value, key) {
                if (_this3.props.showId) {
                    return _react2.default.createElement(
                        'g',
                        { key: key },
                        _react2.default.createElement('path', {
                            key: key + '_path',
                            d: value.path,
                            strokeWidth: _this3.props.strokeWidth,
                            onMouseOver: function onMouseOver(e) {
                                _this3.props.onHover(value);
                            },
                            onMouseOut: function onMouseOut(e) {
                                _this3.props.onExit(value);
                            },
                            onMouseDown: function onMouseDown(e) {
                                _this3.props.onClick(value);
                            },
                            fill: value.color,
                            stroke: value.strokeColor
                        }),
                        _react2.default.createElement(
                            'text',
                            {
                                key: key + '_text',
                                x: value.panelID.x,
                                y: value.panelID.y,
                                fill: '#FFFFFF',
                                onMouseDown: function onMouseDown(e) {
                                    _this3.props.onClick(value);
                                }
                            },
                            value.id
                        )
                    );
                } else {
                    return _react2.default.createElement('path', {
                        key: key + '_path',
                        d: value.path,
                        strokeWidth: _this3.props.strokeWidth,
                        onMouseOver: function onMouseOver(e) {
                            _this3.props.onHover(value);
                        },
                        onMouseOut: function onMouseOut(e) {
                            _this3.props.onExit(value);
                        },
                        onMouseDown: function onMouseDown(e) {
                            _this3.props.onClick(value);
                        },
                        fill: value.color,
                        stroke: value.strokeColor
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'svg',
                    { width: this.props.width, height: this.props.height, viewBox: '0 0 ' + this.props.height + ' ' + this.props.width, style: { width: '100%', borderRadius: '50%', opacity: this.props.opacity }, transform: 'rotate(' + this.props.rotation + ')' },
                    this.update()
                )
            );
        }
    }]);

    return NanoleafLayout;
}(_react.Component);

NanoleafLayout.propTypes = process.env.NODE_ENV !== "production" ? {
    height: _propTypes2.default.number,
    width: _propTypes2.default.number,
    data: _propTypes2.default.object.isRequired, //should be array
    style: _propTypes2.default.object,
    onDraw: _propTypes2.default.func,
    panelSpacing: _propTypes2.default.number,
    xOffset: _propTypes2.default.number,
    yOffset: _propTypes2.default.number,
    showId: _propTypes2.default.bool,
    strokeWidth: _propTypes2.default.number,
    opacity: _propTypes2.default.number,
    rotation: _propTypes2.default.number,
    onHover: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onExit: _propTypes2.default.func
} : {};

NanoleafLayout.defaultProps = {
    xOffset: 0,
    yOffset: 0,
    panelSpacing: 1.25,
    width: 1000,
    height: 1000,
    onDraw: function onDraw(data) {
        return data;
    },
    style: {},
    showId: false,
    opacity: 1,
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

exports.default = NanoleafLayout;