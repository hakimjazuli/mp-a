"use strict";
(() => {
  // src/resolveErrorArray.mjs
  var resolveErrorArray = (unknown) => {
    if (unknown instanceof Error) {
      return [void 0, unknown];
    }
    let message;
    try {
      message = JSON.stringify(unknown);
    } catch {
      try {
        message = String(unknown);
      } catch {
        message = "[Unstringifiable value]";
      }
    }
    const err = new Error(message);
    return [void 0, err];
  };

  // src/qChannel.mjs
  var qChannel = class _qChannel {
    /**
     * @type {Map<DEFINEDANY, WeakKey>}
     */
    #mapped = /* @__PURE__ */ new Map();
    /**
     * @type {Map<AnyButUndefined, [Promise<any>, {}]>}
     */
    static #uniquePromiser = /* @__PURE__ */ new Map();
    /**
     * @param {AnyButUndefined} id
     * @returns {Promise<QCBReturn>} Resolves when it's safe to proceed for the given id, returning a cleanup function
     */
    static #uniqueCB = async (id) => {
      const existing = _qChannel.#uniquePromiser.get(id);
      const { promise, resolve } = Promise.withResolvers();
      const context = {};
      if (existing === void 0) {
        _qChannel.#uniquePromiser.set(id, [promise, context]);
        await Promise.resolve();
      } else {
        const [prevPromise] = existing;
        await prevPromise;
        _qChannel.#uniquePromiser.set(id, [promise, context]);
      }
      const resume = () => {
        resolve(true);
        _qChannel.#uniquePromiser.delete(id);
      };
      return {
        resume,
        isLastOnQ: () => {
          const res = _qChannel.#uniquePromiser.get(id);
          if (!res) {
            return false;
          }
          const [, lastContext] = res;
          return lastContext === context;
        }
      };
    };
    /**
     * @param {DEFINEDANY} keyID
     * @returns {Promise<QCBReturn>}
     */
    #key = async (keyID) => {
      const { resume } = await _qChannel.#uniqueCB(this);
      const mapped = this.#mapped;
      if (!mapped.has(keyID)) {
        mapped.set(keyID, {});
      }
      resume();
      return await _qChannel.#uniqueCB(
        // @ts-expect-error
        mapped.get(keyID)
      );
    };
    /**
     * @template RESULT
     * @param {DEFINEDANY} keyID
     * @param {(options:Omit<QCBReturn,
     * "resume">) =>
     * Promise<RESULT>} asyncCallback
     * @returns {Promise<[RESULT, undefined]|[undefined, Error]>}
     */
    async callback(keyID, asyncCallback) {
      let resume_;
      let res;
      await (async () => {
        try {
          const { resume, isLastOnQ } = await this.#key(keyID);
          resume_ = resume;
          const result = await asyncCallback({ isLastOnQ });
          res = [result, void 0];
        } catch (error) {
          res = resolveErrorArray(error);
        }
      })();
      resume_?.();
      return res;
    }
  };

  // src/trySync.mjs
  function trySync(function_) {
    try {
      const result = function_();
      return [result, void 0];
    } catch (error) {
      return resolveErrorArray(error);
    }
  }

  // src/forOfSync.mjs
  function forOfSync(iterable, handlerCallback) {
    const errors = /* @__PURE__ */ new Set();
    const results = /* @__PURE__ */ new Set();
    let prevError;
    let breakEarly_ = false;
    const breakEarly = () => {
      breakEarly_ = true;
    };
    for (const value of iterable) {
      if (breakEarly_) {
        break;
      }
      const [result, error] = trySync(() => handlerCallback(value, { prevError, breakEarly }));
      if (error) {
        prevError = error;
        errors.add(error);
        continue;
      }
      if (result === void 0) {
        continue;
      }
      results.add(result);
    }
    return [results, errors];
  }

  // src/scrollToTarget.mjs
  var scrollToTarget = (selector) => {
    let target;
    let error;
    try {
      target = document.querySelector(selector);
    } catch (e) {
      error = e;
    }
    if (selector === "#" || error || !target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    target.scrollIntoView({ behavior: "smooth" });
  };

  // src/tryAsync.mjs
  async function tryAsync(asyncFunction_) {
    try {
      const result = await asyncFunction_();
      return [result, void 0];
    } catch (error) {
      return resolveErrorArray(error);
    }
  }

  // src/walkThroughMap.mjs
  var handler = (iterator, callback) => {
    let result = iterator.next();
    while (!result.done) {
      callback(result.value);
      result = iterator.next();
    }
  };
  function walkThroughMap(mapInstance, callback) {
    handler(mapInstance.entries(), callback);
  }

  // src/cleanOuterHTML.mjs
  var cleanOuterHTML = (element) => {
    return element.outerHTML.trim().replace(/\s+/g, " ");
  };

  // src/MpA.mjs
  var MpA = class _MpA extends HTMLAnchorElement {
    static #q = new qChannel();
    /**
     * @description
     * - string document to be displayed when this class fails to fetch or parse document string;
     * - can be overrided;
     * @type {string}
     * @example
     * document.addEventListener('DOMContentLoaded', () => {
     * 	window['is-mp-a']['MpA']['routerErrorDocString'] = `<!DOCTYPE html>
     * 	<html lang="en">
     * 	<head>
     * 	  <meta charset="UTF-8">
     * 	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
     * 	  <title>error</title>
     * 	</head>
     * 	<body>
     * 	  my client side routing error page
     * 	  <a not-mp-a href="/">go to home</a>
     * 	</body>
     * 	</html>`
     * });
     */
    static routerErrorDocString = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>mp-a: routing error</title><style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;font-family:system-ui,sans-serif;background:#f9f9f9;color:#333;}.container{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;text-align:center;padding:1rem;box-sizing:border-box;}h1{font-size:clamp(1.5rem,4vw,2.5rem);margin-bottom:0.5rem;}p{margin:0.5rem 0 1.5rem;max-width:90%;font-size:clamp(1rem,2.5vw,1.25rem);}a{color:#0066cc;text-decoration:none;font-weight:500;font-size:clamp(1rem,2.5vw,1.25rem);}a:hover{text-decoration:underline;}</style></head><body><div class="container"><h1>Routing Error</h1><p>The mp-a client\u2011side MPA routing failed while fetching or parsing the page.</p><a not-mp-a href="/">Go back home</a></div></body></html>';
    /**
     * @param {PointerEvent} ev
     * @returns {void}
     */
    #onclick_ = (ev) => {
      _MpA.#onclick(this, ev);
    };
    connectedCallback() {
      this.addEventListener("click", this.#onclick_);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.#onclick_);
    }
    /**
     * @param {HTMLAnchorElement} anchorElement
     * @param {PointerEvent} event
     * @returns {void}
     */
    static #onclick = (anchorElement, event) => {
      const href = anchorElement.href;
      if (!_MpA.#isInternal(href)) {
        return;
      }
      event.preventDefault();
      if (_MpA.#isLexicallySamePath(this.#resolvedPath, href)) {
        scrollToTarget(_MpA.#getHashValue(href));
        return;
      }
      this.#routeChangeCall(href, true);
    };
    /**
     * @param {string} target
     * @returns {string}
     */
    static #getHashValue(target) {
      return new URL(target, location.origin).hash;
    }
    /**
     * @param {string} updateTo
     * @param {string} currentPath
     * @returns {boolean}
     */
    static #isLexicallySamePath(currentPath, updateTo) {
      const currentURL = new URL(currentPath, location.origin);
      const updateURL = new URL(updateTo, location.origin);
      return currentURL.pathname == updateURL.pathname && currentURL.search == updateURL.search;
    }
    /**
     * @param {string} href
     * @returns {boolean}
     */
    static #isInternal = (href) => {
      const [ret, error] = trySync(() => {
        const url = new URL(href, location.href);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          return false;
        }
        return url.origin == location.origin;
      });
      if (error) {
        return true;
      }
      return ret;
    };
    static #resolvedPath = location.href;
    /**
     * @param {string} updateTo
     * @returns {string}
     */
    static #resolvePath = (updateTo) => {
      return new URL(updateTo, _MpA.#resolvedPath).href;
    };
    static #routeBeforeChange = () => {
      document.dispatchEvent(
        new CustomEvent("is-mp-a:before-route-change", {
          bubbles: true,
          cancelable: true
        })
      );
    };
    static #routeAfterChange = () => {
      document.dispatchEvent(
        new CustomEvent("is-mp-a:after-route-change", {
          bubbles: true,
          cancelable: true
        })
      );
    };
    /**
     * @param {Document} newDocument
     * @returns {void}
     */
    static #reconcileDocumentElement = (newDocument) => {
      this.#reconcileAttrs(document.documentElement, newDocument.documentElement);
    };
    /**
     * @param {Document} document_
     * @returns {Map<string, Element>}
     */
    static #createHeadElements = (document_) => {
      const res = /* @__PURE__ */ new Map();
      forOfSync(document_.head.children, (child) => {
        res.set(cleanOuterHTML(child), child);
      });
      return res;
    };
    /**
     * @type {Map<string, Element>}
     * - key is returntype of cleanOuterHTML;
     */
    static #currentHeadElements = /* @__PURE__ */ new Map();
    /**
     * @param {Element} scriptElement
     * @returns {boolean}
     */
    static #isInlineScript = (scriptElement) => {
      return scriptElement instanceof HTMLScriptElement && !scriptElement.hasAttribute("src");
    };
    /**
     * @param {Document} newDocument
     * @returns {(Promise<any>[])|void}
     */
    static #reconcileHead = (newDocument) => {
      forOfSync(newDocument.body.querySelectorAll("script"), (bodyScripts) => {
        bodyScripts.setAttribute("defer", "");
        newDocument.head.appendChild(bodyScripts);
      });
      _MpA.#reconcileAttrs(document.head, newDocument.head);
      let currentHeadElements = _MpA.#currentHeadElements;
      if (!_MpA.#currentHeadElements.size) {
        currentHeadElements = _MpA.#currentHeadElements = _MpA.#createHeadElements(document);
        return;
      }
      const updatedHeadElements = _MpA.#createHeadElements(newDocument);
      const titleElements = [];
      walkThroughMap(currentHeadElements, ([outerHTMLKey, ref]) => {
        if (!_MpA.#isInlineScript(ref) && updatedHeadElements.has(outerHTMLKey)) {
          return;
        }
        if (ref instanceof HTMLTitleElement) {
          titleElements.push(ref);
        } else {
          ref.remove();
        }
        _MpA.#currentHeadElements.delete(outerHTMLKey);
      });
      const promiseOfScriptLoaded = [];
      walkThroughMap(updatedHeadElements, ([outerHTMLKey, ref]) => {
        if (currentHeadElements.has(outerHTMLKey)) {
          return;
        }
        if (ref instanceof HTMLScriptElement) {
          if (ref.id == "is-mp-a:m-onkey-pa-tched") {
            if (!document.head.querySelector('[id="is-mp-a:m-onkey-pa-tched"]')) {
              document.head.appendChild(ref);
            } else {
              ref.remove();
            }
            return;
          }
          const scriptElement = document.createElement("script");
          this.#reconcileAttrs(scriptElement, ref);
          if (ref.innerHTML.trim()) {
            scriptElement.textContent = ref.textContent;
          }
          if (scriptElement.src) {
            const loadPromise = new Promise((resolve) => {
              scriptElement.addEventListener("load", () => resolve(null));
              scriptElement.addEventListener("error", (err) => {
                console.error(`[Router] Failed to load script: ${scriptElement.src}`, err);
                resolve(null);
              });
            });
            promiseOfScriptLoaded.push(loadPromise);
          }
          ref = scriptElement;
        }
        if (ref instanceof HTMLTitleElement) {
          titleElements.push(ref);
        } else {
          document.head.appendChild(ref);
        }
        _MpA.#currentHeadElements.set(outerHTMLKey, ref);
      });
      switch (titleElements.length) {
        case 1:
          titleElements[0].remove();
          break;
        case 2:
          titleElements[0].replaceWith(titleElements[1]);
          break;
      }
      return promiseOfScriptLoaded;
    };
    /**
     * @param {HTMLElement} current
     * @param {HTMLElement} updateTo
     * @returns {void}
     */
    static #reconcileAttrs = (current, updateTo) => {
      const currentAttrNames = /* @__PURE__ */ new Set();
      forOfSync(current.attributes, ({ name }) => {
        currentAttrNames.add(name);
      });
      const updateToAttrNames = /* @__PURE__ */ new Set();
      forOfSync(updateTo.attributes, ({ name }) => {
        updateToAttrNames.add(name);
      });
      const unions = currentAttrNames.union(updateToAttrNames);
      forOfSync(unions, (name) => {
        const updateToAttrNamesHasName = updateToAttrNames.has(name);
        const currentAttrNamesHasNames = currentAttrNames.has(name);
        if (!updateToAttrNamesHasName && currentAttrNamesHasNames) {
          current.removeAttribute(name);
          return;
        }
        if (updateToAttrNamesHasName && !currentAttrNamesHasNames) {
          const newValue = updateTo.getAttribute(name) ?? "";
          current.setAttribute(name, newValue);
          return;
        }
        if (updateToAttrNamesHasName && currentAttrNamesHasNames) {
          const newValue = updateTo.getAttribute(name);
          if (!newValue || current.getAttribute(name) === newValue) {
            return;
          }
          current.setAttribute(name, newValue);
        }
      });
    };
    /**
     * @param {string} currentDocumentStringValue
     * @returns {Promise<void>}
     */
    static #parseStringThenAssign = async (currentDocumentStringValue) => {
      const document_ = new DOMParser().parseFromString(currentDocumentStringValue, "text/html");
      _MpA.#reconcileDocumentElement(document_);
      const promises = _MpA.#reconcileHead(document_);
      const { finished } = _MpA.#reconcileBody(document_);
      if (promises) {
        promises.push(finished);
        await Promise.all(promises);
      } else {
        await finished;
      }
    };
    /**
     * @param {Document} newDocument
     * @returns {ViewTransition}
     */
    static #reconcileBody = (newDocument) => {
      this.#reconcileAttrs(document.body, newDocument.body);
      return document.startViewTransition(() => {
        document.body.innerHTML = newDocument.body.innerHTML;
      });
    };
    /**
     * @param {string} path
     * @param {boolean} isPush
     * @returns {void}
     */
    static #routeChangeCall = (path, isPush) => {
      path = _MpA.#resolvedPath = _MpA.#resolvePath(path);
      tryAsync(async () => {
        const res = await fetch(path);
        return [await res.text(), path];
      }).then(([text, error]) => {
        _MpA.#q.callback(_MpA.#routeChangeCall, async ({ isLastOnQ }) => {
          if (error) {
            text = [_MpA.routerErrorDocString, path];
          }
          if (!isLastOnQ() || path !== _MpA.#resolvedPath) {
            return;
          }
          scrollToTarget("#");
          _MpA.#routeBeforeChange();
          await _MpA.#parseStringThenAssign(
            // @ts-expect-error
            text[0]
          );
          if (isPush) {
            history.pushState(null, "", path);
          }
          _MpA.#routeAfterChange();
        });
      });
    };
    static {
      const mpaID = "is-mp-a";
      if (!window[mpaID]) {
        window[mpaID] = {};
      }
      window[mpaID]["MpA"] = _MpA;
      window.addEventListener("popstate", (ev) => {
        ev.preventDefault();
        _MpA.#routeChangeCall(window.location.href, false);
      });
      const notMpA = "not-mp-a";
      document.addEventListener("click", (ev) => {
        const target = ev.target;
        if (!target || !(target instanceof Element)) {
          return;
        }
        const anchorElement = target.closest("a");
        if (!anchorElement || anchorElement.hasAttribute(notMpA) || anchorElement.getAttribute("href")?.startsWith("#") || anchorElement.getAttribute("is") == "mp-a") {
          return;
        }
        return _MpA.#onclick(anchorElement, ev);
      });
      customElements.define("mp-a", _MpA, {
        extends: "a"
      });
      const promises = this.#reconcileHead(document);
      tryAsync(async () => {
        if (!promises) {
          return;
        }
        await Promise.all(promises).then(() => {
        });
      }).then(() => {
        this.#routeAfterChange();
      });
    }
  };
})();
