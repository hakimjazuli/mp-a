export type QCBReturn = {
    resume: () => void;
    isLastOnQ: () => boolean;
};
export type AnyButUndefined = {} | null | number | string | boolean | symbol | bigint | function;
/**
 * @typedef {{resume:()=>void, isLastOnQ:()=>boolean}} QCBReturn
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} AnyButUndefined
 */
/**
 * @template {AnyButUndefined} DEFINEDANY
 */
export declare class qChannel<DEFINEDANY extends AnyButUndefined> {
    #private;
    /**
     * @template RESULT
     * @param {DEFINEDANY} keyID
     * @param {(options:Omit<QCBReturn,
     * "resume">) =>
     * Promise<RESULT>} asyncCallback
     * @returns {Promise<[RESULT, undefined]|[undefined, Error]>}
     */
    callback<RESULT>(keyID: DEFINEDANY, asyncCallback: (options: Omit<QCBReturn, "resume">) => Promise<RESULT>): Promise<[RESULT, undefined] | [undefined, Error]>;
}
