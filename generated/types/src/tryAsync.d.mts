/**
 * @template RESULT
 * @param {()=>Promise<RESULT>} asyncFunction_
 * @returns {Promise<[RESULT,undefined]|[undefined,Error]>}
 */
export function tryAsync<RESULT>(asyncFunction_: () => Promise<RESULT>): Promise<[RESULT, undefined] | [undefined, Error]>;
