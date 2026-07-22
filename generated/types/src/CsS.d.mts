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
export declare class CsS extends HTMLElement {
    #private;
    connectedCallback(): void;
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
    static css: (strings: TemplateStringsArray, ...values: string[]) => {
        scope: (pseudo: 'next' | 'prev' | 'parent' | {
            closest: string;
        }) => HTMLElement;
    };
}
