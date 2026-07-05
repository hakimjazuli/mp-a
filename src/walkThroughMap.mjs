// @ts-check

/**
 * @template T
 * @param {Iterator<T, any, any>} iterator
 * @param {(value: T) => void} callback
 * @returns {void}
 */
const handler = (iterator, callback) => {
	let result = iterator.next();
	while (!result.done) {
		callback(result.value);
		result = iterator.next();
	}
};

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
export function walkThroughMap(mapInstance, callback) {
	handler(mapInstance.entries(), callback);
}
