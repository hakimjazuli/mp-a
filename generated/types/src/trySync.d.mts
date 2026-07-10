/**
 * @description
 * - function for error as value for synchronous operation;
 * - usefull to flatten indentation for error handlings;
 * @template RESULT
 * @param {()=>RESULT} function_
 * @returns {[RESULT,undefined]|
 * [undefined,Error]}
 */
export declare function trySync<RESULT>(function_: () => RESULT): [RESULT, undefined] | [undefined, Error];
