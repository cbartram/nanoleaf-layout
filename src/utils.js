import React from 'react';
import { PI } from './constants';

/**
 * Calculates an Equilateral Triangle given the side length and center based on the following gist
 * https://gist.github.com/julienetie/92b2e87269f7f9f0bee0
 * @param sideLength Integer the length of the triangles side
 * @param cen Array Defaults to [0, 0]
 * @returns {{topVertex: Array, rightVertex: Array, leftVertex: Array}}
 */
export const equilateral = (sideLength, cen = [0, 0]) => {
    const halfSide = sideLength / 2;

    // Inner innerHypotenuse angle = 120, hyp = half side. Cos 120 * adjacent
    const innerHypotenuse = halfSide * (1 / Math.cos(30 * PI / 180));

    // SqRt(Hyp^2 - Adj^2) pythagoras
    const innerOpposite = halfSide * (1 / Math.tan(60 * PI / 180));

    let leftVertex = [];
    let rightVertex = [];
    let topVertex = [];

    leftVertex[0] = cen[0] - halfSide;
    leftVertex[1] = cen[1] + innerOpposite;

    rightVertex[0] = cen[0] + halfSide;
    rightVertex[1] = cen[1] + innerOpposite;

    topVertex[0] = cen[0];
    topVertex[1] = cen[1] - innerHypotenuse;

    return {
        topVertex,
        rightVertex,
        leftVertex
    }
};

/**
 * Draws an Equilateral Triangle on the Canvas and validates the data from this.props contains the correct key.
 * The following parameters are used for the calculation of the equilateral triangles.
 * @param positionData Array Object array representing the data for each Nanoleaf.
 * @param sideLength Integer the length of each triangle's side given from the Nanoleaf API
 */
export const draw = (positionData, sideLength) => {
    // Calculate the coords for an equilateral triangle
    return positionData.map(({ x, y, o, color, strokeColor, panelId }) => {
        let e = equilateral(sideLength);
        let path = `M${e.topVertex[0]} ${e.topVertex[1]} L${e.leftVertex[0]} ${e.leftVertex[1]} L${e.rightVertex[0]} ${e.rightVertex[1]} L${e.topVertex[0]} ${e.topVertex[1]} Z`;
        return {
            x,
            y,
            rotation: o,
            color,
            strokeColor,
            path,
            panelId
        };
    });
};

/**
 * Returns the integer value of a hexidecimal color code
 * @param hexString String Hexidecimal color code
 * @returns {number}
 */
export const colorAsInt = (hexString) => {
    if (!hexString) return 0; // cover nulls and undefined
    return parseInt(hexString.slice(1), 0x10)
};

/**
 * Returns a <g> with three smaller 'endCap' triangles
 * @param props
 * @returns <g>
 */
export const endCaps = (panel, sideLength) => {
  const fill = '#ffffff'
  const capSize = sideLength * 0.15
  const points = equilateral(sideLength - capSize)
  const {path} = draw([panel], capSize).pop()

  return (
    <g>
      <g key='top_cap' transform={`translate(${points.topVertex[0]},${points.topVertex[1]})`} >
        <path d={path} fill={fill} stroke={fill} strokeWidth={2} />
      </g>
      <g key='left_cap' transform={`translate(${points.leftVertex[0]},${points.leftVertex[1]})`} >
        <path d={path} fill={fill} stroke={fill} strokeWidth={2} />
      </g>
      <g key='right_cap' transform={`translate(${points.rightVertex[0]},${points.rightVertex[1]})`} >
        <path d={path} fill={fill} stroke={fill} strokeWidth={2} />
      </g>
    </g>
  )
}


/**
 * Handles recalculating values and updating when the layout changes
 * @returns {Array}
 */
export const update = (props) => {
    const showCenter = props.development; // Used for development

    const {
        strokeWidth,
        strokeColor,
        color,
        showId,
        removeEndCaps,
        rotation,
        onHover,
        onClick,
        onExit
    } = props;

    //Sort panels so that strokeColor further from white are later in the array.  This prevents overlapping a non-white strokeColor with white.
    const panels = draw(props.data.positionData, props.data.sideLength).sort((a, b) => colorAsInt(b.strokeColor) - colorAsInt(a.strokeColor));
    return panels.map((value, key) => {
        return (
            <g key={key} transform={`translate(${value.x},${value.y}) rotate(${value.rotation + 60})`} >
                <path
                    key={key + '_path'}
                    d={value.path}
                    strokeWidth={strokeWidth}
                    onMouseOver={() => onHover(value)}
                    onMouseOut={() => onExit(value)}
                    onClick={() => onClick(value)}
                    fill={value.color || color}
                    stroke={value.strokeColor || strokeColor}
                />
                {
                    removeEndCaps && endCaps(value, props.data.sideLength)
                }
                {
                    showCenter && <circle key={key + '_circle'} cx={0} cy={0} r={5} fill={'pink'}/>
                }
                {
                    showId &&
                    <text key={key + '_text'}
                          fill="#FFFFFF"
                          textAnchor="middle"
                          transform={`scale(-1, 1) rotate(${value.rotation - 120 - rotation})`}
                          onClick={() => onClick(value)}>
                        {value.id}
                    </text>
                }
            </g>
        )
    })
};

/**
 * Computes the properties of the equilateral triangle to be drawn as an SVG.
 * @param props Object React props including the positionData and sideLength properties on the object
 * @returns {{midX: number, midY: number, minX: number, minY: number, maxX: number, maxY: number, width: number, height: number}}
 */
export const compute = (props) => {
    const { positionData, sideLength } = props.data;
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    positionData.forEach(panel => {
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
    });

    // the min/max are now based on the center of the triangles, so we want to add a sideLength so we're
    // working with the triangle bounding boxes
    maxX += sideLength;
    minX -= sideLength;
    maxY += sideLength;
    minY -= sideLength;

    const width = (maxX - minX);
    const height = (maxY - minY);

    return {
        midX: minX + width / 2,
        midY:  minY + height / 2,
        minX,
        minY,
        maxX,
        maxY,
        width,
        height
    }
};
