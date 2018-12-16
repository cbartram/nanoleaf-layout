/**
 * Created by Christian Bartram on 12/14/2018.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Utils from './utils';

export default class NanoleafLayout extends Component {

    componentDidMount() {
        if (typeof this.props.data.positionData === 'undefined')
            throw new Error('Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value');
    }

    render() {
        const { midX, midY, minX, minY, width, height } = Utils.compute(this.props);

        // For development
        const showTrueZero = this.props.development;
        const showTransZero = this.props.development;
        const showCenter = this.props.development;

        //Translate out, scale and rotate, translate back.  Makes it 'feel' like the scale and rotation are happening around the center and not around 0,0
        const transform = `translate(${midX},${midY}) scale(-1,1) rotate(${this.props.rotation + 180}) translate(${-midX},${-midY})`;

        // Use calculated to give a tight view of the panels
        const viewBox = `${minX} ${minY} ${width} ${height}`;

        return (
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" >
              {showTrueZero && <circle cx={0} cy={0} r={5} fill="blue" />}
              <g transform={transform}>
                {Utils.update(this.props)}
                {showTransZero && <circle cx={0} cy={0} r={5} fill="green" />}
              </g>
              {showCenter && <circle cx={midX} cy={midY} r={5} fill="red" />}
            </svg>
        )
    }
}

NanoleafLayout.propTypes = {
    data: PropTypes.object.isRequired, //should be array
    onDraw: PropTypes.func,
    showId: PropTypes.bool,
    strokeWidth: PropTypes.number,
    opacity: PropTypes.number,
    color: PropTypes.string,
    development: PropTypes.bool,
    rotation: PropTypes.number,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onExit: PropTypes.func
};

NanoleafLayout.defaultProps = {
    onDraw: data => data,
    showId: false,
    opacity: 1,
    strokeWidth: 2,
    rotation: 0,
    color: '#333333',
    strokeColor: '#ffffff',
    development: false,
    onHover: data => data,
    onClick: data => data,
    onExit: data => data,
};
