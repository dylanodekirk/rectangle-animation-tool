export type Color = 'purple' | 'sky' | 'green' | 'yellow' | 'orange' | 'red' | 'neutral' | 'stone';

export const colorDefinitions: Record<Color, string> = {
    purple: '#9333ea',
    sky: '#0284c7',
    green: '#16a34a',
    yellow: '#facc15',
    orange: '#ea580c',
    red: '#dc2626',
    neutral: '#fafafa',
    stone: '#57534e',
};

export type BounceTypes = 'simple' | 'delay' | 'curve' | 'bounce' | 'elastic' | 'rubber' | 'none'

export const bounceDefinitions: Record<BounceTypes, string> = {
    simple: 'simple',
    delay: 'delay',
    curve: 'curve',
    bounce: 'bounce',
    elastic: 'elastic',
    rubber: 'rubber',
    none: 'none'
}