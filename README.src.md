# mp-a

`mp-a` (Multiple Page-Anchor) is a lightweight, standalone client-side routing library designed to
convert a production Multi-Page Application (MPA) into a Single-Page Application (SPA) feels runtime
environment. It achieves this with **minimal to no code changes** and **zero external
dependencies**.

---

## How It Works

`mp-a` transparently hijacks the native browser page cycle by coordinating two primary layers:

1. **Anchor Interception:** It automatically captures actions on all standard `HTMLAnchorElement`
   links visible in the document `<body>`. For custom setups (like non-bubbling events inside a
   `shadowRoot` or elements requiring specific initialization parameters), it explicitly extends
   elements via custom element assignment: `[is="mp-a"]`.

   > **Automated Exclusions:** Elements are safely ignored by the routing engine if they possess a
   > `[not-mp-a]` attribute, contain an in-page hash identifier (`[href^="#"]`), or point to a
   > completely external web domain.

2. **Global Event Monkey-Patching:** It transparently wraps `EventTarget.prototype.addEventListener`
   and `.removeEventListener`. Any listeners registered by standard local script assets or inline
   script tags are actively cataloged and forcefully pruned during route transitions to prevent
   global state leaks.

---

## Behavioral Rules

- **Listener Eviction:** All non-global event listeners (listeners not attached to `window`,
  `document`, `<head>`, or `<body>`) are systematically wiped on route changes.
- **Inline Script Re-execution:** Inline scripts always re-execute on every single route
  transaction—even if their underlying `outerHTML` fingerprint matches perfectly (with the sole
  exception of the core `script#is-mp-a:m-onkey-pa-tched` utility initialization tag).
- **Inline Listener Pruning:** Any event listener bound inside an inline script—even if targeted at
  global boundaries like `window`—is pruned during a route change to prepare a clean slate for the
  incoming view execution pass.
- **Lifecycle Virtualization:** The native `DOMContentLoaded` event listener is safely intercepted,
  managed, and virtually re-triggered upon every successful client-side route navigation.

---

## 1) Minimal to No Code Changes & Caveats

Standard MPA best practices dictate wrapping execution blocks inside a `DOMContentLoaded` event
listener to ensure target DOM nodes are parsed and queryable before script evaluation:

```html
<body>
	<div id="myDiv">Hello?</div>
	<script>
		// This inline block evaluates fine, but has no teardown strategy
		document.querySelector('#myDiv').innerHTML = 'HELLO WORLD';
	</script>
</body>
```

- In 90% of legacy scenarios, you do not need to wrap or edit your codebase. However, if your page
  spawns long-lived asynchronous or environmental instances (such as Web Workers, Server-Sent
  Events, WebSockets, or MutationObservers), you must leverage `mp-a`'s custom functional return
  capability inside a DOMContentLoaded interceptor to prevent memory leaks across routes:

```html
<body>
	<div id="myDiv">Hello?</div>
	<script>
		document.querySelector('#myDiv').innerHTML = 'HELLO WORLD';

		document.addEventListener('DOMContentLoaded', () => {
			const workerInstance = new Worker('/analytics.js');
			const observerInstance = new MutationObserver(() => {
				/* ... */
			});
			observerInstance.observe(document.body, { childList: true });

			// The mp-a Hook: Return a cleanup callback
			return () => {
				workerInstance.terminate();
				observerInstance.disconnect();
				console.log('Successfully swept long-lived instances on route change!');
			};
		});
	</script>
</body>
```

> - The Hook Contract: When a user triggers navigation away from the current view, `mp-a` catches
>   this returned callback function and fires it synchronously during the before-route-change
>   lifecycle phase.

---

<h2 id="two">2) Zero dependency</h2>

- `mp-a` runs natively without dependencies on `Chromium`, `Firefox`, and all modern browsers
  supporting customized built-in elements using the HTML is attribute wrapper.

- For Apple `Safari` or older `WebKit WebViews` missing native customized element support, include
  the tiny polyfill provided in the distribution folder;

- Native Support Environments: `ElectronJS`, `Wails`/`Tauri` bundles mapping strictly to
  Windows/Linux, Chromium-only web panels.

- Polyfill Required Environments: iOS Safari, macOS Safari, general cross-platform mobile hybrid web
  apps.

---

<h2 id="dist">Dist</h2>

the [dist directory](https://github.com/hakimjazuli/mp-a/blob/main/dist/) contains the optimized
runtime assets needed to activate the engine::

- `MonkeyPAtch.min.js`: monkey patcher for `.addEventListener` and `.removeEventListener` to run
  standard MPA event hydration run smoothly even when Routing is handle on client side, need to be
  put before any and all script element, install via `script[src]`;

```html
<head>
	<!-- other head Elements -->
	<script id="is-mp-a:m-onkey-pa-tched" src="/assets/js/MonkeyPAtch.min.js"></script>
	<!-- other head Elements -->
	<!-- other scripts need to be placed after monkey patch -->
</head>
```

- `MonkeyPAtch.html`: inline monkey patch script element, incase using `script[src]` somehow not
  possible on your `setting` / `bundler`;

```html
<head>
	<!-- other head Elements -->
	<script id="is-mp-a:m-onkey-pa-tched">
		// the actual script
	</script>
	<!-- other head Elements -->
	<!-- other scripts need to be placed after monkey patch -->
</head>
```

- `main.js`: main script to add Client Side Routing Behaviour, needs to be the last script right before body closing tag;

```html
<body>
	<!-- other body elements -->
	<!-- <script src="/assets/js/ungap-custom-elements.min.js"></script> -->
	<!-- other scripts -->
	<script src="/assets/js/main.js"></script>
</body>
```

- `main.min.js`: minified main script, needs to be the last script right before body closing tag;

```html
<body>
	<!-- other body elements -->
	<!-- <script src="/assets/js/ungap-custom-elements.min.js"></script> -->
	<!-- other scripts -->
	<script src="/assets/js/main.min.js"></script>
</body>
```

- `ungap-custom-elements.min.js`: working `@ungap/custom-elements` version for `mp-a` to function on
  Safari and/or other browser/webView that doesn't support
  [[is] attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/is),
  if you are only supporting browser that support
  [[is] attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/is)(`electronJS`,
  `wails`/`tauri` bundles only to windows) you can run this library without
  `@ungap/custom-elements`;

```html
<body>
	<!-- other body elements -->
	<script src="/assets/js/ungap-custom-elements.min.js"></script>
	<!-- other scripts -->
	<script src="/assets/js/main.min.js"></script>
</body>
```
