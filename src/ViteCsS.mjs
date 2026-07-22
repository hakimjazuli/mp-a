// @ts-check

import { extname } from 'node:path';

import { forOfSync } from './forOfSync.mjs';

/**
 * @param {string} idOrFileName
 * @returns {string|undefined}
 */
export function getExtension(idOrFileName) {
	const clean = idOrFileName.split('?')[0]; // cleanup vite query param
	if (!clean) {
		return;
	}
	return extname(clean).toLowerCase();
}

/**
 * @param {string} string
 * @returns {string}
 */
const processStyleTag = (string) => {
	return string.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (block) =>
		block
			.replace(/\s*\*\s*/g, '*')
			.replace(/<style/g, '<cs-s')
			.replace(/<\/style>/g, '</cs-s>')
			.trim(),
	);
};

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
export function ViteCsS(...extentions) {
	const pluginName = 'Mp-A:Style-to-CsS-optimizer';
	const setOfExtension = new Set();
	for (let i = 0; i < extentions.length; i++) {
		let lowerCased = extentions[i]?.toLowerCase();
		if (!lowerCased) {
			continue;
		}
		if (!lowerCased.startsWith('.')) {
			lowerCased = `.${lowerCased}`;
		}
		setOfExtension.add(lowerCased);
	}
	return {
		name: pluginName,
		transform(code, id) {
			const ext = getExtension(id);
			if (!ext || !setOfExtension.has(ext)) {
				return code;
			}
			return processStyleTag(code);
		},
		generateBundle(_, bundle) {
			forOfSync(Object.entries(bundle), ([fileName, chunk]) => {
				const ext = getExtension(fileName);
				if (chunk.type !== 'chunk' || !ext || !setOfExtension.has(ext)) {
					return;
				}
				chunk.code = processStyleTag(
					chunk.code
						.replace(/\s*([`{}><:;])\s*/g, '$1')
						.replace(/\s*(\/>)\s*/g, '$1')
						.replace(/\s+/g, ' '),
				);
			});
		},
	};
}
