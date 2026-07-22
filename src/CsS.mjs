// @ts-check

import { trySync } from './trySync.mjs';
import { validScopeAttributeValue } from './validScopeAttributeValue.mjs';

/**
 * @description
 * - tagname `cs-s` version of [IsCsS](#iscss);
 * ```html
 * <div class="cs-s">salmon</div>
 * <cs-s scope="prev">
 *  --scope {
 *    background: salmon;
 *  }
 * </cs-s>
 * ```
 * - slightly more efficient then [IsCsS](#iscss);
 * >- skip the initial pre replaced `--target` and `--name` from being parsed by css enigine;
 * - however you might need additional setup for
 * >- your `IDE` to recognise the css string; OR
 * >- your `build tools` to recognise the css string;
 * >>- in case you use `vite`, you can use this class instead of `IsCsS`, and [ViteCsS](#vitecss), then uses `style[scope]` directly;
 * ```html
 * <div class="cs-s">
 * 	<style scope="parent">
 * 		--scope {
 * 			background: red;
 * 			div{
 * 				background: salmon;
 * 			}
 * 		}
 * 	</style>
 * 	red
 * 	<div>salmon</div>
 * 	<div class="cs-s">cyan
 * 		<style scope="parent">
 * 			--scope {
 * 				background: cyan;
 * 			}
 * 		</style>
 * 	</div>
 * </div>
 * ```
 */
export class CsS extends HTMLElement {
	static *#idGenerator() {
		let counter = 0;
		while (true) {
			yield ++counter;
		}
	}
	static #generatorRef = CsS.#idGenerator();
	/**
	 * @type {string|undefined}
	 */
	#scopeID_;
	get #scopeID() {
		if (!this.#scopeID_) {
			this.#scopeID_ = `cs-s-${CsS.#generatorRef.next().value}`;
		}
		return this.#scopeID_;
	}
	/**
	 * @type {string|undefined}
	 */
	#scopeClass_;
	get #scopeClass() {
		if (!this.#scopeClass_) {
			this.#scopeClass_ = `.${this.#scopeID}`;
		}
		return this.#scopeClass_;
	}
	connectedCallback() {
		this.#checkScope();
		this.#reparse();
		this.#assumeReady();
	}
	/**
	 * @type {Element|null|undefined}
	 */
	#scopeRef;
	#checkScope = () => {
		const scope = this.getAttribute(CsS.#scopeAttrName);
		switch (scope) {
			case 'prev':
				this.#scopeRef = this.previousElementSibling;
				break;
			case 'parent':
				this.#scopeRef = this.parentElement;
				break;
			case 'next':
				this.#scopeRef = this.nextElementSibling;
				break;
			default:
				const [element, warnClosest] = this.#checkClosest(scope);
				if (warnClosest) {
					console.warn({
						warnClosest,
						validScopeAttributeValue,
					});
					this.#scopeRef = this.parentElement;
				} else {
					this.#scopeRef = element;
				}
				break;
		}
	};
	/**
	 * @param {string|null} scope
	 * @returns {ReturnType<typeof trySync<Element>>}
	 */
	#checkClosest = (scope) => {
		return trySync(() => {
			const closest = this.closest(
				// @ts-expect-error
				scope,
			);
			if (!closest) {
				throw `IsCsS couldn't target .closest('${scope}') default to "parent" instead`;
			}
			return closest;
		});
	};
	/**
	 * @type {string}
	 */
	#shouldBeInner = '';
	#reparse = () => {
		this.#shouldBeInner = this.innerHTML
			.replace(/--scope/g, this.#scopeClass)
			.replace(/--varname/g, `--${this.#scopeID}`)
			.replace(/__varname/g, `__${this.#scopeID}`);
	};
	#assumeReady = () => {
		const scopeRef = this.#scopeRef;
		if (!scopeRef) {
			return;
		}
		const trueStyle = document.createElement(CsS.#styleTagName);
		trueStyle.innerHTML = this.#shouldBeInner;
		this.replaceWith(trueStyle);
		scopeRef.classList.add(this.#scopeID);
		scopeRef.classList.remove(CsS.#isName);
	};
	static #isName = 'cs-s';
	static #scopeAttrName = 'scope';
	static #styleTagName = 'style';
	/**
	 * @description
	 * - syntax helper for IDE to recognize string as css string;
	 * @param {TemplateStringsArray} strings
	 * @param {...string} values
	 * @returns {{scope:(pseudo:'next'|'prev'|'parent'|{closest:string})=>HTMLElement}}
	 * @example
	 * import { CSs } from '@hakim_jazuli/mp-a/browser';
	 * const { css } = CSs;
	 * const cssElement = css`
	 * 		--scope{
	 * 			background: salmon;
	 * 		}
	 * `.scope('parent');
	 */
	static css = (strings, ...values) => {
		const parts = new Array(strings.length + values.length);
		for (let i = 0; i < strings.length; i++) {
			parts[i * 2] = strings[i];
			if (i < values.length) {
				parts[i * 2 + 1] = values[i];
			}
		}
		return {
			scope: (pseudo) => {
				const cssElement = document.createElement(CsS.#isName);
				const scopeAttrName = CsS.#scopeAttrName;
				if (typeof pseudo == 'string') {
					cssElement.setAttribute(scopeAttrName, pseudo);
				} else {
					cssElement.setAttribute(scopeAttrName, pseudo.closest);
				}
				cssElement.innerHTML = parts.join('');
				return cssElement;
			},
		};
	};
	static {
		customElements.define(CsS.#isName, CsS);
	}
}
