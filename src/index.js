/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Utils from './utils';

const style = {
    path: {
        strokeDasharray: 20,
        animation: "dash 5s linear"
    },

    dash: {
        to: {
            strokeDashoffset: 1000,
        }
    },
}


class NanoleafLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSVG: []
        };
    }

    componentDidMount() {
        this.draw();
    }

    draw() {
        let data = []; //Data to mutate state

        if (!this.props.data.hasOwnProperty('positionData')) {
            throw new Error(
                'Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value'
            );
        }

        this.props.data.positionData.map(value => {
            let draw = this.calculate(
                value.x / this.props.panelSpacing + this.props.xOffset,
                value.y / this.props.panelSpacing + this.props.yOffset,
                value.o,
                value.color,
                value.strokeColor,
                value.panelId,
                this.props.height,
                this.props.width,
            );

            this.props.onDraw(draw);
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
    calculate(x, y, o, color, strokeColor, id, height, width) {
        let centroid = Utils.cartesianToScreen(x, y, height, width);

        //Default for a single digit ID
        let textXOffset = -3;
        let textYOffset = 18;

        //Determine the Text offset
        if(id > 9 && id <= 99) {
            textXOffset = -10;
            textYOffset = 20;
        }

        if(id >= 100 && id < 999) {
            //Text is > 3 digit ID
            textXOffset = -13;
            textYOffset = 25;
        }

        //The Id that is drawn on top of the SVG when the showIds prop is true
        let panelID = {
            x: centroid[0] + (textXOffset),
            y: centroid[1] + (textYOffset),
            id: id
        };

        if (Utils.doRotate(o)) {
            let topRotatedPoint = Utils.rotateTopFromCentroid(x, y, height, width);
            let leftRotatedPoint = Utils.rotateLeftFromCentroid(x, y, height, width);
            let rightRotatedPoint = Utils.rotateRightFromCentroid(x, y, height, width);

            let path = `M${topRotatedPoint[0]} ${topRotatedPoint[1]} L${leftRotatedPoint[0]} ${leftRotatedPoint[1]} L${rightRotatedPoint[0]} ${rightRotatedPoint[1]} L${topRotatedPoint[0]} ${topRotatedPoint[1]} Z`;

            return {
                topPoint: topRotatedPoint,
                leftPoint: leftRotatedPoint,
                rightPoint: rightRotatedPoint,
                centroid: centroid,
                rotated: true,
                selected: false,
                color,
                strokeColor,
                path,
                id,
                panelID
            };
        } else {
            let topPoint = Utils.getTopFromCentroid(x, y, height, width);
            let leftPoint = Utils.getLeftFromCentroid(x, y, height, width);
            let rightPoint = Utils.getRightFromCentroid(x, y, height, width);

            let path = `M${topPoint[0]} ${topPoint[1]} L${leftPoint[0]} ${leftPoint[1]} L${rightPoint[0]} ${rightPoint[1]} L${topPoint[0]} ${topPoint[1]} Z`;

            return {
                topPoint: topPoint,
                leftPoint: leftPoint,
                rightPoint: rightPoint,
                centroid: centroid,
                rotated: false,
                selected: false,
                color,
                strokeColor,
                path,
                id,
                panelID
            };
        }
    };

    /**
     * Handles recalculating values and updating when the layout changes
     * @returns {Array}
     */
    update() {

        let data = []; //Data to mutate state

        if (!this.props.data.hasOwnProperty('positionData')) {
            throw new Error(
                'Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value'
            );
        }

        this.props.data.positionData.map(value => {
            let draw = this.calculate(
                value.x / this.props.panelSpacing + this.props.xOffset,
                value.y / this.props.panelSpacing + this.props.yOffset,
                value.o,
                value.color,
                value.strokeColor,
                value.panelId,
                this.props.height,
                this.props.width,
            );

            this.props.onDraw(draw);
            data.push(draw);
        });

        return data.map((value, key) => {
            if(this.props.showId) {
                return (
                    <g key={key}>
                        <path
                            key={key + '_path'}
                            d={value.path}
                            strokeWidth={this.props.strokeWidth}
                            onMouseOver={e => {
                                this.props.onHover(value);
                            }}
                            onMouseOut={e => {
                                this.props.onExit(value);
                            }}
                            onMouseDown={e => {
                                this.props.onClick(value);
                            }}
                            fill={value.color}
                            stroke={value.strokeColor}
                        />
                        <text
                            key={key + '_text'}
                            x={value.panelID.x}
                            y={value.panelID.y}
                            fill="#FFFFFF"
                            onMouseDown={e => {
                                this.props.onClick(value)
                            }}
                        >
                            {value.id}
                        </text>
                    </g>
                );
            } else {
                return (
                    <path
                        className="path"
                        key={key + '_path'}
                        d={value.path}
                        strokeWidth={this.props.strokeWidth}
                        onMouseOver={e => {
                            this.props.onHover(value);
                        }}
                        onMouseOut={e => {
                            this.props.onExit(value);
                        }}
                        onMouseDown={e => {
                            this.props.onClick(value);
                        }}
                        fill={value.color}
                        stroke={value.strokeColor}
                    />
                )
            }
        })
    };

    render() {
        return (
            <div>
                <svg height={this.props.width} width={this.props.height} style={{ width: '100%', borderRadius: '50%', opacity: this.props.opacity }} transform={`rotate(${this.props.rotation})`}>
                    {this.update()}
                </svg>
            </div>
        );
    }
}

NanoleafLayout.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.object.isRequired, //should be array
    style: PropTypes.object,
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
};

NanoleafLayout.defaultProps = {
    xOffset: 0,
    yOffset: 0,
    panelSpacing: 1.25,
    width: 1000,
    height: 1000,
    onDraw: data => data,
    style: {},
    showId: false,
    opacity: 1,
    strokeWidth: 2,
    rotation: 0,
    onHover: data => data,
    onClick: data => data,
    onExit: data => data,
};

export default NanoleafLayout;

