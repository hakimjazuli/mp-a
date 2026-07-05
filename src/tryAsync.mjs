// @ts-check

import { resolveErrorArray } from './resolveErrorArray.mjs';

/**
 * @template RESULT
 * @param {()=>Promise<RESULT>} asyncFunction_
 * @returns {Promise<[RESULT,undefined]|[undefined,Error]>}
 */

export async function tryAsync(asyncFunction_) {
	try {
		const result = await asyncFunction_();
		return [result, undefined];
	} catch (error) {
		return resolveErrorArray(error);
	}
}
