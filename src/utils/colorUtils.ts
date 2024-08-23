import { Color, colorDefinitions } from './util';

export const getColorDefinition = (color: Color): string => {
    return colorDefinitions[color];
};
