// @ts-check

import { resolveErrorArray } from './resolveErrorArray.mjs';

/**
 * @typedef {{resume:()=>void, isLastOnQ:()=>boolean}} QCBReturn
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} AnyButUndefined
 */

/**
 * @template {AnyButUndefined} DEFINEDANY
 */
export class qChannel {
	/**
	 * @type {Map<DEFINEDANY, WeakKey>}
	 */
	#mapped = new Map();
	/**
	 * @type {Map<AnyButUndefined, [Promise<any>, {}]>}
	 */
	static #uniquePromiser = new Map();
	/**
	 * @param {AnyButUndefined} id
	 * @returns {Promise<QCBReturn>} Resolves when it's safe to proceed for the given id, returning a cleanup function
	 */
	static #uniqueCB = async (id) => {
		const existing = qChannel.#uniquePromiser.get(id);
		const { promise, resolve } = Promise.withResolvers();
		const context = {};
		if (existing === undefined) {
			qChannel.#uniquePromiser.set(id, [promise, context]);
			await Promise.resolve();
		} else {
			const [prevPromise] = existing;
			await prevPromise;
			qChannel.#uniquePromiser.set(id, [promise, context]);
		}
		const resume = () => {
			resolve(true);
			qChannel.#uniquePromiser.delete(id);
		};
		return {
			resume,
			isLastOnQ: () => {
				const res = qChannel.#uniquePromiser.get(id);
				if (!res) {
					return false;
				}
				const [, lastContext] = res;
				return lastContext === context;
			},
		};
	};
	/**
	 * @param {DEFINEDANY} keyID
	 * @returns {Promise<QCBReturn>}
	 */
	#key = async (keyID) => {
		const { resume } = await qChannel.#uniqueCB(this);
		const mapped = this.#mapped;
		if (!mapped.has(keyID)) {
			mapped.set(keyID, {});
		}
		resume();
		return await qChannel.#uniqueCB(
			// @ts-expect-error
			mapped.get(keyID),
		);
	};
	/**
	 * @template RESULT
	 * @param {DEFINEDANY} keyID
	 * @param {(options:Omit<QCBReturn,
	 * "resume">) =>
	 * Promise<RESULT>} asyncCallback
	 * @returns {Promise<[RESULT, undefined]|[undefined, Error]>}
	 */
	async callback(keyID, asyncCallback) {
		/**
		 * @type {undefined|(()=>void)}
		 */
		let resume_;
		/**
		 * @type {[RESULT, undefined]|[undefined, Error]}
		 */
		let res;
		await (async () => {
			try {
				const { resume, isLastOnQ } = await this.#key(keyID);
				resume_ = resume;
				const result = await asyncCallback({ isLastOnQ });
				res = [result, undefined];
			} catch (error) {
				res = resolveErrorArray(error);
			}
		})();
		resume_?.();
		// @ts-expect-error
		return res;
	}
}
