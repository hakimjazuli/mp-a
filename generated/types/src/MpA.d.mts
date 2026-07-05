/**
 * @description
 * - available on global `window['is-mp-a']['MpA']`;
 * - class helper for `[is="mp-a"]`;
 * >- customWebComponent extends HTMLAnchorElement via `[is]`;
 */
export class MpA extends HTMLAnchorElement {
    static #q: qChannel<import("./qChannel.mjs").AnyButUndefined>;
    /**
     * @description
     * - string document to be displayed when this class fails to fetch or parse document string;
     * - can be overrided;
     * @type {string}
     * @example
     * window['is-mp-a']['MpA'] = `<!DOCTYPE html>
     *<html lang="en">
     *<head>
     *  <meta charset="UTF-8">
     *  <meta name="viewport" content="width=device-width, initial-scale=1.0">
     *  <title>error</title>
     *</head>
     *<body>
     *  my client side routing error page
     *  <a href="/">go to home</a>
     *</body>
     *</html>`
     */
    static routerErrorDocString: string;
    /**
     * @param {HTMLAnchorElement} anchorElement
     * @param {PointerEvent} event
     * @returns {void}
     */
    static #onclick: (anchorElement: HTMLAnchorElement, event: PointerEvent) => void;
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
    /**
     * @param {string} path
     * @param {boolean} isPush
     * @returns {void}
     */
    static #routeChangeCall: (path: string, isPush: boolean) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
import { qChannel } from './qChannel.mjs';
