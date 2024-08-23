import React from 'react';
import './shape.css';
import { Color, colorDefinitions } from '../utils/util';
import { BounceTypes } from '../utils/util';

interface ShapeProps {
    currentColor: Color;
    height: number;
    width: number;
    bounceType: BounceTypes;
    speed: any;
    bounceHeight: number | string;
}

function Shape({ currentColor, width, height, bounceType, speed, bounceHeight }: ShapeProps) {
    return (
        <div
            className={`box ${bounceType}`}
            style={{
                width: width,
                height: height,
                border: '.5px solid #000',
                backgroundColor: colorDefinitions[currentColor],
                marginBottom: '20px',
                animationDuration: `${speed}s`,
                '--bounce-height': `${bounceHeight}px`
            } as React.CSSProperties}
        ></div>
    );
}

export default Shape;
