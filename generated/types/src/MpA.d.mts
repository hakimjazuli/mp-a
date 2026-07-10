/**
 * @description
 * - available on global `window['is-mp-a']['MpA']`;
 * - class helper for `[is="mp-a"]`;
 * >- customWebComponent extends HTMLAnchorElement via `[is]`;
 */
export declare class MpA extends HTMLAnchorElement {
    #private;
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
    connectedCallback(): void;
    disconnectedCallback(): void;
}
