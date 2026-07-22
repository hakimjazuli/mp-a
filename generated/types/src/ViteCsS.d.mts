/**
 * @param {string} idOrFileName
 * @returns {string|undefined}
 */
export declare function getExtension(idOrFileName: string): string | undefined;
/**
 * @description
 * - `vite` plugin to `render` & `build` `style[is="cs-s"]` tag of the source into using `cs-s` tag instead;
 * @param {Array<string>} extentions
 * - file extensions to checked and render with the transformation;
 * - case insensitive;
 * - auto prefixed with `.`;
 * @returns {import('vite').PluginOption}
 * @example
 * import { ViteCsS } from '@hakim_jazuli/mp-a/node';
 *
 * import process from 'node:process';
 *
 * export default defineConfig({
 * 	build: {},
 * 	plugins: [
 * 		ViteCsS(
 * 			'mjs', // standard esm extension
 * 			'mts', // module ts project extension
 * 			'html', // standard html entry point
 * 			'js' // post bundled handler
 * 		),
 *  ],
 * })
 */
export declare function ViteCsS(...extentions: Array<string>): import('vite').PluginOption;
