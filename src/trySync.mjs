// @ts-check

import { resolveErrorArray } from './resolveErrorArray.mjs';

/**
 * @description
 * - function for error as value for synchronous operation;
 * - usefull to flatten indentation for error handlings;
 * @template RESULT
 * @param {()=>RESULT} function_
 * @returns {[RESULT,undefined]|
 * [undefined,Error]}
 */
export function trySync(function_) {
	try {
		const result = function_();
		return [result, undefined];
	} catch (error) {
		return resolveErrorArray(error);
	}
}
