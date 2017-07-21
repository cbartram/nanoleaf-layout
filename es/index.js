function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Utils from './utils';

var NanoleafLayout = function (_Component) {
    _inherits(NanoleafLayout, _Component);

    function NanoleafLayout(props) {
        _classCallCheck(this, NanoleafLayout);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            dataSVG: []
        };
        return _this;
    }

    NanoleafLayout.prototype.componentDidMount = function componentDidMount() {
        this.draw();
    };

    NanoleafLayout.prototype.draw = function draw() {
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
    };

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
    NanoleafLayout.prototype.calculate = function calculate(x, y, o, color, strokeColor, id, height, width) {
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
                color: color,
                strokeColor: strokeColor,
                path: _path,
                id: id,
                panelID: panelID
            };
        }
    };

    /**
     * Handles recalculating values and updating when the layout changes
     * @returns {Array}
     */
    NanoleafLayout.prototype.update = function update() {
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
                return React.createElement(
                    'g',
                    { key: key },
                    React.createElement('path', {
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
                    React.createElement(
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
                return React.createElement('path', {
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
    };

    NanoleafLayout.prototype.render = function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'svg',
                { height: this.props.width, width: this.props.height, style: { width: '100%', borderRadius: '50%', opacity: this.props.opacity }, transform: 'rotate(' + this.props.rotation + ')' },
                this.update()
            )
        );
    };

    return NanoleafLayout;
}(Component);

NanoleafLayout.propTypes = process.env.NODE_ENV !== "production" ? {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.object.isRequired, //should be array
    onDraw: PropTypes.func,
    panelSpacing: PropTypes.number,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
    showId: PropTypes.bool,
    strokeWidth: PropTypes.number,
    opacity: PropTypes.number,
    rotation: PropTypes.number,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onExit: PropTypes.func
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

export default NanoleafLayout;