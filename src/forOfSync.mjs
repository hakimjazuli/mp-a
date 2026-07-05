// @ts-check

import { trySync } from './trySync.mjs';

/**
 * @template {any} T
 * @template {any} RETURNTYPE
 * @param {Iterable<T>} iterable
 * @param {(value: T,
 * options:{
 * prevError:Error|undefined,
 * breakEarly:()=>void,
 * }) => RETURNTYPE|undefined} handlerCallback
 * - when `breakEarly` is called, the loop will break at the begining of the next iteration;
 * - typehint according to your js flavor, so the function make setOfResult typed;
 * @returns {[Set<RETURNTYPE>, Set<Error>]}
 */
export function forOfSync(iterable, handlerCallback) {
	/**
	 * @type {Set<Error>}
	 */
	const errors = new Set();
	/**
	 * @type {Set<RETURNTYPE>}
	 */
	const results = new Set();
	/**
	 * @type {Error|undefined}
	 */
	let prevError;
	let breakEarly_ = false;
	const breakEarly = () => {
		breakEarly_ = true;
	};
	for (const value of iterable) {
		if (breakEarly_) {
			break;
		}
		const [result, error] = trySync(() => handlerCallback(value, { prevError, breakEarly }));
		if (error) {
			prevError = error;
			errors.add(error);
			continue;
		}
		if (result === undefined) {
			continue;
		}
		results.add(result);
	}
	return [results, errors];
}
