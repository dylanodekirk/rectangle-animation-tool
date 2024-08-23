import { BounceTypes, Color } from './util';

export const createBounceState = (
    color: Color,
    width: number,
    height: number,
    bounceType: BounceTypes,
    speed: number | string,
    bounceHeight: number
) => ({
    color,
    width,
    height,
    bounceType,
    speed,
    bounceHeight,
});
