/**
 * @description
 * Utility custom element for scoped styling.
 *
 * - Overview
 * >- Extends `<style>` with `is="cs-s"` to provide per‑element scoped CSS.
 * >- Uses `scope` attribute (`next`, `prev`, `parent`, `closest cssSelector`) to determine
 *   which DOM element the style block applies to.
 * >- Rewrites placeholders:
 * >>- `--scope` → rewritten to a unique class selector (e.g. `.cs-s-1`)
 * >>- `--varname`   → rewritten to a unique identifier string (e.g. `--cs-s-1`)
 * >>- `__varname`   → rewritten to a unique identifier string (e.g. `__cs-s-1`)
 * >- Automatically adds the generated class to the scope element and removes
 *   `.cs-s` once styles are applied.
 *
 * - Features
 * >- Full CSS syntax support: selectors, combinators, @keyframes, @media, etc.
 * >- Scoped assurance: each block is isolated, no global bleed.
 * >- Individuality: each element can carry its own animation grammar.
 * >- Declarative alternative to JS animation libraries (GSAP, Anime.js).
 *
 * - Example
 * ```html
 * <style>.cs-s{display:none;}</style>
 * <style is="cs-s" scope="next">
 * --scope {
 *   animation: __varname 1s ease-in-out forwards;
 * }
 * @keyframes __varname {
 *   from { opacity: 0; transform: translateY(20px); }
 *   to   { opacity: 1; transform: translateY(0); }
 * }
 * </style>
 * <img src="panel.png" class="cs-s">
 * <div class="cs-s">
 * 	red
 * 	<div>
 * 		<div>
 * 			<style is="cs-s" scope=".cs-s">
 * 				--scope {
 * 					background: red;
 * 				}
 * 			</style>
 * 		</div>
 * 	</div>
 * </div>
 * ```
 *
 * Runtime rewrite:
 * ```css
 * .cs-s-1 {
 *   animation: __cs-s-1 1s ease-in-out forwards;
 * }
 * @keyframes __cs-s-1 {
 *   from { opacity: 0; transform: translateY(20px); }
 *   to   { opacity: 1; transform: translateY(0); }
 * }
 * ```
 *
 * - Disclaimer
 * This is **not** an alternative to CSS libraries or frameworks that focus on
 * extreme optimization (e.g. Tailwind, Sass, Less). In fact, it is less optimized
 * than standard inline styling. The goal is **individuality, scoped assurance,
 * and full CSS syntax support**. It is fair to say this library is more of an
 * alternative to JS animation libraries, but with extremely low abstraction:
 * developers write animations directly in CSS, scoped per element, without
 * needing imperative JS timelines.
 */
export declare class IsCsS extends HTMLStyleElement {
    #private;
    connectedCallback(): void;
}
