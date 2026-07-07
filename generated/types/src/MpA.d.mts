/**
 * @description
 * - available on global `window['is-mp-a']['MpA']`;
 * - class helper for `[is="mp-a"]`;
 * >- customWebComponent extends HTMLAnchorElement via `[is]`;
 */
export class MpA extends HTMLAnchorElement {
    static #q: qChannel<import("./qChannel.mjs").AnyButUndefined>;
    static #ismpatched: string;
    static #ismpatchedID: string;
    /**
     * @param {Event} ev
     * @returns {void}
     */
    static #prefetch: (ev: Event) => void;
    /**
     * @description
     * - string document to be displayed when this class fails to fetch or parse document string;
     * - can be overrided;
     * @type {string}
     * @example
     * document.addEventListener('DOMContentLoaded', () => {
     * 	window['is-mp-a']['MpA']['routerErrorDocString'] = `<!DOCTYPE html>
     * 		<html lang="en">
     * 			<head>
     * 				<meta charset="UTF-8" />
     * 				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
     * 				<title>mp-a: routing error</title>
     * 				<style>
     * 					html,
     * 					body {
     * 						margin: 0;
     * 						padding: 0;
     * 						width: 100%;
     * 						height: 100%;
     * 						overflow: hidden;
     * 						font-family: system-ui, sans-serif;
     * 						background: #f9f9f9;
     * 						color: #333;
     * 					}
     * 					.container {
     * 						display: flex;
     * 						flex-direction: column;
     * 						justify-content: center;
     * 						align-items: center;
     * 						width: 100%;
     * 						height: 100%;
     * 						text-align: center;
     * 						padding: 1rem;
     * 						box-sizing: border-box;
     * 					}
     * 					h1 {
     * 						font-size: clamp(1.5rem, 4vw, 2.5rem);
     * 						margin-bottom: 0.5rem;
     * 					}
     * 					p {
     * 						margin: 0.5rem 0 1.5rem;
     * 						max-width: 90%;
     * 						font-size: clamp(1rem, 2.5vw, 1.25rem);
     * 					}
     * 					a {
     * 						color: #0066cc;
     * 						text-decoration: none;
     * 						font-weight: 500;
     * 						font-size: clamp(1rem, 2.5vw, 1.25rem);
     * 					}
     * 					a:hover {
     * 						text-decoration: underline;
     * 					}
     * 				</style>
     * 			</head>
     * 			<body>
     * 				<div class="container">
     * 					<h1>Routing Error</h1>
     * 					<p>The mp-a client‑side MPA routing failed while fetching or parsing the page.</p>
     * 					<a not-mp-a href="/">Go back home</a>
     * 				</div>
     * 			</body>
     * 		</html>
     * 		`
     * });
     */
    static routerErrorDocString: string;
    /**
     * @param {any} object
     * @param {(ev: Event) => any} event
     * @param {( keyof HTMLElementEventMap)[]} types
     */
    static #chainAddEvent: (object: any, event: (ev: Event) => any, ...types: (keyof HTMLElementEventMap)[]) => void;
    /**
     * @param {any} object
     * @param {(ev: Event) => any} event
     * @param {( keyof HTMLElementEventMap)[]} types
     */
    static #chainRemoveEvent: (object: any, event: (ev: Event) => any, ...types: (keyof HTMLElementEventMap)[]) => void;
    /**
     * @param {HTMLAnchorElement} anchorElement
     * @param {Event} event
     * @returns {void}
     */
    static #onclick: (anchorElement: HTMLAnchorElement, event: Event) => void;
    /**
     * @param {string} target
     * @returns {string}
     */
    static #getHashValue(target: string): string;
    /**
     * @param {string} updateTo
     * @param {string} currentPath
     * @returns {boolean}
     */
    static #isLexicallySamePath(currentPath: string, updateTo: string): boolean;
    /**
     * @param {string} href
     * @returns {boolean}
     */
    static #isInternal: (href: string) => boolean;
    static #resolvedPath: string;
    /**
     * @param {string} updateTo
     * @returns {string}
     */
    static #resolvePath: (updateTo: string) => string;
    static #routeBeforeChange: () => void;
    static #routeAfterChange: () => void;
    /**
     * @param {Document} newDocument
     * @returns {void}
     */
    static #reconcileDocumentElement: (newDocument: Document) => void;
    /**
     * @param {Document} document_
     * @returns {Map<string, Element>}
     */
    static #createHeadElements: (document_: Document) => Map<string, Element>;
    /**
     * @type {Map<string, Element>}
     * - key is returntype of cleanOuterHTML;
     */
    static #currentHeadElements: Map<string, Element>;
    /**
     * @param {Element} scriptElement
     * @returns {boolean}
     */
    static #isInlineScript: (scriptElement: Element) => boolean;
    /**
     * @param {Document} newDocument
     * @returns {(Promise<any>[])|void}
     */
    static #reconcileHead: (newDocument: Document) => (Promise<any>[]) | void;
    /**
     * @param {HTMLElement} current
     * @param {HTMLElement} updateTo
     * @returns {void}
     */
    static #reconcileAttrs: (current: HTMLElement, updateTo: HTMLElement) => void;
    /**
     * @param {string} currentDocumentStringValue
     * @returns {Promise<void>}
     */
    static #parseStringThenAssign: (currentDocumentStringValue: string) => Promise<void>;
    /**
     * @param {Document} newDocument
     * @returns {ViewTransition}
     */
    static #reconcileBody: (newDocument: Document) => ViewTransition;
    static #prefetchName: string;
    /**
     * @param {HTMLAnchorElement} anchorElement
     * @returns {Promise<Response>}
     */
    static #getPrefetch: (anchorElement: HTMLAnchorElement) => Promise<Response>;
    /**
     * @param {string} path
     * @param {boolean} isPush
     * @param {HTMLAnchorElement} [anchorElement]
     * @returns {void}
     */
    static #routeChangeCall: (path: string, isPush: boolean, anchorElement?: HTMLAnchorElement) => void;
    static #mpaID: string;
    static #notMpA: string;
    /**
     * @param {Event} ev
     * @returns {void|HTMLAnchorElement}
     */
    static #getClosestValidMpAAnchor: (ev: Event) => void | HTMLAnchorElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
import { qChannel } from './qChannel.mjs';
