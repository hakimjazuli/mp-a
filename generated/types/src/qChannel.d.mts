/**
 * @typedef {{resume:()=>void, isLastOnQ:()=>boolean}} QCBReturn
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} AnyButUndefined
 */
/**
 * @template {AnyButUndefined} DEFINEDANY
 */
export class qChannel<DEFINEDANY extends AnyButUndefined> {
    /**
     * @type {Map<AnyButUndefined, [Promise<any>, {}]>}
     */
    static #uniquePromiser: Map<AnyButUndefined, [Promise<any>, {}]>;
    /**
     * @param {AnyButUndefined} id
     * @returns {Promise<QCBReturn>} Resolves when it's safe to proceed for the given id, returning a cleanup function
     */
    static #uniqueCB: (id: AnyButUndefined) => Promise<QCBReturn>;
    /**
     * @template RESULT
     * @param {DEFINEDANY} keyID
     * @param {(options:Omit<QCBReturn,
     * "resume">) =>
     * Promise<RESULT>} asyncCallback
     * @returns {Promise<[RESULT, undefined]|[undefined, Error]>}
     */
    callback<RESULT>(keyID: DEFINEDANY, asyncCallback: (options: Omit<QCBReturn, "resume">) => Promise<RESULT>): Promise<[RESULT, undefined] | [undefined, Error]>;
    #private;
}
export type QCBReturn = {
    resume: () => void;
    isLastOnQ: () => boolean;
};
export type AnyButUndefined = {} | null | number | string | boolean | symbol | bigint | Function;
