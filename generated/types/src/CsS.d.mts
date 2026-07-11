/**
 * @description
 * Utility custom element for scoped styling.
 *
 * - Overview
 * >- Extends `<style>` with `is="cs-s"` to provide per‑element scoped CSS.
 * >- Uses `target` attribute (`next`, `prev`, `parent`) to determine
 *   which DOM element the style block applies to.
 * >- Rewrites placeholders:
 * >>- `:target` → rewritten to a unique class selector (e.g. `.cs-s-1`)
 * >>- `-name`   → rewritten to a unique identifier string (e.g. `cs-s-1`)
 * >- Automatically adds the generated class to the target element and removes
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
 * <style is="cs-s" target="next">
 * :target {
 *   animation: -name 1s ease-in-out forwards;
 * }
 * @keyframes -name {
 *   from { opacity: 0; transform: translateY(20px); }
 *   to   { opacity: 1; transform: translateY(0); }
 * }
 * </style>
 * <img src="panel.png" class="cs-s">
 * ```
 *
 * Runtime rewrite:
 * ```css
 * .cs-s-1 {
 *   animation: cs-s-1 1s ease-in-out forwards;
 * }
 * @keyframes cs-s-1 {
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
export declare class CsS extends HTMLStyleElement {
    #private;
    targetRef: Element | HTMLElement | null | undefined;
    connectedCallback(): void;
    /**
     * @type {string}
     */
    innerHTML: string;
}
