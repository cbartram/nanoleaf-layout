/**
 * Created by Christian Bartram on 6/20/17.
 * Github @cbartram
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NanoleafLayout extends Component {
    /**
     * Draws an Equilateral Triangle on the Canvas
     * @param x integer Cartesian X coordinate
     * @param y integer Cartesian Y coordinate
     * @param o integer Orientation in degrees
     * @param color hexadecimal color code Triangle Color i.e. #FF00FF
     * @param strokeColor hexadecimal color code for the Triangles stroke i.e #DDFF90
     * @param id integer the panel identifier
     */
    calculate({x, y, o, color, strokeColor, panelId}) {
      const origin = [0, 0]; // Trangle will later be translated and rotated
      let e = this.equilateral(this.props.data.sideLength, origin)
      let path = `M${e.topVertex[0]} ${e.topVertex[1]} L${e.leftVertex[0]} ${e.leftVertex[1]} L${e.rightVertex[0]} ${e.rightVertex[1]} L${e.topVertex[0]} ${e.topVertex[1]} Z`;

      const triangle = { x, y, rotation: o, color, strokeColor, path, panelId };
      this.props.onDraw(triangle);
      return triangle
    };

    // Based on https://gist.github.com/julienetie/92b2e87269f7f9f0bee0
		equilateral(sideLength, cen) {
			const pi = 3.141592653589793238462643383
			const halfSide = sideLength / 2

      // Inner innerHypotenuse angle = 120, hyp = half side. Cos 120 * adjacent
      const innerHypotenuse = halfSide * (1 / Math.cos(30 * pi / 180));

      // SqRt(Hyp^2 - Adj^2) pythagoras
      const innerOpposite = halfSide * (1 / Math.tan(60 * pi / 180));

      var leftVertex = [];
      var rightVertex = [];
      var topVertex = [];

      leftVertex[0] = cen[0] - halfSide;
      leftVertex[1] = cen[1] + innerOpposite;

      rightVertex[0] = cen[0] + halfSide;
      rightVertex[1] = cen[1] + innerOpposite;

      topVertex[0] = cen[0];
      topVertex[1] = cen[1] - innerHypotenuse;

      return { topVertex, rightVertex, leftVertex }
		}

    validate() {
      const { data } = this.props
        if (!data.hasOwnProperty('positionData')) {
            throw new Error(
                'Could not find property: positionData in given prop. Ensure that your data includes a positionData key with an array value'
            );
        }

        return data.positionData.map(this.calculate, this);
    }

    /**
     * Handles recalculating values and updating when the layout changes
     * @returns {Array}
     */
    update() {
      const showCenter = false //Development
      const colorAsInt = (hexString) => {
        if (!hexString) return 0 // cover nulls and undefined
        return parseInt(hexString.slice(1), 0x10)
      }
      const { onHover, onClick, onExit } = this.props
      const { strokeWidth, strokeColor, color, showId, rotation } = this.props

      const panels = this.validate().sort((a, b) => {
        //Sort panels so that strokeColor further from white are later in the array.  This prevents overlaping
        //a non-white strokeColor with white.
        return colorAsInt(b.strokeColor) - colorAsInt(a.strokeColor)
      })

      return panels.map((value, key) => {
        return (
            <g key={key} transform={`translate(${value.x},${value.y}) rotate(${value.rotation + 60})`} >
              <path
                  key={key + '_path'}
                  d={value.path}
                  strokeWidth={strokeWidth}
                  onMouseOver={() => onHover(value) }
                  onMouseOut={() => onExit(value) }
                  onClick={() => onClick(value) }
                  fill={value.color || color}
                  stroke={value.strokeColor || strokeColor}
              />
              {showCenter && <circle key={key + '_circle'} cx={0} cy={0} r={5} fill={'pink'}/>}
              {showId &&
                <text key={key + '_text'}
                  fill="#FFFFFF"
                  textAnchor="middle"
                  transform={`scale(-1, 1) rotate(${value.rotation - 120 - rotation})`}
                  onClick={e => onClick(value)}>
                    {value.id}
                </text>
              }
            </g>
        )
      })
    };

    render() {
        const { data } = this.props
        let minX = 0
        let maxX = 0
        let minY = 0
        let maxY = 0

        data.positionData.forEach(panel => {
          if (panel.x > maxX) {
            maxX = panel.x
          }
          if (panel.x < minX) {
            minX = panel.x
          }
          if (panel.y > maxY) {
            maxY = panel.y
          }
          if (panel.y < minY) {
            minY = panel.y
          }
        })

        // the min/max are now based on the center of the triangles, so we want to add a sideLength so we're
        // working with the triangle bounding boxes
        maxX += data.sideLength
        minX -= data.sideLength
        maxY += data.sideLength
        minY -= data.sideLength

        const width = (maxX - minX)
        const height = (maxY - minY)
        const midX = minX + width/2
        const midY = minY + height/2


        // For development
        const showTrueZero = false
        const showTransZero = false
        const showCenter = false

        //Translate out, scale and rotate, translate back.  Makes it 'feel' like the scale and rotation are happening around the center and not around 0,0
        const transform = `translate(${midX},${midY}) scale(-1,1) rotate(${this.props.rotation + 180}) translate(${-midX},${-midY})`

        // Use calculated to give a tight view of the panels
        const viewBox = `${minX} ${minY} ${width} ${height}`

        return (
            <svg viewBox={viewBox} preserveAspectRatio={'xMidYMid meet'} >
              {showTrueZero && <circle cx={0} cy={0} r={5} fill={'blue'} />}
              <g transform={transform}>
                {this.update()}
                {showTransZero && <circle cx={0} cy={0} r={5} fill={'lightblue'} />}
              </g>
              {showCenter && <circle cx={midX} cy={midY} r={5} fill={'red'} />}
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
    onHover: data => data,
    onClick: data => data,
    onExit: data => data,
};

export default NanoleafLayout;

