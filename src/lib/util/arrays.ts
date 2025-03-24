export const enumerate = <T>(arr: T[]): [number, T][] => arr.map((el, i) => [i, el]);
