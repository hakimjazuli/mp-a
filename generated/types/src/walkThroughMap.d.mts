/**
 * @description
 * - method helper to WalkThrough `Map`;
 * @template KEY, VAL
 * @param {Map<KEY, VAL>} mapInstance
 * @param {(entry: [key: KEY, value: VAL]) => void} callback
 * @returns {void}
 * @example
 * import { WalkThrough } from 'vivth/neutral';
 *
 * WalkThrough.map(mapOfSomething, ([key, value]) => {
 * // code
 * })
 */
export function walkThroughMap<KEY, VAL>(mapInstance: Map<KEY, VAL>, callback: (entry: [key: KEY, value: VAL]) => void): void;
