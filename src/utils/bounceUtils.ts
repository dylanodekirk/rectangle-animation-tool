import { BounceTypes } from './util'

export const isValidNumber = (value: string): boolean => {
    return value === '' || !isNaN(Number(value));
};

export const parseNumber = (value: string): number => {
    return Number(value) || 0;
};

export const isValidSpeed = (value: string): boolean => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0.5 && numericValue <= 5;
};

export const getNextPlaybackIndex = (currentIndex: number, statesLength: number): number => {
    return (currentIndex + 1) % statesLength;
};
