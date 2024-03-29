/* eslint:disable */

/* -------------------------------------------------- */

/*      Start of Webpack Hot Extension Middleware     */

/* ================================================== */

/*  This will be converted into a lodash templ., any  */

/*  external argument must be provided using it       */

/* -------------------------------------------------- */
(function (window) {
  var injectionContext = this || window || {
    browser: null
  };

  (function () {
    ""||(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.8.0 - Tue Apr 20 2021 11:27:38 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      }); // Keep track if the deprecation warning has been logged at least once.

      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    } // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map
"";
  })();

  var _ref = injectionContext || {},
      browser = _ref.browser;

  var signals = JSON.parse('{"SIGN_CHANGE":"SIGN_CHANGE","SIGN_RELOAD":"SIGN_RELOAD","SIGN_RELOADED":"SIGN_RELOADED","SIGN_LOG":"SIGN_LOG","SIGN_CONNECT":"SIGN_CONNECT"}');
  var config = JSON.parse('{"RECONNECT_INTERVAL":2000,"SOCKET_ERR_CODE_REF":"https://tools.ietf.org/html/rfc6455#section-7.4.1"}');
  var reloadPage = "true" === "true";
  var wsHost = "ws://localhost:9090";
  var SIGN_CHANGE = signals.SIGN_CHANGE,
      SIGN_RELOAD = signals.SIGN_RELOAD,
      SIGN_RELOADED = signals.SIGN_RELOADED,
      SIGN_LOG = signals.SIGN_LOG,
      SIGN_CONNECT = signals.SIGN_CONNECT;
  var RECONNECT_INTERVAL = config.RECONNECT_INTERVAL,
      SOCKET_ERR_CODE_REF = config.SOCKET_ERR_CODE_REF;
  var extension = browser.extension,
      runtime = browser.runtime,
      tabs = browser.tabs;
  var manifest = runtime.getManifest(); // =============================== Helper functions ======================================= //

  var formatter = function formatter(msg) {
    return "[ WER: ".concat(msg, " ]");
  };

  var logger = function logger(msg) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
    return console[level](formatter(msg));
  };

  var timeFormatter = function timeFormatter(date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }; // ========================== Called only on content scripts ============================== //


  function contentScriptWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref2) {
      var type = _ref2.type,
          payload = _ref2.payload;

      switch (type) {
        case SIGN_RELOAD:
          logger("Detected Changes. Reloading...");
          reloadPage && window.location.reload();
          break;

        case SIGN_LOG:
          console.info(payload);
          break;

        default:
          break;
      }
    });
  } // ======================== Called only on background scripts ============================= //


  function backgroundWorker(socket) {
    runtime.onMessage.addListener(function (action, sender) {
      if (action.type === SIGN_CONNECT) {
        return Promise.resolve(formatter("Connected to Web Extension Hot Reloader"));
      }

      return true;
    });
    socket.addEventListener("message", function (_ref3) {
      var data = _ref3.data;

      var _JSON$parse = JSON.parse(data),
          type = _JSON$parse.type,
          payload = _JSON$parse.payload;

      if (type === SIGN_CHANGE && (!payload || !payload.onlyPageChanged)) {
        tabs.query({
          status: "complete"
        }).then(function (loadedTabs) {
          loadedTabs.forEach(function (tab) {
            return tab.id && tabs.sendMessage(tab.id, {
              type: SIGN_RELOAD
            });
          });
          socket.send(JSON.stringify({
            type: SIGN_RELOADED,
            payload: formatter("".concat(timeFormatter(new Date()), " - ").concat(manifest.name, " successfully reloaded"))
          }));
          runtime.reload();
        });
      } else {
        runtime.sendMessage({
          type: type,
          payload: payload
        });
      }
    });
    socket.addEventListener("close", function (_ref4) {
      var code = _ref4.code;
      logger("Socket connection closed. Code ".concat(code, ". See more in ").concat(SOCKET_ERR_CODE_REF), "warn");
      var intId = setInterval(function () {
        logger("Attempting to reconnect (tip: Check if Webpack is running)");
        var ws = new WebSocket(wsHost);

        ws.onerror = function () {
          return logger("Error trying to re-connect. Reattempting in ".concat(RECONNECT_INTERVAL / 1000, "s"), "warn");
        };

        ws.addEventListener("open", function () {
          clearInterval(intId);
          logger("Reconnected. Reloading plugin");
          runtime.reload();
        });
      }, RECONNECT_INTERVAL);
    });
  } // ======================== Called only on extension pages that are not the background ============================= //


  function extensionPageWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref5) {
      var type = _ref5.type,
          payload = _ref5.payload;

      switch (type) {
        case SIGN_CHANGE:
          logger("Detected Changes. Reloading...");
          reloadPage && window.location.reload();
          break;

        case SIGN_LOG:
          console.info(payload);
          break;

        default:
          break;
      }
    });
  } // ======================= Bootstraps the middleware =========================== //


  runtime.reload ? extension.getBackgroundPage() === window ? backgroundWorker(new WebSocket(wsHost)) : extensionPageWorker() : contentScriptWorker();
})(window);
/* ----------------------------------------------- */

/* End of Webpack Hot Extension Middleware  */

/* ----------------------------------------------- *//*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    achievements: {\n      type: Array,\n      required: true\n    }\n  },\n  // Only methods for this component are view controllers that delegate work to PassiveMode.vue\n  methods: {\n    backToPassive() {\n      this.$emit('backToPassive');\n    },\n\n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    timeToGo: {\n      type: Number,\n      required: true\n    },\n    formattedTimeToGo: {\n      type: Number,\n      required: true\n    },\n    startTime: {\n      type: Number,\n      required: true\n    },\n    alertTime: {\n      type: Number,\n      required: true,\n      default: 15\n    }\n  },\n  computed: {\n    // - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    circleArray() {\n      return `${(this.timeFraction * 283).toFixed(0)} 283`;\n    },\n\n    // - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    timeFraction() {\n      return this.timeToGo / this.startTime - 1 / this.timeToGo * (1 - this.timeToGo / this.startTime);\n    },\n\n    // - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    colours() {\n      return {\n        info: {\n          colour: \"green\"\n        },\n        alert: {\n          colour: \"red\",\n          threshold: this.alertTime\n        }\n      };\n    },\n\n    // - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    colourOfTimer() {\n      const {\n        info,\n        alert\n      } = this.colours;\n\n      if (this.timeToGo <= alert.threshold) {\n        return alert.colour;\n      } else {\n        return info.colour;\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassiveModeChart.vue */ \"./src/components/PassiveModeChart.vue\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // The Labels and Counts props are for the chart data. This is just a way of structuring the information into labels and values so that it can be rendered by the chart.\n  props: {\n    passiveModeCountries: {\n      type: Array,\n      required: true\n    },\n    passiveCountryLabels: {\n      type: Array,\n      required: true\n    },\n    passiveCountryCounts: {\n      type: Array,\n      required: true\n    }\n  },\n  methods: {\n    // In this instance, both of the methods are just view controller methods. Therefore, they delegate the work of changing this view to the PassiveMode page.\n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n    },\n\n    CountToPassive() {\n      this.$emit('CountToPassive');\n    }\n\n  },\n  computed: {\n    // Allows us to order the list of countries by count.\n    orderedCountries() {\n      return lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(this.passiveModeCountries, 'count', 'desc');\n    }\n\n  },\n  components: {\n    PassiveModeChart: _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n\n  data() {\n    return {\n      labelsArray: [],\n      dataArray: [],\n      vm: this,\n      // Options and Data for the Chart:\n      options: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 40\n      },\n      chartData: {\n        labels: this.passiveCountryLabels,\n        datasets: [{\n          label: \"DifferentCountries\",\n          backgroundColor: ['darkolivegreen', 'firebrick', 'LightSeaGreen', 'Peru', 'Sienna', 'SlateGrey', 'darkgreen', '#20C20E'],\n          data: this.passiveCountryCounts\n        }]\n      }\n    };\n  }\n\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_PassiveMode_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/PassiveMode.vue */ \"./src/components/PassiveMode.vue\");\n/* harmony import */ var _components_OptionsView_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/OptionsView.vue */ \"./src/components/OptionsView.vue\");\n/* harmony import */ var _components_JoinLobby_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/JoinLobby.vue */ \"./src/components/JoinLobby.vue\");\n/* harmony import */ var _components_LobbyView_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/LobbyView.vue */ \"./src/components/LobbyView.vue\");\n/* harmony import */ var _components_LeaderBoard_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/LeaderBoard.vue */ \"./src/components/LeaderBoard.vue\");\n/* harmony import */ var _components_SoloLobby_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/SoloLobby.vue */ \"./src/components/SoloLobby.vue\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    PassiveMode: _components_PassiveMode_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    OptionsView: _components_OptionsView_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    JoinLobby: _components_JoinLobby_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    LobbyView: _components_LobbyView_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    LeaderBoard: _components_LeaderBoard_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    SoloLobby: _components_SoloLobby_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  },\n  // These are event listeners for the relevant Socket.IO emissions made by the server.\n  sockets: {\n    // These two events are in charge of retrieving the Multiplayer and Solo leaderboards from the server.js Socket.IO emission. \n    sendClassicLeaderBoards(MessageDetails) {\n      this.multiClassicLeaderboard = MessageDetails;\n      this.multiClassicLeaderboard = this.multiClassicLeaderboard.slice(0, 11); // This logic strips the \"Created At\" Attribute to just the date. \n\n      for (var i = 0; i < this.multiClassicLeaderboard.length; i++) {\n        this.multiClassicLeaderboard[i].createdAt = this.multiClassicLeaderboard[i].createdAt.toString().substring(0, 10);\n      }\n    },\n\n    sendSoloClassic(MessageDetails) {\n      if (this.UsersID === MessageDetails[1]) {\n        this.soloClassicLeaderboard = MessageDetails[0];\n\n        for (var i = 0; i < this.soloClassicLeaderboard.length; i++) {\n          this.soloClassicLeaderboard[i].createdAt = this.soloClassicLeaderboard[i].createdAt.toString().substring(0, 10);\n        }\n\n        this.personalSoloHS = this.soloClassicLeaderboard.filter(item => item.username === this.UsersID);\n        this.personalSoloHS = this.personalSoloHS.slice(0, 11);\n      }\n    },\n\n    // Event fires on the successful connection to a lobby.\n    lobbySuccess(lobbyDetails) {\n      console.log(\"Successfully connected to lobby\");\n      var lobbyID = lobbyDetails[0];\n      var listOfUsers = lobbyDetails[1];\n      this.playersLobby = lobbyID;\n      this.UsersInLobby = listOfUsers;\n      this.noOfUsersInLobby++; // View Controllers\n\n      this.JoinLobbyPage = false;\n      this.HomePage = false;\n      this.LobbyPage = true;\n      this.lobbyError = false;\n      this.allPlayersReady = false;\n    },\n\n    lobbyFailure() {\n      console.log(\"There was an error when attempting to connect to the lobby\");\n      this.lobbyError = 'Error: Not Able To Connect to Lobby';\n    },\n\n    // Logic for responding to an invite from the server to join a lobby\n    playerInvitedToLobby(MessageDetails) {\n      var inviteUsername = MessageDetails[0];\n      var invitingUser = MessageDetails[1];\n      var lobbyID = MessageDetails[2]; // Only show this to the user who is being invited\n\n      if (this.UsersID === inviteUsername) {\n        var inviteAccepted = confirm(\"You have been invited to Lobby \" + lobbyID + \" by user \" + invitingUser + \".\\n Do you wish to accept?\");\n\n        if (inviteAccepted) {\n          this.enterLobby(lobbyID);\n          this.isLobbyCreator = false;\n        }\n      }\n    },\n\n    // A general event fired whenever a change is made to the users within a lobby. \n    updateUsers(lobbyDetails) {\n      var listOfUsers = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n\n      if (this.playersLobby === lobbyID) {\n        this.UsersInLobby = listOfUsers;\n        this.noOfUsersInLobby = this.UsersInLobby.length;\n      }\n    }\n\n  },\n  // Props that have to be passed from App.vue\n  props: {\n    UsersID: {\n      type: String,\n      required: true\n    },\n    userProfile: {\n      type: Object,\n      required: true\n    },\n    gamesPlayed: {\n      type: Number,\n      required: true\n    },\n    gamesWon: {\n      type: Number,\n      required: true\n    },\n    UserGoogleID: {\n      type: String,\n      required: true\n    },\n    userSoloContinue: {\n      type: Boolean,\n      required: true\n    },\n    userMultiContinue: {\n      type: Boolean,\n      required: true\n    },\n    multiGameDetails: {\n      type: Object,\n      required: false\n    }\n  },\n\n  data() {\n    return {\n      // Instantiating the data that is required to be initialised within this component for passing to child components. \n      noOfUsersInLobby: 0,\n      isLobbyCreator: false,\n      playersLobby: '',\n      UsersInLobby: [],\n      allPlayersReady: false,\n      passiveModeHosts: [],\n      passiveModeCountries: [],\n      passiveModeTotalTrackers: 0,\n      passiveModeTotalCounties: 0,\n      passiveModeUniqueHosts: 0,\n      passiveCategoryList: [],\n      achievements: [],\n      totalRequests: 0,\n      multiClassicLeaderboard: [],\n      soloClassicLeaderboard: [],\n      personalSoloHS: [],\n      JoinLobbyPage: false,\n      HomePage: true,\n      OptionsPage: false,\n      PassivePage: false,\n      key: 0\n    };\n  },\n\n  methods: {\n    // Establishing the methods of this class\n    // View Controller for SoloMode\n    solomode() {\n      this.getHighScores();\n      this.HomePage = false;\n      this.SoloPage = true;\n    },\n\n    // Logic for creating a lobby by generating an ID and then communicating this to the server.\n    createLobby() {\n      var newLobbyID = this.createNewLobbyID();\n      this.LobbyPage = true;\n      this.HomePage = false;\n      this.isLobbyCreator = true;\n      this.playersLobby = newLobbyID;\n      this.UsersInLobby[0] = this.userProfile;\n      this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);\n    },\n\n    // View controller for passive mode. This, also, retrieves the required data structures from Chrome local storage for presentation to the user. \n    passiveMode() {\n      var vm = this; // The following logic gets and instantiates the passiveHosts, totalRequests, passiveCategoryList, passiveCountryList and achievements from local Chrome storage.\n\n      chrome.storage.local.get([\"passiveHosts\"], function (result) {\n        vm.passiveModeHosts = result.passiveHosts;\n        var totalHosts = 0;\n        this.key++;\n\n        for (var i = 0; i < result.passiveHosts.length; i++) {\n          totalHosts += result.passiveHosts[i].count;\n        }\n\n        vm.passiveModeTotalTrackers = totalHosts;\n        vm.passiveModeUniqueHosts = result.passiveHosts.length;\n        this.key++;\n        chrome.storage.local.get([\"totalRequests\"], function (result) {\n          vm.totalRequests = result.totalRequests;\n          this.key++;\n        });\n        chrome.storage.local.get([\"passiveCategoryList\"], function (result) {\n          vm.passiveCategoryList = result.passiveCategoryList;\n          console.log(vm.PassiveCategoryList);\n        });\n        chrome.storage.local.get([\"passiveCountryList\"], function (result) {\n          vm.passiveModeCountries = result.passiveCountryList;\n          vm.passiveModeTotalCounties = result.passiveCountryList.length;\n          this.key++;\n          chrome.storage.local.get([\"achievements\"], function (result) {\n            vm.achievements = result.achievements;\n            console.log(result);\n            this.key++;\n          });\n        });\n      });\n      this.HomePage = false;\n      this.PassivePage = true;\n    },\n\n    // View controller for the Join Lobby page\n    joinlobby() {\n      this.JoinLobbyPage = true;\n      this.HomePage = false;\n    },\n\n    // View controller for the Options page\n    options() {\n      this.OptionsPage = true;\n      this.HomePage = false;\n    },\n\n    // A method for updating the users within the lobby\n    updateLobbyUsers(newUsers) {\n      console.log(newUsers);\n      this.UsersInLobby = newUsers;\n    },\n\n    // View controller for the LeaderBoard page\n    leaderboards() {\n      this.getHighScores();\n      this.LeaderBoardPage = true;\n      this.HomePage = false;\n    },\n\n    // Helper method that allows us to generate a random ID for the lobby ID. \n    createNewLobbyID() {\n      // Adapted from a StackOverFlow answer at: csharptest.net, \"Generate random string/characters in JavaScript\", StackOverflow.com, Available at: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript, Accessed 15/06/2022\n      var id = '';\n      var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n\n      for (var i = 0; i < 7; i++) {\n        id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));\n      }\n\n      return id;\n    },\n\n    // Method for entering a lobby, sending an event to the server.\n    enterLobby(lobbyID) {\n      this.playersLobby = lobbyID;\n      this.$socket.emit('JoinLobby', lobbyID, this.userProfile);\n    },\n\n    // Retrieves the leaderboards from the database via the server via Socket.IO emissions.\n    getHighScores() {\n      this.$socket.emit('retrieveLeaderBoards');\n      this.$socket.emit('retreiveSoloScores', this.UsersID);\n    },\n\n    // Generic method for returning to the Home Page, used by multiple child components. \n    exitToHomePage() {\n      this.HomePage = true;\n      this.PassivePage = false;\n      this.LeaderBoard = false;\n      this.OptionsPage = false;\n      this.LobbyPage = false;\n      this.LeaderBoardPage = false;\n      this.JoinLobbyPage = false;\n      this.SoloPage = false;\n      this.$emit('Homepage');\n    },\n\n    // Generic method for returning to the Home Page that also resets the relevant user data. \n    exitToHomePageReset() {\n      this.exitToHomePage();\n      this.HomePage = true;\n      this.$emit('Homepage');\n    },\n\n    // Allows the user to logout.\n    logout() {\n      this.HomePage = false;\n      this.OptionsPage = false;\n      this.$emit('logout');\n    },\n\n    // Below methods are for after a user rejoins a game. This clears tha variable responsible for taking the user straight to the game pages, preventing the user from becoming stuck in a loop. \n    resetSoloStatus() {\n      this.$emit('resetSoloStatus');\n    },\n\n    // Method to reset the variable that indicates we are rejoining a multiplayer game\n    ClearMultiVariable() {\n      this.$emit('ClearMultiVariable');\n    },\n\n    // Method for changing username, delegated to App.vue as this controls the UsersID attribute. \n    changeUsername($event) {\n      this.$emit('changeUsername', $event);\n    }\n\n  },\n\n  // Logic occurs before each time the page is re-rendered. This ensures that the user is taken to the correct game page if required, rather than the home page. \n  beforeUpdate() {\n    if (this.userSoloContinue) {\n      this.HomePage = false;\n      this.SoloPage = true;\n    }\n\n    if (this.userMultiContinue) {\n      this.UsersInLobby = this.multiGameDetails.LobbyUsers;\n      this.playersLobby = this.multiGameDetails.playersLobby;\n      this.noOfUsersInLobby = this.UsersInLobby.length;\n      this.HomePage = false;\n      this.LobbyPage = true;\n    }\n  }\n\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HomePageView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    passiveModeHosts: {\n      type: Array,\n      required: true\n    }\n  },\n  methods: {\n    // Only real methods for this component are view controllers. \n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n    },\n\n    HostToPassive() {\n      this.$emit('HostToPassive');\n    }\n\n  },\n  computed: {\n    // Using the lodash package to order the hosts by number\n    orderedHosts() {\n      return lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(this.passiveModeHosts, 'count', 'desc');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HostsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"IntroPage\",\n  methods: {\n    // GoogleLogin is the key method in the file. This is responsible for communicating with the background scripts in order to get the users details and sign them in. \n    googleLogin() {\n      var vm = this;\n      this.getHighScores();\n      chrome.runtime.sendMessage({\n        message: 'login'\n      }, function (response) {\n        if (response === 'success') {\n          chrome.runtime.sendMessage({\n            message: 'googleID'\n          }, function (response) {\n            if (response === '' || response === undefined) {\n              console.log(\"No google ID found\");\n            } else {\n              var googleID = response;\n              googleID = googleID.substring(0, 255);\n              vm.$socket.emit('doesUserExist', googleID);\n              vm.$emit('userLogin', googleID);\n            }\n          });\n        }\n      });\n    },\n\n    // This is used for testing purposes, and simply logs the user in with the author's google ID without logging in. \n    DevLogin() {\n      this.$socket.emit('doesUserExist', \"108040570320593718088\");\n      this.$emit('userLogin', \"108040570320593718088\");\n    },\n\n    // Ensures that we retrieve the leaderboards early, so that there is minimal lag when rendering this. \n    getHighScores() {\n      this.$socket.emit('retrieveLeaderBoards');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  methods: {\n    // Only methods for this delegate their work to the HomePage.vue component, where the logic for entering a lobby is contained. \n    enterLobby() {\n      if (this.$refs.LobbyID === null) {\n        return;\n      } else {\n        var lobbyID = this.$refs.LobbyID.value;\n        this.$emit('enterLobby', lobbyID);\n      }\n    },\n\n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // When the component is first created, we take the props and assign these to new variables, so that there is a board displayed to the user upon opening. By default, this is the solo leaderboard. \n  created() {\n    this.intSoloClassLB = this.soloClassicLeaderboard;\n  },\n\n  data() {\n    return {\n      intSoloClassLB: [],\n      intMultiClassLB: [],\n      MultiClassicLB: false,\n      SoloClassicLB: true\n    };\n  },\n\n  // Props to be passed by the HomePage.vue component. \n  props: {\n    personalSoloHS: {\n      type: Array,\n      required: true\n    },\n    soloClassicLeaderboard: {\n      type: Array,\n      required: true\n    },\n    multiClassicLeaderboard: {\n      type: Array,\n      required: true\n    },\n    gamesWon: {\n      type: Number,\n      required: true\n    },\n    gamesPlayed: {\n      type: Number,\n      required: true\n    }\n  },\n  methods: {\n    // Manipulates the leaderboard to show two minute scores. \n    twoMinLB() {\n      this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 120);\n      this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 120);\n    },\n\n    // Manipulates the leaderboard to show five minute scores. \n    fiveMinLB() {\n      this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 300);\n      this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 300);\n    },\n\n    // Manipulates the leaderboard to show ten minute scores. \n    tenMinLB() {\n      this.intSoloClassLB = this.soloClassicLeaderboard.filter(item => item.startTime === 600);\n      this.intMultiClassLB = this.multiClassicLeaderboard.filter(item => item.startTime === 600);\n    },\n\n    // View controllers, to switch between displaying leaderboards for solo games and for multiplayer games. \n    displaySoloClass() {\n      this.MultiClassicLB = false;\n      this.SoloClassicLB = true;\n    },\n\n    displayMulClass() {\n      this.MultiClassicLB = true;\n      this.SoloClassicLB = false;\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_MultiPlayerGame_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/MultiPlayerGame.vue */ \"./src/components/MultiPlayerGame.vue\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // In created(), we assign the UsersInLobby prop to the LobbyUsers variable, to allow us to manipulate the data in this variable without mutating the prop directly, which is disallowed by Vue.   \n  created() {\n    this.LobbyUsers = this.UsersInLobby;\n  },\n\n  sockets: {\n    // This allows the lobby users to receive the configuration for the game from the lobby creator. \n    updateGameModeAndTime(messageDetails) {\n      var lobbyID = messageDetails[0];\n\n      if (lobbyID === this.playersLobby) {\n        this.GameMode = messageDetails[1];\n        this.timer = messageDetails[2];\n        this.startTime = messageDetails[2];\n      }\n\n      this.gameOver = false;\n    },\n\n    // Same as the above, except this allows the users to all see the countries to visit. \n    receiveCountriesToVisit(lobbyAndCountries) {\n      var lobby = lobbyAndCountries[0];\n\n      if (this.playersLobby === lobby && !this.isLobbyCreator) {\n        this.countriesToFind = lobbyAndCountries[1];\n      }\n    },\n\n    // This is a partial implementation of the RejoinGame logic. This is because the gamemode is decided in the lobby, and other data is required for the MultiPlayerGame.vue component. \n    RejoinGame(MessageDetails) {\n      this.GameMode = MessageDetails[0];\n    },\n\n    // Generic event that is fired each time a change in the lobby users occurs. \n    updateUsers(lobbyDetails) {\n      var listOfUsers = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n\n      if (this.playersLobby === lobbyID) {\n        this.LobbyUsers = listOfUsers;\n      }\n    },\n\n    // If player is kicked, this redirects them to the Homepage.\n    redirectPlayer(userID) {\n      if (this.UsersID === userID) {\n        this.exitToHomePageReset();\n      }\n    }\n\n  },\n  // Data that is required from the HomePageView.vue component. \n  props: {\n    playersLobby: {\n      type: String,\n      required: true\n    },\n    UsersInLobby: {\n      type: Array,\n      required: true\n    },\n    isLobbyCreator: {\n      type: Boolean,\n      required: true\n    },\n    UsersID: {\n      type: String,\n      required: true\n    },\n    userProfile: {\n      type: Object,\n      required: true\n    },\n    userMultiContinue: {\n      type: Boolean,\n      required: true\n    },\n    multiGameDetails: {\n      type: Object,\n      required: false\n    }\n  },\n  components: {\n    MultiPlayerGame: _components_MultiPlayerGame_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  methods: {\n    // These two methods change the gamemode and timer depending on what radio button has been clicked. \n    onGameModeChange() {\n      var gameModeSelected = event.target.value;\n      this.GameMode = gameModeSelected;\n    },\n\n    onTimeChange() {\n      var timeSelected = event.target.value;\n      this.timer = timeSelected;\n    },\n\n    // This method allows the lobby to be closed by the lobby leader. \n    closeLobby() {\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.$emit('exitToHomePageReset');\n    },\n\n    // Logic for leaving a lobby. Deletes the required player from the LobbyUsers array, and then emits this updated array to the server to go to the other users. \n    leaveGame() {\n      var LobbyUsers = this.UsersInLobby;\n\n      for (var i = 0; i < LobbyUsers.length; i++) {\n        if (LobbyUsers[i].userID === this.UsersID) {\n          LobbyUsers.splice(i, i + 1);\n        }\n      }\n\n      this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID);\n      this.LobbyPage = false;\n      this.MultiPlayer = false;\n      this.$emit('exitToHomePageReset');\n    },\n\n    // View controller for exiting to the HomePage\n    exitToHomePageReset() {\n      this.MultiPlayer = false;\n      this.LobbyPage = false;\n      this.$emit('exitToHomePageReset');\n    },\n\n    // Manipulates the DOM to show the invite player buttons. \n    openInvite() {\n      if (this.playerInvite === false) {\n        this.playerInvite = true;\n      } else {\n        this.playerInvite = false;\n      }\n    },\n\n    // Method for inviting a player. Sends an event to the server with the username of the person to be invited. \n    invitePlayer() {\n      var inviteUsername = this.$refs.usernameInvite.value;\n      this.$socket.emit('playerInvited', inviteUsername, this.UsersID, this.playersLobby);\n    },\n\n    // Method for kicking players. Removes the player from the array, then updates this for the lobby creator and other users in the lobby. \n    kickPlayer(userID) {\n      var newLobbyUsers = this.UsersInLobby.slice();\n\n      for (var i = 0; i < this.UsersInLobby.length; i++) {\n        if (this.UsersInLobby[i].userID === userID) {\n          newLobbyUsers.splice(i, 1);\n        }\n      }\n\n      this.$socket.emit('playerLeft', newLobbyUsers, this.playersLobby, userID);\n      this.$socket.emit('redirectPlayer', userID);\n      this.$emit('updateLobbyUsers', newLobbyUsers);\n    },\n\n    // Method initiates a multiplayer game, then sends the game details to other lobby users. \n    multiGameInitiated() {\n      this.LobbyPage = false;\n      this.MultiPlayer = true;\n\n      if (this.isLobbyCreator) {\n        this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer);\n      }\n    },\n\n    // Method for clearing the variable responsible for redirecting the user to the gamepage upon rejoining. Ensures the user does not end up stuck in a loop. \n    ClearMultiVariable() {\n      this.$emit('ClearMultiVariable');\n      console.log(\"Lobby\");\n    },\n\n    // Displays the game information for the user, or hides this if it is already displaying.\n    displayInformation() {\n      this.InformationBox = !this.InformationBox;\n    }\n\n  },\n\n  data() {\n    return {\n      // Instantiation of variables required for the LobbyView component and any children.\n      playerInvite: false,\n      show: false,\n      MultiPlayer: false,\n      LobbyPage: true,\n      LobbyUsers: [],\n      GameMode: 'Classic',\n      timer: 120,\n      gameOver: false,\n      startTime: 0,\n      InformationBox: false,\n      ClassicInfo: \"In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \\n Common Countries (x1 Multiplyer): United States, United Kingdom \\n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \\n Rare Countries (x3 Multiplyer): Asian Nations \\n Very Rare Countries (x4 Multiplyer): African Nations \\n All other countries (x5 Multiplyer)\",\n      BingoInfo: \"In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game\"\n    };\n  },\n\n  // Logic that checks if the variable that indicates if a player is still in a multiplayer game is active. If so, skip the lobby page and continue to the Game page, and get the game details. \n  mounted() {\n    if (this.userMultiContinue) {\n      this.LobbyPage = false;\n      this.MultiPlayer = true;\n      this.$socket.emit('getGameDetails', this.multiGameDetails.playersLobby, this.UsersID);\n      console.log(\"Test 2\");\n    }\n  }\n\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_BaseTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/BaseTimer */ \"./src/components/BaseTimer.vue\");\n/* harmony import */ var _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassiveModeChart.vue */ \"./src/components/PassiveModeChart.vue\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // This logic ensures that, on state change, the timer begins decreasing by 1 point per second. The watch function fires whenever the timer variable has a state change. \n  // Adapted from a StackOverflow answer: B Carey, \"How do I create a sinmple 10 seconds countdown in Vue.JS\", StackOverflow.com, Available at: https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js, Accessed 12/06/2022\n  watch: {\n    timer: {\n      handler(value) {\n        if (value > 0 && this.gameStarted) {\n          setTimeout(() => {\n            this.timer--;\n            this.timePased++;\n          }, 1000);\n        } else if (value <= 10 && value > 1) {\n          this.timerClose = true;\n        } else if (value === 0) {\n          // End the game whenever we reach 0 seconds left.\n          this.endGame();\n\n          if (this.GameMode === 'Bingo') {\n            this.endBingoGame();\n          }\n        }\n      },\n\n      immediate: true\n    }\n  },\n\n  // Before any re-renders of this component, the below method will fire. This ensures that the chart data is updated so that the chart for countries and countries is responsive and shows the update whenever a country is located. \n  beforeUpdate() {\n    for (var i = 0; i < this.categoryList.length; i++) {\n      this.categoryLabels[i] = this.categoryList[i].name;\n      this.categoryCounts[i] = this.categoryList[i].count;\n    }\n\n    this.chartData.labels = this.categoryLabels;\n    this.chartData.datasets[0].data = this.categoryCounts;\n\n    for (var j = 0; j < this.VisitedCountries.length; j++) {\n      this.countryLabels[j] = this.VisitedCountries[j].name;\n      this.countryCounts[j] = this.VisitedCountries[j].count;\n    }\n\n    this.countryChartData.labels = this.countryLabels;\n    this.countryChartData.datasets[0].data = this.countryCounts;\n\n    if (!this.gameStarted) {\n      this.timer = this.startTime;\n    }\n  },\n\n  // Whenever this component is initially rendered, we assign the UserInLobby and userProfile props to new variables so that they can be mutated. \n  mounted() {\n    this.LobbyUsers = this.UsersInLobby;\n    this.ProfileOfUser = this.userProfile; // If we're continuing a rejoined game, get these game details from the other lobby users. \n\n    if (this.userMultiContinue) {\n      this.$socket.emit('getGameDetails', this.multiGameDetails.playersLobby, this.UsersID);\n    }\n\n    this.timer = this.startTime;\n    this.$emit(\"ClearMultiVariable\");\n  },\n\n  sockets: {\n    // Event fires whenever a user indicates to the server that they are ready. \n    player_is_ready(lobbyDetails) {\n      var allReady = true;\n      var user = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n\n      if (lobbyID === this.playersLobby) {\n        for (var i = 0; i < this.LobbyUsers.length; i++) {\n          if (this.LobbyUsers[i].userID === user.userID) {\n            this.LobbyUsers[i].ready = \"Ready\";\n          }\n\n          if (this.LobbyUsers[i].ready != \"Ready\") {\n            allReady = false; // If any users aren't ready, continue waiting. \n          }\n        }\n      }\n\n      if (allReady) {\n        this.allPlayersReady = true;\n      }\n    },\n\n    // Fired by the Lobby Creator whenever the game is to be began. Ensures the game is initiated synchronously between users.\n    startGame(lobbyID) {\n      if (lobbyID === this.playersLobby) {\n        this.initiateGame();\n      }\n    },\n\n    // This is fired whenever a user leaves, and is designed to display a message to other users informing them that this player is left. \n    player_leave_message(messageDetails) {\n      this.playerLeaveMessage = \"User: \" + messageDetails + \" has disconnected from the lobby.\";\n\n      if (this.UsersInLobby.length === 1) {\n        this.playerLeaveMessage += \"You are the only player in this multiplayer game.\";\n      }\n\n      if (messageDetails === this.UsersID) {\n        this.SoloGame = false;\n        this.HomePage = true;\n        this.LobbyPage = false;\n      }\n    },\n\n    // Generic method for updating the users whenever a state change occurs for any user. Ensures that all users see an accurate game state at all times. \n    updateUsers(lobbyDetails) {\n      var listOfUsers = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n\n      if (this.playersLobby === lobbyID) {\n        this.LobbyUsers = listOfUsers;\n      }\n    },\n\n    // Logic for receiving the array of countries to visit within a bingo mode. Received from the server, which receives this from the lobby creator. \n    receiveCountriesToVisit(lobbyAndCountries) {\n      var lobby = lobbyAndCountries[0];\n\n      if (this.playersLobby === lobby && !this.isLobbyCreator) {\n        this.countriesToFind = lobbyAndCountries[1];\n      }\n    },\n\n    // This event is fired whenever a player is rejoining and the server requests the game details from another lobby user. This sends the required information back to the server. \n    sendGameDetails(MessageDetails) {\n      if (this.playersLobby === MessageDetails[0] && this.UsersID != MessageDetails[1]) {\n        this.$socket.emit('sendingGameDetails', this.GameMode, this.timer, this.UsersInLobby, this.playersLobby, this.UsersID, this.allPlayersReady, this.countriesToFind);\n      }\n    },\n\n    // This is the primary logic for rejoining a game. This renders the game page according to the state of the game, then re-initiates the listener. \n    RejoinGame(MessageDetails) {\n      if (this.UsersID != MessageDetails[3]) {\n        this.timer = MessageDetails[1];\n        this.LobbyUsers = MessageDetails[2];\n        this.countriesToFind = MessageDetails[6];\n        this.allPlayersReady = MessageDetails[5];\n        var vm = this;\n\n        if (this.GameMode === \"Classic\") {\n          chrome.storage.local.get([\"backupCountryList\"], function (result) {\n            vm.VisitedCountries = result.backupCountryList;\n          });\n\n          for (var i = 0; i < vm.UsersInLobby; i++) {\n            if (vm.UsersInLobby[i].userID === vm.UsersID) {\n              vm.userScore = vm.UsersInLobby[i].score;\n            }\n          }\n        }\n\n        this.VisitedCountries = vm.VisitedCountries;\n        this.userScore = vm.userScore;\n        this.allPlayersReady = true;\n\n        for (var j = 0; j < this.UsersInLobby; j++) {\n          if (this.UsersInlobby[j].ready != true) {\n            this.allPlayersReady = false;\n          }\n        }\n\n        this.initiateListener();\n        this.gameStarted = true;\n        this.HomePage = false;\n        this.MultiPlayer = true; // This clears the variable used to indicate to the program that we are rejoining a multiplayer game\n\n        this.$emit(\"ClearMultiVariable\");\n      }\n    },\n\n    // Method for resending Bingo countries to visit for a rejoining user.\n    resendBingo(MessageDetails) {\n      if (this.playersLobby === MessageDetails[0]) {\n        if (this.UsersID != MessageDetails[1]) {\n          this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind);\n        }\n      }\n    },\n\n    // Additional logic for ending a bingo mode game. Works out who is the winner and the status of the current user. I.e., finished or unfinished. \n    endBingoModeGame(lobbyAndUser) {\n      var lobby = lobbyAndUser[0];\n      var counter = 0;\n\n      for (var i = 0; i < this.countriesToFind.length; i++) {\n        if (this.countriesToFind[i].found === true) {\n          counter++;\n        }\n      }\n\n      this.noOfCountriesBingo = counter;\n\n      if (this.playersLobby === lobby && this.UsersID != lobbyAndUser[1]) {\n        this.WinningUser = lobbyAndUser[1];\n        this.gameOver = true;\n        this.didYouWin = false;\n      }\n    }\n\n  },\n  components: {\n    BaseTimer: _components_BaseTimer__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    PassiveModeChart: _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n\n  data() {\n    return {\n      // Variables for Information Boxes\n      ClassicInfo: \"In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \\n Common Countries (x1 Multiplyer): United States, United Kingdom \\n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \\n Rare Countries (x3 Multiplyer): Asian Nations \\n Very Rare Countries (x4 Multiplyer): African Nations \\n All other countries (x5 Multiplyer)\",\n      BingoInfo: \"In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game\",\n      InformationBox: false,\n      // These variables concern gameplay\n      gameOver: false,\n      userScore: 0,\n      VisitedCountries: [],\n      numberOfCookies: 0,\n      countriesToFind: [],\n      finishedGame: false,\n      APIEnabled: true,\n      categoryList: [],\n      gameStarted: false,\n      achievements: [],\n      timer: 110,\n      noOfCountries: 0,\n      WinningUser: undefined,\n      didYouWin: false,\n      noOfCountriesBingo: 0,\n      // Variables Concern Lobby Logistics\n      allPlayersReady: false,\n      LobbyUsers: [],\n      ProfileOfUser: undefined,\n      // These are the variables from which Bingo Mode countries were chosen in development. The choice has been made to maintain these as the countries, as these are more realistic to find than 3 random countries from below. \n      easyCountries: [\"United States\", \"United Kingdom\", \"Canada\"],\n      medEasyCountries: [\"Ireland\", \"Germany\", \"Netherlands\", \"Belgium\", \"Spain\", \"Belarus\", \"France\", \"Czechia\", \"Poland\", \"Austria\"],\n      hardCountries: [\"China\", \"Russia\", \"Bulgaria\", \"Japan\", \"Mexico\", \"South Korea\", \"Singapore\"],\n      // These arrays are used in classic mode to determine the points multiplyer for a certain country\n      CountriesInAsia: [\"Japan\", \"Indonesia\", \"India\", \"China\", \"Thailand\", \"South Korea\", \"Philippines\", \"Singapore\", \"Vietnam\", \"Malaysia\", \"Hong Kong\", \"Saudi Arabia\", \"Pakistan\", \"Myanmar\", \"Cambodia\", \"Taiwan\", \"Laos\", \"Iran\", \"Sri Lanka\", \"Israel\", \"Maldives\", \"Afghanistan\", \"Bangladesh\", \"Nepal\", \"Qatar\", \"Mongolia\", \"Brunei\", \"Lebanon\", \"North Korea\", \"Iraq\", \"Uzbekistan\", \"Syria\", \"Macao\", \"Christmas Islands\", \"United Arab Emirates\", \"Jordan\", \"Armenia\", \"Timor-Leste\", \"Kyrgzstan\", \"Yemen\", \"Paliestine\", \"Bhutan\", \"Kuwait\", \"Turkmenistan\", \"Bahrain\", \"Tajikistan\", \"Oman\"],\n      AfricanCountries: [\"Nigeria\", \"Ethiopia\", \"Eygpt\", \"Democratic Republic of the Congo\", \"Tanzania\", \"South Africa\", \"Kenya\", \"Sudan\", \"Algeria\", \"Uganda\", \"Morocco\", \"Angola\", \"Mozambique\", \"Ghana\", \"Cameroon\", \"Madagascar\", \"Ivory Coast\", \"Niger\", \"Burkina Faso\", \"Mali\", \"Malawi\", \"Zambia\", \"Senegal\", \"Chad\", \"Somalia\", \"Zimbabwe\", \"South Sudan\", \"Rwanda\", \"Guinea\", \"Burundi\", \"Benin\", \"Tunisia\", \"Sierra Leone\", \"Togo\", \"Libya\", \"Repbulic of the Congo\", \"Central African Republic\", \"Liberia\", \"Mauritania\", \"Eritrea\", \"Namibia\", \"Gambia\", \"Botswana\", \"Gabon\", \"Lesotho\", \"Guimea-Bissau\", \"Equatorial Guinea\", \"Mauritius\", \"Eswatini\", \"Djibouti\", \"Cape Verde\"],\n      EuropeanCountries: [\"Hungary\", \"Belarus\", \"Austria\", \"Serbia\", \"Switzerland\", \"Germany\", \"Holy See\", \"Andorra\", \"Bulgaria\", \"United Kingdom\", \"France\", \"Montenegro\", \"Luxembourg\", \"Italy\", \"Denmark\", \"Finland\", \"Slovakia\", \"Norway\", \"Ireland\", \"Spain\", \"Malta\", \"Ukraine\", \"Croatia\", \"Moldova\", \"Monaco\", \"Liechtenstein\", \"Poland\", \"Iceland\", \"San Marino\", \"Bosnia and Herzegovina\", \"Albania\", \"Lithuania\", \"North Macedonia\", \"Slovenia\", \"Romania\", \"Latvia\", \"Netherlands\", \"Russia\", \"Estonia\", \"Belgium\", \"Czechia\", \"Portugal\", \"Greece\", \"Sweden\"],\n      NorthAmerica: [\"United States\", \"USA\", \"United States of America\", \"Canada\", \"Mexico\"],\n      Oceania: [\"Australia\", \"New Zealand\"],\n      onePointCountries: [\"United Kingdom\", \"United States\"],\n      // Variables (data, labels and options) for the two charts:\n      options: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 90\n      },\n      chartData: {\n        labels: this.categoryLabels,\n        datasets: [{\n          label: \"Categories\",\n          backgroundColor: ['#9F2B68', '#800020', '#301934', '#CBC3E3', '#AA98A9', '#673147'],\n          data: this.categoryCounts\n        }]\n      },\n      countryOptions: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 40\n      },\n      countryChartData: {\n        labels: this.countryLabels,\n        datasets: [{\n          label: \"Countries\",\n          backgroundColor: ['#228B22', '#808000', '#023020', '#4F7942', '#8A9A5B', '#B4C424', '#C9CC3F'],\n          data: this.countryCounts\n        }]\n      },\n      // These variables are used to split up the chart data into two different arrays for the labels and the counts. This is because the Chart.js package requires these separately. \n      categoryLabels: [],\n      categoryCounts: [],\n      countryLabels: [],\n      countryCounts: []\n    };\n  },\n\n  // Data to be passed from the LobbyView.vue component\n  props: {\n    GameMode: {\n      type: String,\n      required: true\n    },\n    startTime: {\n      type: Number,\n      required: true\n    },\n    UsersInLobby: {\n      type: Array,\n      required: true\n    },\n    isLobbyCreator: {\n      type: Boolean,\n      required: true\n    },\n    userProfile: {\n      type: Object,\n      required: true\n    },\n    playersLobby: {\n      type: String,\n      required: true\n    },\n    UsersID: {\n      type: String,\n      required: true\n    },\n    multiGameDetails: {\n      type: Object,\n      required: false\n    },\n    userMultiContinue: {\n      type: Boolean,\n      required: false\n    }\n  },\n  methods: {\n    // Information box method. Just displays the information on the gamemode to the user. \n    displayInformation() {\n      if (this.InformationBox === true) {\n        this.InformationBox = false;\n      } else {\n        this.InformationBox = true;\n      }\n    },\n\n    // This logic occurs whenever the lobby creator hits \"Start\". Will only fire if all the players are readied up.\n    gameSetup() {\n      if (this.allPlayersReady) {\n        console.log(\"Emitting start game\");\n        this.$socket.emit('startTheGame', this.playersLobby);\n        this.userInAMultiGame = true;\n        this.initiateGame();\n      } else {\n        console.log(\"Error, not all players ready\");\n      }\n    },\n\n    // This is the logic for ending a game. \n    endGame() {\n      var winningScore = 0;\n\n      for (var i = 0; i < this.LobbyUsers.length; i++) {\n        if (this.LobbyUsers[i].score >= winningScore) {\n          winningScore = this.LobbyUsers[i].score;\n          var winningUser = this.LobbyUsers[i].userID;\n        }\n      }\n\n      if (winningScore === this.countriesToFind.length) {\n        this.WinningUser = winningUser;\n      }\n\n      var timePassed = this.startTime - this.timer;\n      this.finishedGame = true;\n\n      if (this.GameMode === \"Classic\") {\n        this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, this.userScore, this.MultiPlayer === true, this.startTime);\n      } else if (this.GameMode === \"Bingo\") {\n        for (var j = 0; j < this.countriesToFind.length; j++) {\n          if (this.countriesToFind[j].found != true) {\n            this.finishedGame = false;\n          }\n        }\n\n        if (this.finishedGame) {\n          this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, timePassed, this.MultiPlayer === true, this.startTime);\n\n          if (this.WinningUser === this.UsersID) {\n            this.didYouWin = true; // This is here to make sure this is only fired once per game, by the winner\n\n            this.$socket.emit('gameWon', this.UserGoogleID);\n          }\n        }\n      } // Close the Lobby\n\n\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.gameOver = true;\n\n      if (this.GameMode === 'Bingo') {\n        this.endBingoGame();\n      }\n\n      this.$socket.emit('endPreviousGames', this.userProfile.userID, this.userProfile.googleID);\n    },\n\n    // Additional logic for ending a bingo mode game. \n    endBingoGame() {\n      this.$socket.emit('endBingoGame', this.playersLobby, this.UsersID);\n      this.$socket.emit('closeLobby', this.playersLobby);\n      var didUserWin = true;\n\n      for (var i = 0; i < this.countriesToFind.length; i++) {\n        if (this.countriesToFind[i].found === false) {\n          didUserWin = false;\n        }\n      }\n\n      if (didUserWin) {\n        this.WinningUser = this.UsersID;\n        this.didYouWin = true;\n        this.noOfCountriesBingo = this.countriesToFind.length;\n      }\n\n      this.gameOver = true;\n    },\n\n    // Resets variables and exits user to homepage. \n    exitToHomePageReset() {\n      this.gameOver = false;\n      this.VisitedCountries = [];\n      this.gameSetup = false;\n      this.WinningUser = undefined;\n      this.didYouWin = false;\n      this.$emit('exitToHomePageReset');\n    },\n\n    // Logic informs other users that this user is ready. \n    playerReady() {\n      this.ProfileOfUser.ready = \"Ready\";\n\n      for (var i = 0; i < this.LobbyUsers.length; i++) {\n        if (this.LobbyUsers[i].userID === this.ProfileOfUser.userID) {\n          this.LobbyUsers[i].ready = \"Ready\";\n        }\n      }\n\n      this.$socket.emit('playerReady', this.ProfileOfUser, this.playersLobby);\n    },\n\n    // Logic for leaving a game, also fires an event to the server to ensure that other players see that we have left. \n    leaveGame() {\n      for (var i = 0; i < this.LobbyUsers.length; i++) {\n        if (this.LobbyUsers[i].userID === this.UsersID) {\n          this.LobbyUsers.splice(i, i + 1);\n        }\n      }\n\n      this.$socket.emit('playerLeft', this.LobbyUsers, this.playersLobby, this.UsersID);\n      this.ProfileOfUser.ready = \"Not Ready\";\n      this.gameOver = false;\n      this.VisitedCountries = [];\n      this.gameSetup = false;\n      this.WinningUser = undefined;\n      this.didYouWin = false;\n      this.exitToHomePageReset();\n    },\n\n    // This fires whenever a game is begun. This starts the actual gameplay. \n    initiateGame() {\n      var vm = this;\n      this.gameStarted = true;\n      this.timer = this.startTime;\n\n      if (this.timer <= 0) {\n        this.timer = 120;\n      }\n\n      this.numberOfCookies = 0; // This changes the value of the timer, so that the watch logic is initiated.\n\n      this.timer = this.timer * 1;\n      this.timer -= 1;\n      this.timer += 1; // Send a message to the extensions requesting that they reset the gameplay variables to empty, so that we start from a fresh state.\n\n      chrome.runtime.sendMessage({\n        message: 'reset'\n      }, function (response) {\n        if (response === 'success') {\n          vm.VisitedCountries = [];\n          vm.userScore = 0;\n          vm.numberOfCookies = 0;\n        }\n\n        return true;\n      }); // If we're in bingo mode, we create a new list of countries to visit from the three initiated arrays in data(), and then emit this as an event to other users in the lobby.\n\n      if (this.GameMode === \"Bingo\") {\n        this.countriesToFind = [];\n        this.countriesToFind.push({\n          country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)],\n          found: false\n        });\n        this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind);\n      }\n\n      this.initiateListener();\n    },\n\n    // Helper method adapted from: ‘Math.random() - JavaScript | MDN’. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random (accessed Aug 01, 2022).\n    generateRandomIntHelper(max) {\n      return Math.floor(Math.random() * max);\n    },\n\n    // This initiates the event listener, so that we detect if any countries are found by the extension scripts and incorporate this into the gameplay. Each change to the countries discoeverd will cause us to update the score and UI for the user.\n    initiateListener() {\n      var vm = this;\n      chrome.storage.onChanged.addListener(function (result) {\n        if (!vm.gameOver) {\n          vm.updateListOfCountries();\n          vm.updateAchievements();\n          vm.updateCategories();\n\n          if (vm.GameMode === \"Classic\") {\n            vm.updateScoreClassic();\n          } else if (vm.GameMode === \"Bingo\") {\n            vm.updateScoreBingo();\n          }\n\n          vm.VisitedCountries = result.countryList.newValue;\n          vm.gameStarted = true;\n        }\n      });\n    },\n\n    // Called by the event listener - Updates the list of countries, number of cookies, and achievements for the user upon any change in Chrome storage. \n    updateListOfCountries() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        vm.VisitedCountries = result.countryList;\n        chrome.storage.local.get([\"numberOfCookies\"], function (result) {\n          vm.numberOfCookies = result;\n        });\n        chrome.storage.local.get([\"achievements\"], function (result) {\n          vm.achievements = result.achievements;\n        });\n      });\n      chrome.storage.local.set({\n        backupCountryList: vm.VisitedCountries\n      });\n    },\n\n    // Called by the event listener - Updates the player's achievments. \n    updateAchievements() {\n      var vm = this;\n      chrome.storage.local.get([\"achievements\"], function (result) {\n        vm.achievements = result.achievements;\n      });\n    },\n\n    // Called by the event listener - Updates the player's categories.\n    updateCategories() {\n      var vm = this;\n      chrome.storage.local.get([\"categoryList\"], function (result) {\n        vm.categoryList = result.categoryList;\n      });\n    },\n\n    // Logic for calculating and updating the user's score for classic mode, and then sending this to the server. \n    updateScoreClassic() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        let score = 0;\n\n        for (var i = 0; i < result.countryList.length; i++) {\n          if (vm.onePointCountries.includes(result.countryList[i].name)) {\n            score += result.countryList[i].count;\n          } else if (vm.EuropeanCountries.includes(result.countryList[i].name) || vm.NorthAmerica.includes(result.countryList[i].name)) {\n            score += result.countryList[i].count * 2;\n          } else if (vm.CountriesInAsia.includes(result.countryList[i])) {\n            score += result.countryList[i].count * 3;\n          } else if (vm.AfricanCountries.includes(result.countryList[i])) {\n            score += result.countryList[i].count * 4;\n          } else {\n            score += result.countryList[i].count;\n          }\n        }\n\n        vm.userScore = score;\n        vm.ProfileOfUser.score = score;\n        vm.noOfCountries = result.countryList.length;\n\n        for (var j = 0; j < vm.LobbyUsers.length; j++) {\n          if (vm.ProfileOfUser.userID === vm.LobbyUsers[j].userID) {\n            vm.LobbyUsers[j].score = score;\n          }\n        }\n      });\n      this.$socket.emit('scoreUpdate', this.ProfileOfUser, this.playersLobby, this.userScore);\n    },\n\n    // Logic for updating the score on Bingo mode, and then updating this on the server.\n    updateScoreBingo() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        for (var i = 0; i < result.countryList.length; i++) {\n          for (var j = 0; j < vm.countriesToFind.length; j++) {\n            if (result.countryList[i].name === vm.countriesToFind[j].country) {\n              vm.countriesToFind[j].found = true;\n            }\n          }\n        }\n\n        vm.noOfCountries = result.countryList.length;\n      });\n      var allFound = true; // Waiting was included as a means of fixing a bug where the below code is fired before the above. The above is asynchronous, so we need to make sure it executes first.\n\n      setTimeout(() => {\n        console.log('done waiting'), 2000;\n      });\n\n      for (var j = 0; j < this.countriesToFind.length; j++) {\n        if (this.countriesToFind[j].found != true) {\n          allFound = false;\n        } else if (!this.ProfileOfUser.BingoCountries.includes(this.countriesToFind[j]) && this.countriesToFind[j].found === true) {\n          this.ProfileOfUser.BingoCountries.push(this.countriesToFind[j]);\n        }\n      }\n\n      this.noOfCountriesBingo = this.ProfileOfUser.BingoCountries.length;\n      this.$socket.emit('bingoScoreUpdate', this.ProfileOfUser, this.playersLobby);\n\n      if (allFound) {\n        this.endBingoGame();\n        this.didYouWin = true;\n        this.WinningUser = this.ProfileOfUser.userID;\n      }\n    },\n\n    // This logic is for displaying flags, and prevents errors whenever the country name has a space in it.\n    shortenName(countryName) {\n      return countryName.replace(/\\s/g, '');\n    }\n\n  },\n  computed: {\n    // Below code has been adapted from a tutorial: - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    formattedTimeLeft() {\n      const timeTG = this.timer;\n      const minutes = Math.floor(timeTG / 60);\n      var seconds = timeTG % 60;\n\n      if (seconds < 10) {\n        seconds = `0${seconds}`;\n      }\n\n      return `${minutes}:${seconds}`;\n    },\n\n    // Below code has been adapted from a tutorial: - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    timePassed() {\n      return this.startTime - this.timer;\n    },\n\n    // Below code has been adapted from a tutorial: - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    timeLeft() {\n      return this.startTime - (this.startTime - this.timer);\n    },\n\n    orderedCountries() {\n      return lodash__WEBPACK_IMPORTED_MODULE_2___default().orderBy(this.VisitedCountries, 'count', 'desc');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UsernameChange_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsernameChange.vue */ \"./src/components/UsernameChange.vue\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data() {\n    return {\n      // View Controllers\n      UsernamePage: false,\n      Options: true\n    };\n  },\n\n  components: {\n    UsernameChangeVue: _UsernameChange_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  props: {\n    UsersID: {\n      type: String,\n      required: true\n    }\n  },\n  methods: {\n    // View controller to render the UsernameChange.vue component.\n    changeUsernamePage() {\n      this.Options = false;\n      this.UsernamePage = true;\n    },\n\n    // Logic for logging out, delegates the majority of this to the extension scripts and HomePage.vue\n    logout() {\n      var vm = this;\n      chrome.runtime.sendMessage({\n        message: 'logout'\n      }, function (response) {\n        if (response === 'success') {\n          alert(\"You have now successfully logged out\");\n          vm.$emit('logout');\n        }\n      });\n    },\n\n    // This logic communicates to the extension scripts in order to turn request blocking on and off. \n    pauseBlocking() {\n      console.log(\"Test\");\n      chrome.runtime.sendMessage({\n        message: 'pauseBlocking'\n      }, function (response) {\n        if (response === 'unblocked') {\n          alert(\"TrackerHunt will begin blocking connections to web-trackers. Tracking cookies tracked during gameplay will now be first-party cookies.\");\n          console.log(\"unblocked\");\n          return true;\n        } else if (response === 'paused') {\n          alert(\"TrackerHunt web-request blocking has been paused. Tracking cookies identified in gameplay will now be third-party cookies\");\n          console.log(\"paused\");\n          return true;\n        }\n\n        return true;\n      });\n    },\n\n    // Changes username by delegating to the HomepageView.vue component. \n    changeUsername($event) {\n      this.$emit('changeUsername', $event);\n    },\n\n    // Brings the user back to the Options page. \n    backToOptions() {\n      this.UsernamePage = false;\n      this.Options = true;\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassiveModeChart.vue */ \"./src/components/PassiveModeChart.vue\");\n/* harmony import */ var _components_AchievementsView_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/AchievementsView.vue */ \"./src/components/AchievementsView.vue\");\n/* harmony import */ var _components_HostsView_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/HostsView.vue */ \"./src/components/HostsView.vue\");\n/* harmony import */ var _components_CountryView_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/CountryView.vue */ \"./src/components/CountryView.vue\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // These props are retrieved and passed by hte HomePageView.vue component.\n  props: {\n    passiveModeTotalTrackers: {\n      type: Number,\n      required: true\n    },\n    passiveModeUniqueHosts: {\n      type: Number,\n      required: true\n    },\n    passiveModeTotalCounties: {\n      type: Number,\n      required: true\n    },\n    totalRequests: {\n      type: Number,\n      required: true\n    },\n    passiveModeCountries: {\n      type: Array,\n      required: true\n    },\n    passiveCategoryList: {\n      type: Array,\n      required: true\n    }\n  },\n  methods: {\n    // The following methods are view controllers, and are in charge of rendering the child components.\n    PassiveToHost() {\n      this.PassivePage = false;\n      this.HostPage = true;\n    },\n\n    PassiveToCountry() {\n      this.PassivePage = false;\n      this.CountryPage = true;\n    },\n\n    achievementPage() {\n      this.PassivePage = false;\n      this.AchievementPage = true;\n    },\n\n    // This is to reset the page back to the Home Page.\n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n      this.CountryPage = false;\n      this.AchievementPage = false;\n      this.PassivePage = false;\n      this.HostPage = false;\n    },\n\n    CountToPassive() {\n      this.CountryPage = false;\n      this.PassivePage = true;\n    },\n\n    HostToPassive() {\n      this.HostPage = false;\n      this.PassivePage = true;\n    },\n\n    backToPassive() {\n      this.AchievementPage = false;\n      this.PassivePage = true;\n    }\n\n  },\n  components: {\n    PassiveModeChart: _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    AchievementsView: _components_AchievementsView_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    CountryView: _components_CountryView_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    HostsView: _components_HostsView_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n\n  data() {\n    return {\n      totalTrackers: this.passiveModeTotalTrackers,\n      totalHosts: this.passiveModeUniqueHosts,\n      // Variables are for the chart data in order to render the two charts.\n      options: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 40\n      },\n      chartData: {\n        labels: ['Legitimate Requests', 'Blocked Requests'],\n        datasets: [{\n          label: \"NumberOfTrackers\",\n          backgroundColor: ['darkgreen', '#20C20E'],\n          data: [this.totalRequests - this.passiveModeTotalTrackers, this.passiveModeTotalTrackers]\n        }]\n      },\n      categoryChartData: {\n        labels: this.categoryLabels,\n        datasets: [{\n          label: \"Categories\",\n          backgroundColor: ['#9F2B68', '#800020', '#301934', '#CBC3E3', '#AA98A9', '#673147'],\n          data: this.categoryCounts\n        }]\n      },\n      // Initialisation of variables required for displaying the passive statistics to the user. \n      achievements: [],\n      AchievementPage: false,\n      HostPage: false,\n      CountryPage: false,\n      PassivePage: true,\n      passiveCountryCounts: [],\n      passiveCountryLabels: [],\n      passiveModeHosts: [],\n      pastTrackingNumbers: [],\n      categoryLabels: [],\n      categoryCounts: [],\n      key: 0,\n      isTest: false\n    };\n  },\n\n  computed: {\n    currentDataSet() {\n      return this.chartData.datasets[0].data;\n    }\n\n  },\n\n  // Logic is fired before the updating of the render. Ensures that the chart data is available within data() before rendering, meaning the charts are rendered on the first visit. Also retrieves and initialises all the required variables. \n  beforeUpdate() {\n    for (var i = 0; i < this.passiveCategoryList.length; i++) {\n      this.categoryLabels[i] = this.passiveCategoryList[i].name;\n      this.categoryCounts[i] = this.passiveCategoryList[i].count;\n    }\n\n    this.categoryChartData.labels = this.categoryLabels;\n    this.categoryChartData.datasets[0].data = this.categoryCounts;\n    this.chartData.datasets[0].data = [this.totalRequests - this.passiveModeTotalTrackers, this.passiveModeTotalTrackers];\n    this.key++;\n    var vm = this; // This test was introduced due to the below statements causing unit test errors. The only instance \"isTest\" is ever set to true is when unit tests are being completed.\n\n    if (!this.isTest) {\n      chrome.storage.local.get([\"achievements\"], function (result) {\n        vm.achievements = result.achievements;\n      });\n      chrome.storage.local.get([\"passiveCountryList\"], function (result) {\n        for (var i = 0; i < vm.passiveModeCountries.length; i++) {\n          vm.passiveCountryCounts[i] = vm.passiveModeCountries[i].count;\n          vm.passiveCountryLabels[i] = vm.passiveModeCountries[i].name;\n        }\n\n        console.log(result);\n      });\n      chrome.storage.local.get([\"passiveHosts\"], function (result) {\n        vm.passiveModeHosts = result.passiveHosts;\n      });\n      chrome.storage.local.get([\"pastTrackingNumbers\"], function (result) {\n        vm.pastTrackingNumbers = result.pastTrackingNumbers;\n      });\n    }\n  }\n\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-chartjs */ \"./node_modules/vue-chartjs/dist/index.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ \"./node_modules/chart.js/dist/chart.mjs\");\n/*\n This was adapted from two tutorials:\n- D Berning, \"How To Use Chart.js with Vue.js\", digitalocean.com, Available at: https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js, Accessed 02/08/2022\n- J Nieto, \"Vue Chartjs Doughnut\", codesandbox.io, Available at: https://codesandbox.io/s/j47zp73845?file=/src/components/DoughnutExample.vue--, Accessed 02/08/2022\n*/\n\n\nchart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_0__.ArcElement, chart_js__WEBPACK_IMPORTED_MODULE_0__.Tooltip);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  extends: {\n    Doughnut: vue_chartjs__WEBPACK_IMPORTED_MODULE_1__.Doughnut\n  },\n  mixins: [vue_chartjs__WEBPACK_IMPORTED_MODULE_1__.Doughnut],\n  props: {\n    chartData: {\n      type: Object,\n      required: true\n    },\n    options: {\n      type: Object,\n      required: true\n    }\n  },\n  components: {\n    Doughnut: vue_chartjs__WEBPACK_IMPORTED_MODULE_1__.Doughnut\n  },\n  name: 'PassiveModeChart'\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  methods: {\n    // Only two methods, and these delegate the majority of the logic to the App.vue component\n    setUsername() {\n      if (this.$refs.nickname.value === null || this.$refs.nickname.value === '') {\n        return;\n      } else {\n        var UsersID = this.$refs.nickname.value;\n        this.$emit('setUsername', UsersID);\n      }\n    },\n\n    usernameToIntro() {\n      this.$emit('usernameToIntro');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SetUsername.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_BaseTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/BaseTimer */ \"./src/components/BaseTimer.vue\");\n/* harmony import */ var _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassiveModeChart.vue */ \"./src/components/PassiveModeChart.vue\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    BaseTimer: _components_BaseTimer__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    PassiveModeChart: _PassiveModeChart_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  // Adapted from a StackOverflow answer: B Carey, \"How do I create a sinmple 10 seconds countdown in Vue.JS\", StackOverflow.com, Available at: https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js, Accessed 12/06/2022\n  watch: {\n    timer: {\n      handler(value) {\n        if (value > 0 && this.gameStarted) {\n          setTimeout(() => {\n            this.timer--;\n            this.timePased++;\n          }, 1000);\n        } else if (value <= 10 && value > 1) {\n          this.timerClose = true;\n        } else if (value === 0) {\n          this.endGame();\n\n          if (this.GameMode === 'Bingo') {\n            this.endBingoGame();\n          }\n        }\n      },\n\n      immediate: true\n    }\n  },\n\n  data() {\n    return {\n      // Information Boxes variables\n      ClassicInfo: \"In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \\n Common Countries (x1 Multiplyer): United States, United Kingdom \\n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \\n Rare Countries (x3 Multiplyer): Asian Nations \\n Very Rare Countries (x4 Multiplyer): African Nations \\n All other countries (x5 Multiplyer)\",\n      BingoInfo: \"In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game\",\n      InformationBox: false,\n      // Gameplay variables\n      gameOver: false,\n      userScore: 0,\n      VisitedCountries: [],\n      numberOfCookies: 0,\n      countriesToFind: [],\n      finishedGame: false,\n      APIEnabled: true,\n      categoryList: [],\n      gameStarted: false,\n      achievements: [],\n      timer: 124,\n      noOfCountries: 0,\n      WinningUser: undefined,\n      didYouWin: false,\n      noOfCountriesBingo: 0,\n      categoryLabels: [],\n      categoryCounts: [],\n      countryLabels: [],\n      countryCounts: [],\n      // Bingo Mode Variables\n      easyCountries: [\"United States\", \"United Kingdom\", \"Canada\"],\n      medEasyCountries: [\"Ireland\", \"Germany\", \"Netherlands\", \"Belgium\", \"Spain\", \"Belarus\", \"France\", \"Czechia\", \"Poland\", \"Austria\"],\n      hardCountries: [\"China\", \"Russia\", \"Bulgaria\", \"Japan\", \"Mexico\", \"South Korea\", \"Singapore\"],\n      // Geolocation of countries, used for Classic mode point calculation.\n      CountriesInAsia: [\"Japan\", \"Indonesia\", \"India\", \"China\", \"Thailand\", \"South Korea\", \"Philippines\", \"Singapore\", \"Vietnam\", \"Malaysia\", \"Hong Kong\", \"Saudi Arabia\", \"Pakistan\", \"Myanmar\", \"Cambodia\", \"Taiwan\", \"Laos\", \"Iran\", \"Sri Lanka\", \"Israel\", \"Maldives\", \"Afghanistan\", \"Bangladesh\", \"Nepal\", \"Qatar\", \"Mongolia\", \"Brunei\", \"Lebanon\", \"North Korea\", \"Iraq\", \"Uzbekistan\", \"Syria\", \"Macao\", \"Christmas Islands\", \"United Arab Emirates\", \"Jordan\", \"Armenia\", \"Timor-Leste\", \"Kyrgzstan\", \"Yemen\", \"Paliestine\", \"Bhutan\", \"Kuwait\", \"Turkmenistan\", \"Bahrain\", \"Tajikistan\", \"Oman\"],\n      AfricanCountries: [\"Nigeria\", \"Ethiopia\", \"Eygpt\", \"Democratic Republic of the Congo\", \"Tanzania\", \"South Africa\", \"Kenya\", \"Sudan\", \"Algeria\", \"Uganda\", \"Morocco\", \"Angola\", \"Mozambique\", \"Ghana\", \"Cameroon\", \"Madagascar\", \"Ivory Coast\", \"Niger\", \"Burkina Faso\", \"Mali\", \"Malawi\", \"Zambia\", \"Senegal\", \"Chad\", \"Somalia\", \"Zimbabwe\", \"South Sudan\", \"Rwanda\", \"Guinea\", \"Burundi\", \"Benin\", \"Tunisia\", \"Sierra Leone\", \"Togo\", \"Libya\", \"Repbulic of the Congo\", \"Central African Republic\", \"Liberia\", \"Mauritania\", \"Eritrea\", \"Namibia\", \"Gambia\", \"Botswana\", \"Gabon\", \"Lesotho\", \"Guimea-Bissau\", \"Equatorial Guinea\", \"Mauritius\", \"Eswatini\", \"Djibouti\", \"Cape Verde\"],\n      EuropeanCountries: [\"Hungary\", \"Belarus\", \"Austria\", \"Serbia\", \"Switzerland\", \"Germany\", \"Holy See\", \"Andorra\", \"Bulgaria\", \"United Kingdom\", \"France\", \"Montenegro\", \"Luxembourg\", \"Italy\", \"Denmark\", \"Finland\", \"Slovakia\", \"Norway\", \"Ireland\", \"Spain\", \"Malta\", \"Ukraine\", \"Croatia\", \"Moldova\", \"Monaco\", \"Liechtenstein\", \"Poland\", \"Iceland\", \"San Marino\", \"Bosnia and Herzegovina\", \"Albania\", \"Lithuania\", \"North Macedonia\", \"Slovenia\", \"Romania\", \"Latvia\", \"Netherlands\", \"Russia\", \"Estonia\", \"Belgium\", \"Czechia\", \"Portugal\", \"Greece\", \"Sweden\"],\n      NorthAmerica: [\"United States\", \"USA\", \"United States of America\", \"Canada\", \"Mexico\"],\n      Oceania: [\"Australia\", \"New Zealand\"],\n      onePointCountries: [\"United Kingdom\", \"United States\"],\n      // Chart Data Variables\n      options: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 90\n      },\n      chartData: {\n        labels: this.categoryLabels,\n        datasets: [{\n          label: \"Categories\",\n          backgroundColor: ['#9F2B68', '#800020', '#301934', '#CBC3E3', '#AA98A9', '#673147'],\n          data: this.categoryCounts\n        }]\n      },\n      countryOptions: {\n        responsive: false,\n        maintainAspectRation: false,\n        animation: {\n          animateRotate: false\n        },\n        hoverBorderWidth: 10,\n        cutoutPercentage: 40\n      },\n      countryChartData: {\n        labels: this.countryLabels,\n        datasets: [{\n          label: \"Countries\",\n          backgroundColor: ['#228B22', '#808000', '#023020', '#4F7942', '#8A9A5B', '#B4C424', '#C9CC3F'],\n          data: this.countryCounts\n        }]\n      }\n    };\n  },\n\n  // Before the DOM is re-rendered, this will update the chart data, to ensure that the charts always accurately show the current game state. \n  beforeUpdate() {\n    for (var i = 0; i < this.categoryList.length; i++) {\n      this.categoryLabels[i] = this.categoryList[i].name;\n      this.categoryCounts[i] = this.categoryList[i].count;\n    }\n\n    this.chartData.labels = this.categoryLabels;\n    this.chartData.datasets[0].data = this.categoryCounts;\n\n    for (var j = 0; j < this.VisitedCountries.length; j++) {\n      this.countryLabels[j] = this.VisitedCountries[j].name;\n      this.countryCounts[j] = this.VisitedCountries[j].count;\n    }\n\n    this.countryChartData.labels = this.countryLabels;\n    this.countryChartData.datasets[0].data = this.countryCounts;\n  },\n\n  // Fired before the component is rendered. If the user is rejoining a solo game, this will reinitiate the game with the backupGame details. \n  mounted() {\n    this.timer = this.startTime;\n    var vm = this;\n\n    if (this.userSoloContinue) {\n      chrome.storage.local.get(['backupGameDetails'], function (result) {\n        var backupGame = result.backupGameDetails;\n        vm.gameStarted = backupGame.gameStarted;\n        vm.userScore = backupGame.userScore;\n        vm.VisitedCountries = backupGame.VisitedCountries;\n        vm.timer = backupGame.timer;\n        vm.countriesToFind = backupGame.CountriesToFind;\n      });\n      this.initiateListener();\n      this.timer -= 1;\n      this.timer += 1;\n      vm.$emit('resetSoloStatus');\n    }\n  },\n\n  props: {\n    GameMode: {\n      type: String,\n      required: true\n    },\n    startTime: {\n      type: Number,\n      required: true\n    },\n    userSoloContinue: {\n      type: Boolean,\n      required: true\n    },\n    userProfile: {\n      type: Object,\n      required: true\n    }\n  },\n  methods: {\n    // Displays the game information\n    displayInformation() {\n      if (this.InformationBox === true) {\n        this.InformationBox = false;\n      } else {\n        this.InformationBox = true;\n      }\n    },\n\n    // Initiates the game\n    gameSetup() {\n      this.initiateGame();\n    },\n\n    // Logic for ensuring the successful ending of a game\n    endGame() {\n      this.WinningUser = this.userProfile;\n      var timePassed = this.startTime - this.timer;\n      this.gameOver = true;\n      this.finishedGame = true;\n\n      if (this.GameMode === \"Classic\") {\n        this.$socket.emit('addScoreToDatabase', this.userProfile.userID, this.GameMode, this.userScore, this.MultiPlayer === true, this.startTime);\n      } else if (this.GameMode === \"Bingo\") {\n        // This checks whether or not the user managed to finish the bingo list.\n        for (var j = 0; j < 3; j++) {\n          if (this.countriesToFind[j].found != true) {\n            this.finishedGame = false;\n          }\n        }\n\n        if (this.finishedGame) {\n          this.$socket.emit('addScoreToDatabase', this.userProfile.userID, this.GameMode, timePassed, this.MultiPlayer === true, this.startTime);\n        }\n\n        if (this.GameMode === 'Bingo') {\n          this.endBingoGame();\n        }\n      } // Once the game ends, these socket emissions ensure the user is no longer recorded as being in any games by the server.\n\n\n      this.$socket.emit('soloGameFinished', this.userProfile.googleID);\n      this.$socket.emit('endPreviousGames', this.userProfile.userID, this.userProfile.googleID);\n    },\n\n    // Additional logic to be called whenever a Bingo mode game finishes. \n    endBingoGame() {\n      this.didYouWin = true;\n      var didUserWin = true;\n\n      for (var i = 0; i < this.countriesToFind.length; i++) {\n        if (this.countriesToFind[i].found === false) {\n          didUserWin = false;\n        }\n      }\n\n      if (didUserWin) {\n        this.WinningUser = this.userProfile.userID;\n        this.didYouWin = true;\n        this.finishedGame = true;\n        this.noOfCountriesBingo = this.countriesToFind.length;\n      }\n\n      this.$socket.emit('soloGameFinished', this.userProfile.googleID);\n      this.gameOver = true;\n    },\n\n    // Logic for exiting to the Home Page\n    exitToHomePageReset() {\n      this.$emit('exitToHomePageReset');\n      this.gameOver = false;\n      this.categoryList = [];\n      var vm = this; // Resets the gameplay variables in the extension script upon exiting the game\n\n      chrome.runtime.sendMessage({\n        message: 'reset',\n\n        function(response) {\n          if (response === 'success') {\n            console.log('successfully reset the game.');\n            vm.VisitedCountries = [];\n            vm.userScore = 0;\n            vm.numberOfCookies = 0;\n            vm.categoryList = [];\n          }\n        }\n\n      });\n    },\n\n    // This fires whenever a game is begun. This starts the actual gameplay. \n    initiateGame() {\n      var vm = this;\n      this.gameStarted = true;\n\n      if (this.timer <= 0) {\n        this.timer = this.startTime;\n      }\n\n      this.numberOfCookies = 0;\n      this.timer = this.timer * 1;\n      this.timer -= 1;\n      this.timer += 1; // Resetting the gameplay variables in the extension scripts to ensure that we have a fresh start.\n\n      chrome.runtime.sendMessage({\n        message: 'reset'\n      }, function (response) {\n        if (response === 'success') {\n          console.log('successfully started the game.');\n          vm.VisitedCountries = [];\n          vm.userScore = 0;\n          vm.numberOfCookies = 0;\n        }\n\n        return true;\n      }); // If Bingo mode, create an array of countries to find. \n\n      if (this.GameMode === \"Bingo\") {\n        this.countriesToFind = [];\n        this.countriesToFind.push({\n          country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)],\n          found: false\n        });\n        this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind); // Not sure why this is here? Delete when not as tired.\n      } // Finally, initiate the event listener.\n\n\n      this.initiateListener();\n    },\n\n    // Helper method adapted from: ‘Math.random() - JavaScript | MDN’. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random (accessed Sep. 02, 2022).\n    generateRandomIntHelper(max) {\n      return Math.floor(Math.random() * max);\n    },\n\n    // This initiates the event listener, so that we detect if any countries are found by the extension scripts and incorporate this into the gameplay. \n    initiateListener() {\n      var vm = this;\n      chrome.storage.onChanged.addListener(function (result) {\n        if (!vm.gameOver) {\n          vm.updateListOfCountries();\n          vm.updateAchievements();\n          vm.updateCategories();\n\n          if (vm.GameMode === \"Classic\") {\n            vm.updateScoreClassic();\n          } else if (vm.GameMode === \"Bingo\") {\n            vm.updateScoreBingo();\n          }\n\n          vm.backupGameDetails();\n          vm.VisitedCountries = result.countryList.newValue;\n          vm.gameStarted = true;\n        }\n      });\n    },\n\n    // Logic is fired by the listener each state change to ensure that the backup details are stored in case the user exits.\n    backupGameDetails() {\n      var backupGame = {};\n      backupGame.GameMode = this.GameMode;\n      backupGame.timer = this.timer;\n      backupGame.score = this.userScore;\n      backupGame.VisitedCountries = this.VisitedCountries;\n      backupGame.gameStarted = this.gameStarted;\n\n      if (this.GameMode === \"Bingo\") {\n        backupGame.CountriesToFind = this.countriesToFind;\n      }\n\n      chrome.storage.local.set({\n        backupGameDetails: backupGame\n      });\n    },\n\n    // Logic is fired by the event listener in order to update the country list and number of cookies of the user\n    updateListOfCountries() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        vm.VisitedCountries = result.countryList;\n        chrome.storage.local.get([\"numberOfCookies\"], function (result) {\n          vm.numberOfCookies = result;\n        });\n      });\n      chrome.storage.local.set({\n        backupCountryList: vm.VisitedCountries\n      });\n    },\n\n    // Logic is fired by the event listener in order to update the achievements for the user.\n    updateAchievements() {\n      var vm = this;\n      chrome.storage.local.get([\"achievements\"], function (result) {\n        vm.achievements = result.achievements;\n      });\n    },\n\n    // Logic is fired by the event listener in order to update the categories for the user.\n    updateCategories() {\n      var vm = this;\n      chrome.storage.local.get([\"categoryList\"], function (result) {\n        vm.categoryList = result.categoryList;\n      });\n    },\n\n    // Logic is fired by the event listener in classic mode to calculate and update the user's score.\n    updateScoreClassic() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        let score = 0;\n\n        for (var i = 0; i < result.countryList.length; i++) {\n          if (vm.onePointCountries.includes(result.countryList[i].name)) {\n            score += result.countryList[i].count;\n          } else if (vm.EuropeanCountries.includes(result.countryList[i].name) || vm.NorthAmerica.includes(result.countryList[i].name)) {\n            score += result.countryList[i].count * 2;\n          } else if (vm.CountriesInAsia.includes(result.countryList[i])) {\n            score += result.countryList[i].count * 3;\n          } else if (vm.AfricanCountries.includes(result.countryList[i])) {\n            score += result.countryList[i].count * 4;\n          } else {\n            score += result.countryList[i].count;\n          }\n        }\n\n        vm.userScore = score;\n        vm.noOfCountries = result.countryList.length;\n      });\n    },\n\n    // Logic is fired by the event listener in Bingo mode to calculate and update the user's score.\n    updateScoreBingo() {\n      var vm = this;\n      var ProfileOfUser = this.userProfile;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        for (var i = 0; i < result.countryList.length; i++) {\n          for (var j = 0; j < 3; j++) {\n            if (result.countryList[i].name === vm.countriesToFind[j].country) {\n              vm.countriesToFind[j].found = true;\n            }\n          }\n        }\n\n        vm.noOfCountries = result.countryList.length;\n      });\n      var allFound = true;\n      setTimeout(() => {\n        console.log('done waiting'), 2000;\n      });\n\n      for (var k = 0; k < 3; k++) {\n        if (this.countriesToFind[k].found != true) {\n          allFound = false;\n        } else if (!ProfileOfUser.BingoCountries.includes(this.countriesToFind[k]) && this.countriesToFind[k].found === true) {\n          ProfileOfUser.BingoCountries.push(this.countriesToFind[k]);\n        }\n      }\n\n      this.noOfCountriesBingo = ProfileOfUser.BingoCountries.length;\n\n      if (allFound && this.countriesToFind.length != 0) {\n        this.endBingoGame();\n        this.didYouWin = true;\n        this.WinningUser = this.userProfile.userID;\n        console.log(\"It's this that's firing\");\n        console.log(this.countriesToFind);\n        console.log(this.countriesToFind.length);\n        console.log(allFound);\n      }\n    },\n\n    // This logic is for displaying flags, and prevents errors whenever the country name has a space in it.\n    shortenName(countryName) {\n      return countryName.replace(/\\s/g, '');\n    }\n\n  },\n  // Below code has been adapted from a tutorial: - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n  computed: {\n    formattedTimeLeft() {\n      const timeTG = this.timer;\n      const minutes = Math.floor(timeTG / 60);\n      var seconds = timeTG % 60;\n\n      if (seconds < 10) {\n        seconds = `0${seconds}`;\n      }\n\n      return `${minutes}:${seconds}`;\n    },\n\n    // Below code has been adapted from a tutorial: - M Rybczonek, \"How to Create an Animated Countdown Timer With Vue\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\n    timePassed() {\n      return this.startTime - this.timer;\n    },\n\n    timeLeft() {\n      return this.startTime - (this.startTime - this.timer);\n    },\n\n    orderedCountries() {\n      return lodash__WEBPACK_IMPORTED_MODULE_2___default().orderBy(this.VisitedCountries, 'count', 'desc');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SoloGamePage_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/SoloGamePage.vue */ \"./src/components/SoloGamePage.vue\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    personalSoloHS: {\n      type: Array,\n      required: false\n    },\n    userProfile: {\n      type: Object,\n      required: true\n    },\n    userSoloContinue: {\n      type: Boolean,\n      required: true\n    }\n  },\n  components: {\n    SoloGamePage: _components_SoloGamePage_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n\n  // Whenever this component is initially rendered, we check if the user is rejoining a game, and if so, get the relevant backupgame details. \n  created() {\n    var vm = this;\n\n    if (this.userSoloContinue) {\n      chrome.storage.local.get(['backupGameDetails'], function (result) {\n        var backupGame = result.backupGameDetails;\n        vm.gameMode = backupGame.GameMode;\n        vm.timer = backupGame.timer;\n      });\n      this.SoloPage = false;\n      this.SoloGame = true;\n    }\n  },\n\n  data() {\n    return {\n      gameMode: 'Classic',\n      timer: 156,\n      gameOver: false,\n      SoloPage: true,\n      Sologame: true,\n      ClassicInfo: \"In Classic mode, points are awarded through discovering tracking URLs located in different nations. The rarity of the nation discovered determines the amount of points received. The player with the most points when the timer elapses will win. \\n Common Countries (x1 Multiplyer): United States, United Kingdom \\n Uncommon Countries (x2 Multiplyer): EU Nations/North American Nations \\n Rare Countries (x3 Multiplyer): Asian Nations \\n Very Rare Countries (x4 Multiplyer): African Nations \\n All other countries (x5 Multiplyer)\",\n      BingoInfo: \"In Bingo mode, users are challenged to discover tracking URLs from a specific list of countries. The first player to discover all listed countries is the winner of the game\",\n      InformationBox: false\n    };\n  },\n\n  methods: {\n    // The below methods change the game mode and timer depending on the radio buttons selected.\n    onGameModeChange() {\n      var gameModeSelected = event.target.value;\n      this.gameMode = gameModeSelected;\n    },\n\n    onTimeChange() {\n      var timeSelected = event.target.value;\n      this.timer = timeSelected;\n    },\n\n    // Renders the Solo Game page and informs the server the user is now in a solo game.\n    soloGameInitiated() {\n      this.gameOver = false;\n      this.SoloPage = false;\n      this.SoloGame = true;\n      this.$socket.emit(\"playerInSoloGame\", this.userProfile.googleID);\n    },\n\n    // Below logic is for returning to the home page, or doing this and resetting\n    exitToHomePage() {\n      this.$emit('exitToHomePage');\n      this.SoloGame = false;\n      this.SoloPage = false;\n    },\n\n    exitToHomePageReset() {\n      this.$emit('exitToHomePage');\n      this.gameover = false;\n      this.SoloGame = false;\n      this.SoloPage = false;\n    },\n\n    // This method is to reset the variable that indicates the player is rejoining a game. \n    resetSoloStatus() {\n      this.$emit('resetSoloStatus');\n    },\n\n    // This will display the information boxes to the user.\n    displayInformation() {\n      this.InformationBox = !this.InformationBox;\n    }\n\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloLobby.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  methods: {\n    // Methods primarily delegate to OptionsView.vue\n    changeUsername() {\n      if (this.$refs.NewUsername.value != null && this.$refs.NewUsername.value != '') {\n        this.$emit('changeUsername', this.$refs.NewUsername.value);\n      } else {\n        alert(\"Error. Please enter a valid username\");\n      }\n    },\n\n    backToOptions() {\n      this.$emit('backToOptions');\n    }\n\n  },\n  props: {\n    UsersID: {\n      type: String,\n      required: true\n    }\n  }\n});\n\n//# sourceURL=webpack://tracker-hunt/./src/components/UsernameChange.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_IntroPage_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/IntroPage.vue */ \"./src/components/IntroPage.vue\");\n/* harmony import */ var _components_SetUsername_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/SetUsername.vue */ \"./src/components/SetUsername.vue\");\n/* harmony import */ var _components_HomePageView_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/HomePageView.vue */ \"./src/components/HomePageView.vue\");\nconst __default__ = {\n  // Sockets set up to react to events emitted from the server. \n  sockets: {\n    connect() {\n      console.log('Client has successfully connected to the Socket.IO websocket.');\n    },\n\n    disconnect() {\n      console.log('Client has disconnected from the Socket.IO websocket.');\n    },\n\n    // Fired whenever the user logs in for the first time  \n    UserNotFound() {\n      this.UsernamePage = true;\n      this.IntroPageView = false;\n    },\n\n    // Fires when the server sends an event with the user's gamesPlayed and gamesWon statistics.\n    sendUserDetails(MessageDetails) {\n      this.gamesPlayed = MessageDetails[0].gamesPlayed;\n      this.gamesWon = MessageDetails[0].wonGames;\n    },\n\n    // Fires whenever a user logging in has been encountered previously\n    UserFound(users) {\n      console.log(users);\n      this.UsernamePage = false;\n      this.HomePage = true;\n      this.IntroPageView = false;\n      this.getUserDetails(users[0].googleID);\n      console.log(users);\n      this.UsersID = users[0].username;\n      this.UserGoogleID = users[0].googleID;\n      this.userProfile = new User(this.UsersID);\n      this.userProfile.googleID = this.UserGoogleID;\n    },\n\n    Homepage() {\n      this.HomePage = true;\n    },\n\n    // Logic for setting a new username\n    nameAvailable(MessageDetails) {\n      console.log(MessageDetails);\n      this.UsersID = MessageDetails;\n      this.$socket.emit('newUser', this.UsersID, this.UserGoogleID);\n      this.userProfile = new User(this.UsersID);\n      this.userProfile.userID = this.UsersID;\n      this.UsernamePage = false;\n      this.HomePage = true;\n      this.getUserDetails(this.UserGoogleID);\n    },\n\n    nameUnavailable(MessageDetails) {\n      console.log(MessageDetails);\n      console.log(\"Error: Name \" + MessageDetails + \" is already in use\");\n      alert(\"Error: Name \" + MessageDetails + \" is already in use\");\n    },\n\n    // Events fired whenever a user is rejoining a game. \n    UserInMultiplayer(MessageDetails) {\n      console.log(MessageDetails);\n      this.userInAMultiGame = true;\n      this.multiGameDetails.playersLobby = MessageDetails[0];\n      this.multiGameDetails.LobbyUsers = MessageDetails[1];\n      this.IntroPageView = false;\n      this.HomePage = true;\n      this.userMultiContinue = true;\n    },\n\n    UserInSinglePlayer(MessageDetails) {\n      console.log('test gurl');\n\n      if (this.UserGoogleID === MessageDetails) {\n        console.log('test boiii');\n        this.IntroPageView = false;\n        this.HomePage = true;\n        this.userSoloContinue = true;\n      }\n    }\n\n  },\n\n  data() {\n    return {\n      IntroPageView: true,\n      HomePage: false,\n      UsernamePage: false,\n      UsersID: '1234',\n      UserGoogleID: '',\n      userProfile: undefined,\n      gamesPlayed: 0,\n      gamesWon: 0,\n      userSignedIn: false,\n      userSoloContinue: false,\n      userMultiContinue: false,\n      multiGameDetails: {}\n    };\n  },\n\n  components: {\n    IntroPage: _components_IntroPage_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SetUsername: _components_SetUsername_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    HomePageView: _components_HomePageView_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  methods: {\n    // Fires an event to get the users gamesWon and gamesPlayed statistics\n    getUserDetails(userGoogleID) {\n      this.$socket.emit('retrieveDetails', userGoogleID);\n      this.gameStarted = false;\n    },\n\n    // Logic allows us to change usernames\n    changeUsername(newUsername) {\n      console.log(newUsername);\n      this.UsersID = newUsername;\n      this.userProfile.userID = this.UsersID;\n      console.log(this.UserGoogleID);\n      this.$socket.emit('newUsername', this.UserGoogleID, this.UsersID);\n    },\n\n    // Logic allows us to login\n    googleLogin(googleID) {\n      var vm = this;\n      this.userSignedIn = true;\n      vm.IntroPageView = false;\n      vm.UserGoogleID = googleID;\n    },\n\n    setUsername(UsersID) {\n      if (UsersID === '') {\n        alert(\"Please enter a name\");\n      } else {\n        this.$socket.emit('nameTaken', UsersID);\n      }\n    },\n\n    // View controllers\n    usernameToIntro() {\n      this.UsernamePage = false;\n      this.IntroPageView = true;\n    },\n\n    // The following method is a legacy method from when this application had a more naive design. App.vue used to serve as a parent to all components and an overall view controller\n    exitToHomePage() {\n      this.LobbyPage = false;\n      this.JoinLobbyPage = false;\n      this.LeaderBoardPage = false;\n      this.SoloPage = false;\n      this.OptionsPage = false;\n      this.HomePage = true;\n      this.SoloPage = false;\n      this.SoloGame = false;\n      this.MultiPlayer = false;\n      this.UsernameChangePage = false;\n      this.PassivePage = false;\n      this.HostPage = false;\n      this.CountryPage = false;\n      this.AchievementPage = false;\n      this.gameStarted = false;\n    },\n\n    // Logout functionality\n    logout() {\n      this.HomePage = false;\n      this.IntroPageView = true;\n    },\n\n    // Resets the flags that are used to rejoin games\n    resetSoloStatus() {\n      this.userSoloContinue = false;\n    },\n\n    ClearMultiVariable() {\n      this.userMultiContinue = false;\n      console.log(\"Cleaned\");\n    }\n\n  }\n}; // Class Helpers:\n\nclass User {\n  constructor(userID) {\n    this.userID = userID;\n    this.score = 0;\n    this.ready = \"Not Ready\";\n    this.googleID = '';\n    this.BingoCountries = [];\n  }\n\n}\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/Object.assign(__default__, {\n  __name: 'App',\n\n  setup(__props, _ref) {\n    let {\n      expose\n    } = _ref;\n    expose(); // Import statements for the relevant child-components of App.vue\n\n    const __returned__ = {\n      User,\n      IntroPage: _components_IntroPage_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n      SetUsername: _components_SetUsername_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n      HomePageView: _components_HomePageView_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    };\n    Object.defineProperty(__returned__, '__isScriptSetup', {\n      enumerable: false,\n      value: true\n    });\n    return __returned__;\n  }\n\n}));\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=template&id=615280ce":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=template&id=615280ce ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Passive Mode Achievements are unlocked while passively browsing. A notification will be received when this is achieved.\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"hr\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.achievements, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: \"Achievements\",\n      key: item\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"AchivementTitle\", {\n        achieved: item.achieved === 'Unlocked'\n      }])\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.achieved), 3\n    /* TEXT, CLASS */\n    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"HelpText\", {\n        achieved: item.achieved === 'Unlocked'\n      }])\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 3\n    /* TEXT, CLASS */\n    ), _hoisted_2]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Back\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.backToPassive && $options.backToPassive(...arguments);\n    })\n  }, \"Back\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Home\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    })\n  }, \"HomePage\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _withScopeId = n => ((0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)(\"data-v-69efee18\"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n);\n\nconst _hoisted_1 = {\n  class: \"base-timer\"\n};\nconst _hoisted_2 = {\n  class: \"base-timer__svg\",\n  viewBox: \"0 0 100 100\",\n  xmlns: \"http://www.w3.org/2000/svg\"\n};\n\nconst _hoisted_3 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"g\", {\n  class: \"base-timer__circle\"\n}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"circle\", {\n  class: \"base-timer__path-elapsed\",\n  cx: \"50\",\n  cy: \"50\",\n  r: \"46.5\"\n})], -1\n/* HOISTED */\n));\n\nconst _hoisted_4 = [\"stroke-dasharray\"];\nconst _hoisted_5 = [\"value\"];\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"svg\", _hoisted_2, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"path\", {\n    \"stroke-dasharray\": $options.circleArray,\n    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.colourOfTimer, \"base-timer__path-remaining\"]),\n    d: \"M 50, 50 m -45, 0 a 45,45 0 1, 0 90, 0 a 45, 45 0 1, 0 -90, 0\"\n  }, null, 10\n  /* CLASS, PROPS */\n  , _hoisted_4)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", {\n    class: \"base-timer__label\",\n    value: $props.formattedTimeToGo\n  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.formattedTimeToGo), 9\n  /* TEXT, PROPS */\n  , _hoisted_5)]);\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=template&id=dd6b384a":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=template&id=dd6b384a ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Passive Mode - Complete list of Countries\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = {\n  class: \"CountryChart\"\n};\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = [\"src\"];\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_PassiveModeChart = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"PassiveModeChart\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"PassiveModeChart\",\n    chartData: $data.chartData,\n    options: $data.options,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])]), _hoisted_4, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item,\n      class: \"TrackedCountry\"\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count) + \" tracker(s) \", 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"HomePage\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    })\n  }, \"HomePage\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Back\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.CountToPassive && $options.CountToPassive(...arguments);\n    })\n  }, \"Back\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=template&id=1c0eae83":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=template&id=1c0eae83 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = {\n  class: \"HelpText\"\n};\nconst _hoisted_6 = {\n  key: 1,\n  id: \"Leader-Board\"\n};\nconst _hoisted_7 = {\n  key: 2,\n  id: \"Options-Page\"\n};\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_9 = {\n  key: 3,\n  id: \"Join-Lobby\"\n};\nconst _hoisted_10 = {\n  key: 4,\n  id: \"Lobby\"\n};\nconst _hoisted_11 = {\n  key: 5\n};\nconst _hoisted_12 = {\n  key: 6,\n  id: \"Solo-Mode\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_LeaderBoard = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"LeaderBoard\");\n\n  const _component_OptionsView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"OptionsView\");\n\n  const _component_JoinLobby = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"JoinLobby\");\n\n  const _component_LobbyView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"LobbyView\");\n\n  const _component_PassiveMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"PassiveMode\");\n\n  const _component_SoloLobby = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"SoloLobby\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.HomePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, _hoisted_3, _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_5, \"Welcome back, \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.UsersID) + \"!\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Solo\",\n    class: \"homepageButton\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.solomode && $options.solomode(...arguments);\n    }),\n    type: \"button\"\n  }, \"Play Solo\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"NewLobby\",\n    class: \"homepageButton\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.createLobby && $options.createLobby(...arguments);\n    }),\n    type: \"button\"\n  }, \"Create Lobby\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Passive\",\n    class: \"homepageButton\",\n    onClick: _cache[2] || (_cache[2] = function () {\n      return $options.passiveMode && $options.passiveMode(...arguments);\n    }),\n    type: \"button\"\n  }, \"Passive Mode\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Lobby\",\n    class: \"homepageButton\",\n    onClick: _cache[3] || (_cache[3] = function () {\n      return $options.joinlobby && $options.joinlobby(...arguments);\n    }),\n    type: \"button\"\n  }, \"Join Lobby\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Options\",\n    class: \"homepageButton\",\n    onClick: _cache[4] || (_cache[4] = function () {\n      return $options.options && $options.options(...arguments);\n    }),\n    type: \"button\"\n  }, \"Options\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Leaderboards\",\n    class: \"homepageButton\",\n    onClick: _cache[5] || (_cache[5] = function () {\n      return $options.leaderboards && $options.leaderboards(...arguments);\n    }),\n    type: \"button\"\n  }, \"LeaderBoards\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----The below components are the child components rendered by the HomePage \"), _ctx.LeaderBoardPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LeaderBoard, {\n    gamesWon: $props.gamesWon,\n    gamesPlayed: $props.gamesPlayed,\n    personalSoloHS: $data.personalSoloHS,\n    soloClassicLeaderboard: $data.soloClassicLeaderboard,\n    multiClassicLeaderboard: $data.multiClassicLeaderboard\n  }, null, 8\n  /* PROPS */\n  , [\"gamesWon\", \"gamesPlayed\", \"personalSoloHS\", \"soloClassicLeaderboard\", \"multiClassicLeaderboard\"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[6] || (_cache[6] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    }),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.OptionsPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_OptionsView, {\n    UsersID: $props.UsersID,\n    onChangeUsername: _cache[7] || (_cache[7] = $event => $options.changeUsername($event)),\n    onPassiveMode: $options.passiveMode,\n    onChangeUsernamePage: _ctx.changeUsernamePage,\n    onLogout: $options.logout\n  }, null, 8\n  /* PROPS */\n  , [\"UsersID\", \"onPassiveMode\", \"onChangeUsernamePage\", \"onLogout\"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[8] || (_cache[8] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    }),\n    type: \"button\"\n  }, \"HomePage\"), _hoisted_8])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.JoinLobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_JoinLobby, {\n    onEnterLobby: _cache[9] || (_cache[9] = $event => $options.enterLobby($event)),\n    onExitToHomePage: $options.exitToHomePage\n  }, null, 8\n  /* PROPS */\n  , [\"onExitToHomePage\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _ctx.LobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LobbyView, {\n    multiGameDetails: $props.multiGameDetails,\n    userMultiContinue: $props.userMultiContinue,\n    userProfile: $props.userProfile,\n    UsersID: $props.UsersID,\n    playersLobby: $data.playersLobby,\n    UsersInLobby: $data.UsersInLobby,\n    isLobbyCreator: $data.isLobbyCreator,\n    onClearMultiVariable: $options.ClearMultiVariable,\n    onExitToHomePageReset: $options.exitToHomePageReset,\n    onMultiGameInitiated: _ctx.multiGameInitiated,\n    onLeaveGame: _ctx.leaveGame,\n    onUpdateLobbyUsers: _cache[10] || (_cache[10] = $event => $options.updateLobbyUsers($event))\n  }, null, 8\n  /* PROPS */\n  , [\"multiGameDetails\", \"userMultiContinue\", \"userProfile\", \"UsersID\", \"playersLobby\", \"UsersInLobby\", \"isLobbyCreator\", \"onClearMultiVariable\", \"onExitToHomePageReset\", \"onMultiGameInitiated\", \"onLeaveGame\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.PassivePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_PassiveMode, {\n    key: $data.key,\n    passiveCategoryList: $data.passiveCategoryList,\n    passiveModeCountries: $data.passiveModeCountries,\n    totalRequests: $data.totalRequests,\n    passiveModeTotalTrackers: $data.passiveModeTotalTrackers,\n    passiveModeUniqueHosts: $data.passiveModeUniqueHosts,\n    passiveModeTotalCounties: $data.passiveModeTotalCounties,\n    onExitToHomePage: $options.exitToHomePage\n  }, null, 8\n  /* PROPS */\n  , [\"passiveCategoryList\", \"passiveModeCountries\", \"totalRequests\", \"passiveModeTotalTrackers\", \"passiveModeUniqueHosts\", \"passiveModeTotalCounties\", \"onExitToHomePage\"]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _ctx.SoloPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SoloLobby, {\n    userSoloContinue: $props.userSoloContinue,\n    userProfile: $props.userProfile,\n    personalSoloHS: $data.personalSoloHS,\n    onOnGameModeChange: _cache[11] || (_cache[11] = $event => _ctx.onGameModeChange($event)),\n    onOnTimeChange: _cache[12] || (_cache[12] = $event => _ctx.onTimeChange($event)),\n    onExitToHomePage: $options.exitToHomePage,\n    onResetSoloStatus: $options.resetSoloStatus\n  }, null, 8\n  /* PROPS */\n  , [\"userSoloContinue\", \"userProfile\", \"personalSoloHS\", \"onExitToHomePage\", \"onResetSoloStatus\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HomePageView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=template&id=ed40fde0":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=template&id=ed40fde0 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Passive Mode - Complete list of Hosts\", -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedHosts, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.URL) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Home\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    })\n  }, \"HomePage\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Back\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.HostToPassive && $options.HostToPassive(...arguments);\n    })\n  }, \"Back\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HostsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=template&id=9137ccca":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=template&id=9137ccca ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Who is watching you?\", -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"To use TrackerHunt, sign in with Google and ensure you are signed in on your browser\", -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    class: \"loginButton\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.googleLogin && $options.googleLogin(...arguments);\n    }),\n    ref: \"LoginButton\"\n  }, \"Login\", 512\n  /* NEED_PATCH */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-This is here for testing purposes, as the Puppeteer software cannot navigate the OAuth2.0 window. This should be enabled when Puppeteer is run-\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---<button class=\\\"DevLogin\\\" @click=\\\"DevLogin\\\">Dev</button> -\"), _hoisted_4], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"Guide\"\n}, \"Enter Lobby ID:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_6 = {\n  id: \"LobbyID\",\n  ref: \"LobbyID\",\n  type: \"text\"\n};\nconst _hoisted_7 = {\n  class: \"ErrorText\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, _hoisted_3, _hoisted_4, _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_6, null, 512\n  /* NEED_PATCH */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.lobbyError), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Join\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.enterLobby && $options.enterLobby(...arguments);\n    }),\n    type: \"button\"\n  }, \"Join\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Back\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    }),\n    type: \"button\"\n  }, \"Back\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=template&id=12028246":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=template&id=12028246 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"LeaderBoards - Classic Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Username | Score | Date \", -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = {\n  key: 0\n};\nconst _hoisted_6 = {\n  key: 1\n};\nconst _hoisted_7 = {\n  class: \"WinLoss\"\n};\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", {\n  id: \"Leaderboard\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"solo\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.displaySoloClass && $options.displaySoloClass(...arguments);\n    }),\n    class: \"Radio\",\n    type: \"button\"\n  }, \"Solo\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"multi\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.displayMulClass && $options.displayMulClass(...arguments);\n    }),\n    class: \"Radio\",\n    type: \"button\"\n  }, \"MultiPlayer\"), _hoisted_4, $data.MultiClassicLB ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.intMultiClassLB, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      id: \"MultiBoard\",\n      key: item,\n      class: \"LeaderBoard\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.username) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.Score) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.createdAt), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.SoloClassicLB ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_7, \"W/L = \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.gamesWon) + \"/\" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.gamesPlayed - $props.gamesWon), 1\n  /* TEXT */\n  ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.intSoloClassLB, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      id: \"SoloBoard\",\n      key: item,\n      class: \"LeaderBoard\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.username) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.Score) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.createdAt), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"twoMin\",\n    onClick: _cache[2] || (_cache[2] = function () {\n      return $options.twoMinLB && $options.twoMinLB(...arguments);\n    }),\n    class: \"TimeButton\",\n    type: \"button\"\n  }, \"2 min\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"fiveMin\",\n    onClick: _cache[3] || (_cache[3] = function () {\n      return $options.fiveMinLB && $options.fiveMinLB(...arguments);\n    }),\n    class: \"TimeButton\",\n    type: \"button\"\n  }, \"5 min\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"tenMin\",\n    onClick: _cache[4] || (_cache[4] = function () {\n      return $options.tenMinLB && $options.tenMinLB(...arguments);\n    }),\n    class: \"TimeButton\",\n    type: \"button\"\n  }, \"10 min\"), _hoisted_9], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=template&id=a6a73bca":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=template&id=a6a73bca ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = {\n  class: \"HelpText\"\n};\nconst _hoisted_4 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_5 = {\n  key: 1,\n  class: \"HelpText\"\n};\nconst _hoisted_6 = {\n  class: \"RadioButtons\"\n};\nconst _hoisted_7 = {\n  key: 0,\n  class: \"HelpText\"\n};\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Choose GameMode: \");\n\nconst _hoisted_9 = {\n  key: 2,\n  id: \"ClassicRadio\",\n  for: \"Classic\"\n};\nconst _hoisted_10 = {\n  key: 4,\n  id: \"BingoRadio\",\n  for: \"Bingo\"\n};\nconst _hoisted_11 = {\n  class: \"Players\"\n};\n\nconst _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Connected Players:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_13 = [\"onMouseover\"];\nconst _hoisted_14 = [\"onClick\"];\n\nconst _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_18 = {\n  class: \"RadioButtons\"\n};\nconst _hoisted_19 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_20 = {\n  key: 2,\n  for: \"twoMins\"\n};\nconst _hoisted_21 = {\n  key: 4,\n  id: \"fiveMinsRadio\",\n  for: \"fiveMins\"\n};\nconst _hoisted_22 = {\n  key: 6,\n  id: \"tenMinsRadio\",\n  for: \"tenMins\"\n};\nconst _hoisted_23 = {\n  key: 2,\n  class: \"HelpText\"\n};\n\nconst _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_25 = {\n  key: 5\n};\nconst _hoisted_26 = {\n  key: 0,\n  class: \"textBox\",\n  ref: \"usernameInvite\",\n  type: \"text\",\n  id: \"Invite\"\n};\nconst _hoisted_27 = {\n  key: 0,\n  class: \"HelpText\"\n};\n\nconst _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_MultiPlayerGame = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"MultiPlayerGame\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.LobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_3, \"Lobby ID: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.playersLobby), 1\n  /* TEXT */\n  ), $data.InformationBox && $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ClassicInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.InformationBox && $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.BingoInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-- Radio Buttons adapted from tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022\"), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_7, [_hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.displayInformation && $options.displayInformation(...arguments);\n    }),\n    class: \"InformationBox\",\n    id: \"Info\"\n  }, \"i\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 1,\n    id: \"Classic\",\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Classic\",\n    onChange: _cache[1] || (_cache[1] = function () {\n      return $options.onGameModeChange && $options.onGameModeChange(...arguments);\n    })\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_9, \"Classic\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 3,\n    id: \"Bingo\",\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Bingo\",\n    onChange: _cache[2] || (_cache[2] = function () {\n      return $options.onGameModeChange && $options.onGameModeChange(...arguments);\n    })\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_10, \"Bingo\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_11, [_hoisted_12, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.UsersInLobby, (item, count) => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"LobbyUsers\", {\n        active: $data.show === count\n      }]),\n      key: count,\n      onMouseover: $event => $data.show = count,\n      onMouseout: _cache[3] || (_cache[3] = $event => $data.show = false)\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(++count) + \". \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" \", 1\n    /* TEXT */\n    ), item.userID != this.UsersID && this.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n      key: 0,\n      id: \"Kick\",\n      onClick: $event => $options.kickPlayer(item.userID)\n    }, \"Kick\", 8\n    /* PROPS */\n    , _hoisted_14)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 42\n    /* CLASS, PROPS, HYDRATE_EVENTS */\n    , _hoisted_13);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_15, _hoisted_16]), _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-- Radio Buttons adapted from tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_18, [$props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_19, \"Choose length of round:\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 1,\n    id: \"twoMins\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"120\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[4] || (_cache[4] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_20, \"2 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 3,\n    id: \"fiveMins\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"300\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[5] || (_cache[5] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_21, \"5 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 5,\n    id: \"tenMins\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"600\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[6] || (_cache[6] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_22, \"10 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]), !$props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_23, \"Please wait for the lobby creator to choose the Game Mode and time\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_24, $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 3,\n    id: \"closeLobby\",\n    onClick: _cache[7] || (_cache[7] = function () {\n      return $options.closeLobby && $options.closeLobby(...arguments);\n    }),\n    type: \"button\"\n  }, \"Close Lobby\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 4,\n    id: \"invitePlayer\",\n    type: \"button\",\n    onClick: _cache[8] || (_cache[8] = function () {\n      return $options.openInvite && $options.openInvite(...arguments);\n    })\n  }, \"Invite Player\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.playerInvite ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {\n    name: \"fade\"\n  }, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.playerInvite ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", _hoisted_26, null, 512\n    /* NEED_PATCH */\n    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), $data.playerInvite ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_27, \"Username\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_28, $data.playerInvite ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 1,\n    id: \"playerInvite\",\n    onClick: _cache[9] || (_cache[9] = function () {\n      return $options.invitePlayer && $options.invitePlayer(...arguments);\n    })\n  }, \"Invite\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_29])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"beginGame\",\n    onClick: _cache[10] || (_cache[10] = function () {\n      return $options.multiGameInitiated && $options.multiGameInitiated(...arguments);\n    }),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"leaveGame\",\n    onClick: _cache[11] || (_cache[11] = function () {\n      return $options.leaveGame && $options.leaveGame(...arguments);\n    }),\n    type: \"button\"\n  }, \"Leave Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.MultiPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"Multiplayer-Game\",\n    key: _ctx.componentVersion\n  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_MultiPlayerGame, {\n    userMultiContinue: $props.userMultiContinue,\n    multiGameDetails: $props.multiGameDetails,\n    UsersID: $props.UsersID,\n    playersLobby: $props.playersLobby,\n    userProfile: $props.userProfile,\n    onClearMultiVariable: $options.ClearMultiVariable,\n    onPlayerReady: _ctx.playerReady,\n    onLeaveGame: $options.leaveGame,\n    onGameSetup: _ctx.gameSetup,\n    onEndGame: _ctx.endGame,\n    onExitToHomePageReset: $options.exitToHomePageReset,\n    isLobbyCreator: $props.isLobbyCreator,\n    UsersInLobby: $props.UsersInLobby,\n    GameMode: $data.GameMode,\n    startTime: $data.timer\n  }, null, 8\n  /* PROPS */\n  , [\"userMultiContinue\", \"multiGameDetails\", \"UsersID\", \"playersLobby\", \"userProfile\", \"onClearMultiVariable\", \"onPlayerReady\", \"onLeaveGame\", \"onGameSetup\", \"onEndGame\", \"onExitToHomePageReset\", \"isLobbyCreator\", \"UsersInLobby\", \"GameMode\", \"startTime\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = {\n  class: \"HelpText\"\n};\nconst _hoisted_3 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_4 = {\n  key: 1,\n  class: \"HelpText\"\n};\nconst _hoisted_5 = {\n  key: 2\n};\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_7 = {\n  class: \"timer\"\n};\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_9 = {\n  key: 0,\n  class: \"ClassicGameMode\"\n};\n\nconst _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_11 = {\n  key: 0,\n  class: \"CountryChart\"\n};\nconst _hoisted_12 = {\n  class: \"UserScore\"\n};\nconst _hoisted_13 = [\"src\"];\nconst _hoisted_14 = {\n  class: \"CountryText\"\n};\nconst _hoisted_15 = {\n  class: \"TinyText\"\n};\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = {\n  key: 1\n};\n\nconst _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"Guide\"\n}, \"Countries To Locate:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_19 = [\"src\"];\n\nconst _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"Guide\"\n}, \"Countries Located\", -1\n/* HOISTED */\n);\n\nconst _hoisted_21 = {\n  class: \"LocatedCountries\"\n};\nconst _hoisted_22 = [\"src\"];\nconst _hoisted_23 = {\n  key: 2,\n  class: \"BingoPlayers\"\n};\nconst _hoisted_24 = {\n  key: 3,\n  class: \"BingoPlayers\"\n};\n\nconst _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", {\n  class: \"GameUsers\"\n}, \"All players are ready\", -1\n/* HOISTED */\n);\n\nconst _hoisted_26 = [_hoisted_25];\nconst _hoisted_27 = {\n  key: 4\n};\nconst _hoisted_28 = {\n  key: 5\n};\nconst _hoisted_29 = {\n  class: \"CookieText\"\n};\nconst _hoisted_30 = {\n  key: 6,\n  class: \"ErrorText\"\n};\nconst _hoisted_31 = {\n  class: \"buttonBar\"\n};\nconst _hoisted_32 = {\n  key: 3\n};\n\nconst _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", {\n  class: \"GameOver\"\n}, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_34 = {\n  key: 0\n};\n\nconst _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You won! Congratulations\", -1\n/* HOISTED */\n);\n\nconst _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"trophy\",\n  src: \"staticimages/trophy-removebg-preview.png\",\n  alt: \"A picture of a trophy\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_37 = [_hoisted_35, _hoisted_36];\nconst _hoisted_38 = {\n  key: 1\n};\nconst _hoisted_39 = {\n  key: 2\n};\n\nconst _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_41 = {\n  key: 0,\n  class: \"CountryChart\"\n};\nconst _hoisted_42 = {\n  class: \"UserScore\"\n};\nconst _hoisted_43 = {\n  class: \"GameResults\"\n};\nconst _hoisted_44 = [\"src\"];\nconst _hoisted_45 = {\n  class: \"EndScreenText\"\n};\nconst _hoisted_46 = {\n  key: 3\n};\nconst _hoisted_47 = {\n  key: 0\n};\nconst _hoisted_48 = {\n  key: 4,\n  class: \"CategoryText\"\n};\nconst _hoisted_49 = {\n  key: 5,\n  class: \"CategoryChart\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_BaseTimer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"BaseTimer\");\n\n  const _component_PassiveModeChart = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"PassiveModeChart\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"MultiPlayer - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.GameMode) + \" \", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.displayInformation && $options.displayInformation(...arguments);\n    }),\n    class: \"InformationBox\"\n  }, \"i\")]), $data.InformationBox && $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ClassicInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.InformationBox && $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.BingoInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"- M Rybczonek, \\\"How to Create an Animated Countdown Timer With Vue\\\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BaseTimer, {\n    timeToGo: $options.timeLeft,\n    formattedTimeToGo: $options.formattedTimeLeft,\n    startTime: $props.startTime,\n    alertTime: 30\n  }, null, 8\n  /* PROPS */\n  , [\"timeToGo\", \"formattedTimeToGo\", \"startTime\"])]), _hoisted_8, $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_9, [_hoisted_10, $data.VisitedCountries.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.countryChartData,\n    options: $data.countryOptions,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item,\n      class: \"TrackedCountry\"\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count) + \" tracker(s) | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.multiplyer * item.count) + \" point(s)\", 1\n    /* TEXT */\n    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.site), 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_16])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_17, [_hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.countriesToFind, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"CountriesToFind\", {\n        found: item.found\n      }]),\n      ref_for: true,\n      ref: \"CountriesToFind\",\n      key: item\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + $options.shortenName(item.country) + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.country), 1\n    /* TEXT */\n    )], 2\n    /* CLASS */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", _hoisted_21, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCountries\",\n      class: \"BingoList\",\n      key: item\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_22), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.allPlayersReady ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.LobbyUsers, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"GameUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ready), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.allPlayersReady && !$data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_24, _hoisted_26)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.allPlayersReady && $data.gameStarted && $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.LobbyUsers, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"BingoScores\",\n      class: \"BingoScores\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.BingoCountries.length), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Classic' && $data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.LobbyUsers, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"GameUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_29, \"During this session, \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.numberOfCookies.numberOfCookies) + \" tracking cookies have been set on your device. If blocking is enabled, these are first-party cookies.\", 1\n  /* TEXT */\n  ), _ctx.playerLeaveMessage != 'false' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playerLeaveMessage), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_31, [$props.isLobbyCreator && !$data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 0,\n    id: \"Start\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.gameSetup && $options.gameSetup(...arguments);\n    }),\n    type: \"button\"\n  }, \"Start\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.allPlayersReady ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 1,\n    id: \"Ready\",\n    onClick: _cache[2] || (_cache[2] = function () {\n      return $options.playerReady && $options.playerReady(...arguments);\n    })\n  }, \"Ready Up\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Leave\",\n    onClick: _cache[3] || (_cache[3] = function () {\n      return $options.leaveGame && $options.leaveGame(...arguments);\n    }),\n    type: \"button\"\n  }, \"Leave Game\")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_32, [_hoisted_33, $data.didYouWin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_34, _hoisted_37)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.didYouWin && $data.WinningUser != undefined ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Condolences. The winner of the game was \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.WinningUser), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_39, [_hoisted_40, $data.VisitedCountries.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.countryChartData,\n    options: $data.countryOptions,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_43, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count) + \" tracker(s) | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.multiplyer * item.count) + \" point(s)\", 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.LobbyUsers, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"GameUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s) in total\", 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_46, [$data.WinningUser === undefined ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_47, \"Condlences, no players successfully found all the tracking nations!\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You managed to get tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountriesBingo) + \" of the bingo countries\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s) in total\", 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.categoryList.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_48, \"During your game, you were tracked when visiting the following categories of pages: \")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.categoryList.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.chartData,\n    options: $data.options,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.categoryList, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCategories\",\n      key: item.name,\n      class: \"CategoryList\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Home\",\n    onClick: _cache[4] || (_cache[4] = function () {\n      return $options.exitToHomePageReset && $options.exitToHomePageReset(...arguments);\n    }),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=template&id=613e0ae3":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=template&id=613e0ae3 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_7 = {\n  key: 1,\n  id: \"UsernamePage\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_UsernameChangeVue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"UsernameChangeVue\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.Options ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, _hoisted_3, _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"ChangeUser\",\n    class: \"OptionsButton\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.changeUsernamePage && $options.changeUsernamePage(...arguments);\n    }),\n    type: \"button\"\n  }, \"Change Username\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Pause\",\n    class: \"OptionsButton\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.pauseBlocking && $options.pauseBlocking(...arguments);\n    }),\n    type: \"button\"\n  }, \"Pause Tracker Blocking\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Logout\",\n    class: \"OptionsButton\",\n    onClick: _cache[2] || (_cache[2] = function () {\n      return $options.logout && $options.logout(...arguments);\n    }),\n    type: \"button\"\n  }, \"Logout\"), _hoisted_5, _hoisted_6])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.UsernamePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_UsernameChangeVue, {\n    UsersID: $props.UsersID,\n    onChangeUsername: _cache[3] || (_cache[3] = $event => $options.changeUsername($event)),\n    onBackToOptions: $options.backToOptions\n  }, null, 8\n  /* PROPS */\n  , [\"UsersID\", \"onBackToOptions\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"\\\"Passive Mode\\\" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.\", -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = {\n  class: \"Chart\"\n};\nconst _hoisted_5 = {\n  class: \"Stats\"\n};\nconst _hoisted_6 = {\n  class: \"Stats\"\n};\nconst _hoisted_7 = {\n  class: \"PassiveText\"\n};\nconst _hoisted_8 = {\n  class: \"PassiveText\"\n};\nconst _hoisted_9 = {\n  class: \"PassiveText\"\n};\n\nconst _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"PassiveText\"\n}, \"While browsing, you were tracked when visiting the following categories of pages: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_11 = {\n  class: \"CategoryChart\"\n};\nconst _hoisted_12 = {\n  class: \"CategoryList\"\n};\n\nconst _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"PassiveText\"\n}, \"To see a complete list of hosts and counts: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"PassiveText\"\n}, \"To see a complete list of countries and counts: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"PassiveText\"\n}, \"To view your achievements: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = {\n  key: 1\n};\nconst _hoisted_18 = {\n  key: 2\n};\nconst _hoisted_19 = {\n  key: 3\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_PassiveModeChart = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"PassiveModeChart\");\n\n  const _component_AchievementsView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"AchievementsView\");\n\n  const _component_HostsView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"HostsView\");\n\n  const _component_CountryView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"CountryView\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.PassivePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_4, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_PassiveModeChart, {\n    ref: \"PassiveModeChart\",\n    chartData: $data.chartData,\n    options: $data.options,\n    height: 20,\n    width: 200,\n    key: $props.totalRequests\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_5, \"Blocked Requests: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.passiveModeTotalTrackers), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_6, \"Total Requests: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.totalRequests), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_7, \"Since you installed TackerHunt, you have been tracked: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.passiveModeTotalTrackers) + \" times. This means that, whilst browsing, your browser submitted requests to \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.passiveModeTotalTrackers) + \" different tracking URLs\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_8, \"This was done by a total of \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.passiveModeUniqueHosts) + \" different entities.\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_9, \"These entities hailed from \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.passiveModeTotalCounties) + \" countries.\", 1\n  /* TEXT */\n  ), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"PassiveModeChart\",\n    chartData: $data.categoryChartData,\n    options: $data.options,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.passiveCategoryList, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCategories\",\n      key: item.name,\n      class: \"CategoryList\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Hosts\",\n    class: \"passiveButton\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.PassiveToHost && $options.PassiveToHost(...arguments);\n    })\n  }, \"PassiveMode Hosts\"), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Countries\",\n    class: \"passiveButton\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.PassiveToCountry && $options.PassiveToCountry(...arguments);\n    })\n  }, \"PassiveMode Countries\"), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Achievements\",\n    class: \"passiveButton\",\n    onClick: _cache[2] || (_cache[2] = function () {\n      return $options.achievementPage && $options.achievementPage(...arguments);\n    })\n  }, \"Achievements\"), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Home\",\n    class: \"passiveButton\",\n    onClick: _cache[3] || (_cache[3] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    })\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.AchievementPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AchievementsView, {\n    achievements: $data.achievements,\n    onBackToPassive: $options.backToPassive,\n    onExitToHomePage: $options.exitToHomePage\n  }, null, 8\n  /* PROPS */\n  , [\"achievements\", \"onBackToPassive\", \"onExitToHomePage\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.HostPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_HostsView, {\n    passiveModeHosts: $data.passiveModeHosts,\n    onExitToHomePage: $options.exitToHomePage,\n    onHostToPassive: $options.HostToPassive\n  }, null, 8\n  /* PROPS */\n  , [\"passiveModeHosts\", \"onExitToHomePage\", \"onHostToPassive\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.CountryPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CountryView, {\n    passiveCountryLabels: $data.passiveCountryLabels,\n    passiveCountryCounts: $data.passiveCountryCounts,\n    passiveModeCountries: $props.passiveModeCountries,\n    onExitToHomePage: $options.exitToHomePage,\n    onCountToPassive: $options.CountToPassive\n  }, null, 8\n  /* PROPS */\n  , [\"passiveCountryLabels\", \"passiveCountryCounts\", \"passiveModeCountries\", \"onExitToHomePage\", \"onCountToPassive\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_Doughnut = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"Doughnut\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Doughnut, {\n    chartData: $props.chartData,\n    options: $props.options,\n    width: 20,\n    height: 20\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"]);\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=template&id=74e00d50":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=template&id=74e00d50 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter a username for your account:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_8 = {\n  ref: \"nickname\",\n  type: \"text\"\n};\n\nconst _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, _hoisted_3, _hoisted_4, _hoisted_5, _hoisted_6, _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_8, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.setUsername && $options.setUsername(...arguments);\n    }),\n    type: \"button\"\n  }, \"Enter\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.usernameToIntro && $options.usernameToIntro(...arguments);\n    }),\n    type: \"button\"\n  }, \"Back\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SetUsername.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = {\n  class: \"HelpText\"\n};\nconst _hoisted_3 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_4 = {\n  key: 1,\n  class: \"HelpText\"\n};\nconst _hoisted_5 = {\n  key: 2\n};\nconst _hoisted_6 = {\n  class: \"timer\"\n};\nconst _hoisted_7 = {\n  key: 0,\n  class: \"ClassicGameMode\"\n};\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_9 = {\n  key: 0,\n  class: \"CountryChart\"\n};\nconst _hoisted_10 = {\n  class: \"UserScore\"\n};\nconst _hoisted_11 = [\"src\"];\nconst _hoisted_12 = {\n  class: \"CountryText\"\n};\nconst _hoisted_13 = {\n  class: \"TinyText\"\n};\nconst _hoisted_14 = {\n  class: \"CookieText\"\n};\n\nconst _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_16 = {\n  key: 1\n};\n\nconst _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"Guide\"\n}, \"Countries To Locate:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_18 = [\"src\"];\n\nconst _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"Guide\"\n}, \"Countries Located\", -1\n/* HOISTED */\n);\n\nconst _hoisted_20 = [\"src\"];\nconst _hoisted_21 = {\n  class: \"buttonBar\"\n};\nconst _hoisted_22 = {\n  key: 3\n};\n\nconst _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", {\n  class: \"GameOver\"\n}, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_24 = {\n  key: 0\n};\n\nconst _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_26 = {\n  key: 0,\n  class: \"CountryChart\"\n};\nconst _hoisted_27 = {\n  class: \"UserScore\"\n};\nconst _hoisted_28 = [\"src\"];\nconst _hoisted_29 = {\n  class: \"EndScreenText\"\n};\nconst _hoisted_30 = {\n  key: 1\n};\nconst _hoisted_31 = {\n  key: 0\n};\nconst _hoisted_32 = {\n  key: 1,\n  class: \"GameOverText\"\n};\nconst _hoisted_33 = {\n  class: \"CategoryText\"\n};\nconst _hoisted_34 = {\n  key: 2,\n  class: \"CategoryText\"\n};\nconst _hoisted_35 = {\n  key: 3,\n  class: \"CategoryChart\"\n};\n\nconst _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_BaseTimer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"BaseTimer\");\n\n  const _component_PassiveModeChart = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"PassiveModeChart\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Solo Mode - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.GameMode), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.displayInformation && $options.displayInformation(...arguments);\n    }),\n    class: \"InformationBox\",\n    id: \"Info\"\n  }, \"i\")]), $data.InformationBox && $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ClassicInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.InformationBox && $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.BingoInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-- M Rybczonek, \\\"How to Create an Animated Countdown Timer With Vue\\\", Medium.com, Available at: https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f, Accessed 02/08/2022\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BaseTimer, {\n    id: \"BaseTimer\",\n    timeToGo: $options.timeLeft,\n    formattedTimeToGo: $options.formattedTimeLeft,\n    startTime: $props.startTime,\n    alertTime: 30\n  }, null, 8\n  /* PROPS */\n  , [\"timeToGo\", \"formattedTimeToGo\", \"startTime\"])]), $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_7, [_hoisted_8, $data.VisitedCountries.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.countryChartData,\n    options: $data.countryOptions,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_11), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count) + \" tracker(s) | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.multiplyer * item.count) + \" point(s)\", 1\n    /* TEXT */\n    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.site), 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_14, \"During this session, \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.numberOfCookies.numberOfCookies) + \" tracking cookies have been set on your device. If blocking is enabled, these are first-party cookies.\", 1\n  /* TEXT */\n  ), _hoisted_15])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.countriesToFind, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"CountriesToFind\", {\n        found: item.found\n      }]),\n      ref_for: true,\n      ref: \"CountriesToFind\",\n      key: item\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + $options.shortenName(item.country) + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.country), 1\n    /* TEXT */\n    )], 2\n    /* CLASS */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCountries\",\n      class: \"BingoList\",\n      key: item\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_21, [!$data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 0,\n    class: \"StartSoloGame\",\n    id: \"StartSoloGame\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.gameSetup && $options.gameSetup(...arguments);\n    }),\n    type: \"button\"\n  }, \"Start\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"EndGameButton\",\n    onClick: _cache[2] || (_cache[2] = $event => $options.endGame()),\n    type: \"button\"\n  }, \"End Game\")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_22, [_hoisted_23, $props.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_24, [_hoisted_25, $options.orderedCountries != [] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.countryChartData,\n    options: $data.countryOptions,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.orderedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n      class: \"CountryFlag\",\n      src: './staticimages/CountryFlags/' + item.shortname + '.jpeg'\n    }, null, 8\n    /* PROPS */\n    , _hoisted_28), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count) + \" tracker(s) | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.multiplyer * item.count) + \" point(s)\", 1\n    /* TEXT */\n    )]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $props.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_30, [$data.finishedGame ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_31, \"Well done! You managed to find all of the tracking nations!\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.finishedGame ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_32, \"Unfortunately, you did not manage to find the tracking nations in the given time period.\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_33, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.VisitedCountries.length) + \" nation(s)\", 1\n  /* TEXT */\n  ), $data.APIEnabled ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_34, \"During your game, you were tracked when visiting the following categories of pages: \")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.categoryList.length != 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PassiveModeChart, {\n    ref: \"CategoryChart\",\n    chartData: $data.chartData,\n    options: $data.options,\n    height: 20,\n    width: 200\n  }, null, 8\n  /* PROPS */\n  , [\"chartData\", \"options\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_36, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.categoryList, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCategories\",\n      key: item.name,\n      class: \"CategoryList\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Home\",\n    onClick: _cache[3] || (_cache[3] = function () {\n      return $options.exitToHomePageReset && $options.exitToHomePageReset(...arguments);\n    }),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=template&id=08932eb7":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=template&id=08932eb7 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0\n};\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Solo Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_5 = {\n  key: 1,\n  class: \"HelpText\"\n};\nconst _hoisted_6 = {\n  class: \"HelpText\"\n};\n\nconst _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Choose Game Mode:\");\n\nconst _hoisted_8 = {\n  class: \"RadioButtons\"\n};\n\nconst _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  for: \"Classic\"\n}, \"Classic\", -1\n/* HOISTED */\n);\n\nconst _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  id: \"BingoTest\",\n  for: \"Bingo\"\n}, \"Bingo\", -1\n/* HOISTED */\n);\n\nconst _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  id: \"LeaderBoard\"\n}, \"Previous Classic Scores:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  class: \"HelpText\"\n}, \"Choose Round Length:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_14 = {\n  class: \"RadioButtons\"\n};\n\nconst _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  for: \"twoMin\"\n}, \"2 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  id: \"fiveMinTest\",\n  for: \"fiveMin\"\n}, \"5 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n  for: \"tenMin\"\n}, \"10 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_19 = {\n  key: 1,\n  id: \"Solo-Mode\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_SoloGamePage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"SoloGamePage\");\n\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$data.SoloPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, _hoisted_3, $data.InformationBox ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ClassicInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.InformationBox ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.BingoInfo), 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", _hoisted_6, [_hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.displayInformation && $options.displayInformation(...arguments);\n    }),\n    class: \"InformationBox\",\n    id: \"Info\"\n  }, \"i\")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-- Radio Buttons adapted from tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    id: \"Classic\",\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Classic\",\n    onChange: _cache[1] || (_cache[1] = function () {\n      return $options.onGameModeChange && $options.onGameModeChange(...arguments);\n    })\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    id: \"Bingo\",\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Bingo\",\n    onChange: _cache[2] || (_cache[2] = function () {\n      return $options.onGameModeChange && $options.onGameModeChange(...arguments);\n    })\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  ), _hoisted_10]), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.personalSoloHS, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item,\n      class: \"LeaderBoard\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.username) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.Score) + \" | \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.createdAt), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-- Radio Buttons adapted from tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022\"), _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    id: \"twoMin\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"120\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[3] || (_cache[3] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    id: \"fiveMin\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"300\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[4] || (_cache[4] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    id: \"tenMin\",\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"600\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[5] || (_cache[5] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_17]), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    class: \"BeginGame\",\n    onClick: _cache[6] || (_cache[6] = function () {\n      return $options.soloGameInitiated && $options.soloGameInitiated(...arguments);\n    }),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Exit\",\n    onClick: _cache[7] || (_cache[7] = function () {\n      return $options.exitToHomePage && $options.exitToHomePage(...arguments);\n    }),\n    type: \"button\"\n  }, \"Cancel\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _ctx.SoloGame ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SoloGamePage, {\n    userSoloContinue: $props.userSoloContinue,\n    userProfile: $props.userProfile,\n    GameMode: $data.gameMode,\n    gameOver: false,\n    startTime: $data.timer,\n    onExitToHomePageReset: $options.exitToHomePageReset,\n    onResetSoloStatus: $options.resetSoloStatus\n  }, null, 8\n  /* PROPS */\n  , [\"userSoloContinue\", \"userProfile\", \"GameMode\", \"startTime\", \"onExitToHomePageReset\", \"onResetSoloStatus\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloLobby.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackerHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackerHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter a new username:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_8 = {\n  ref: \"NewUsername\",\n  type: \"text\"\n};\n\nconst _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [_hoisted_1, _hoisted_2, _hoisted_3, _hoisted_4, _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your current username is: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.UsersID), 1\n  /* TEXT */\n  ), _hoisted_6, _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_8, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Save\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.changeUsername && $options.changeUsername(...arguments);\n    }),\n    type: \"button\"\n  }, \"Save\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    id: \"Back\",\n    onClick: _cache[1] || (_cache[1] = function () {\n      return $options.backToOptions && $options.backToOptions(...arguments);\n    }),\n    type: \"button\"\n  }, \"Back\")], 64\n  /* STABLE_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/UsernameChange.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6 ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0,\n  id: \"Intro-Page\",\n  ref: \"Intro-Page\"\n};\nconst _hoisted_2 = {\n  key: 1,\n  id: \"SetUsername\"\n};\nconst _hoisted_3 = {\n  key: 2,\n  id: \"Home-Page\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"app\",\n    key: _ctx.componentVersion\n  }, [$data.IntroPageView ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup[\"IntroPage\"], {\n    onUserLogin: _cache[0] || (_cache[0] = $event => $options.googleLogin($event))\n  })], 512\n  /* NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.UsernamePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup[\"SetUsername\"], {\n    onSetUsername: $options.setUsername,\n    onUsernameToIntro: $options.usernameToIntro\n  }, null, 8\n  /* PROPS */\n  , [\"onSetUsername\", \"onUsernameToIntro\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.HomePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup[\"HomePageView\"], {\n    onHomepage: _ctx.Homepage,\n    onChangeUsername: _cache[1] || (_cache[1] = $event => $options.changeUsername($event)),\n    onClearMultiVariable: $options.ClearMultiVariable,\n    onLogout: $options.logout,\n    onResetSoloStatus: $options.resetSoloStatus,\n    gamesPlayed: $data.gamesPlayed,\n    gamesWon: $data.gamesWon,\n    UsersID: $data.UsersID,\n    userProfile: $data.userProfile,\n    UserGoogleID: $data.UserGoogleID,\n    userSoloContinue: $data.userSoloContinue,\n    userMultiContinue: $data.userMultiContinue,\n    multiGameDetails: $data.multiGameDetails\n  }, null, 8\n  /* PROPS */\n  , [\"onHomepage\", \"onClearMultiVariable\", \"onLogout\", \"onResetSoloStatus\", \"gamesPlayed\", \"gamesWon\", \"UsersID\", \"userProfile\", \"UserGoogleID\", \"userSoloContinue\", \"userMultiContinue\", \"multiGameDetails\"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]);\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/popup/main.js":
/*!***************************!*\
  !*** ./src/popup/main.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-vue */ \"./node_modules/@auth0/auth0-vue/dist/auth0-vue.production.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue */ \"./src/popup/App.vue\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-socket.io */ \"./node_modules/vue-socket.io/dist/vue-socketio.js\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_socket_io__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n //Vue.use(new VueSocketIO({\n//\tdebug: true,\n//\tconnection: SocketIO('http://localhost:3080', {})\n//}))\n\nconst optionsVueIO = {\n  debug: true,\n  //connection: SocketIO('http://138.68.132.17:3080/')\n  //connection: SocketIO('http://localhost:3080')\n  connection: socket_io_client__WEBPACK_IMPORTED_MODULE_4___default()('http://44.203.94.188:3080')\n};\nconst app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]).use(new (vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default())(optionsVueIO)).use((0,_auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__.createAuth0)({\n  domain: \"dev-li-9809u.eu.auth0.com\",\n  client_id: \"s449g7DqINXUA9dZNRPdVTwPswnMX9qJ\",\n  redirect_uri: window.location.origin\n}));\napp.mount('#app');\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nli.Achievements{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n}\\np.HelpText {\\n  font-size: 9px;\\n  color: lightgrey;\\n}\\n/* Ensures that any achieved achievements are coloured green */\\n.achieved {\\n    color: #20C20E;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\ndiv.CountryChart {\\n    height: 100px;\\n    width: 100px;\\n    margin-left: 55px;\\n}\\nimg.CountryFlag {\\n    width: 15px;\\n    height: 10px;\\n    float: left;\\n    margin-right: 10px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nh5 {\\n    margin-top: 2px;\\n    margin-bottom: 2px;\\n}\\nbutton.loginButton {\\n    width: 80%;\\n}\\nbutton.DevLogin {\\n    width: 80%;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nlabel.Guide {\\n    font-size: 12px;\\n    color: lightgray;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\np.WinLoss {\\n    margin-right: 30px;\\n    color: lightgray;\\n    font-size: 11px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\ndiv.Players {\\n    margin-top: 40px;\\n}\\ninput.textBox {\\n    width: 100px;\\n}\\nlabel.HelpText {\\n    color: lightgrey;\\n    font-size: 10px;\\n}\\nli:hover {\\n    color: red;\\n}\\nli.active {\\n    color: red;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nimg.trophy {\\n    width: 150px;\\n    height: 150px;\\n}\\np.UserScore {\\n    font-family: 'digitalFont';\\n    font-size: 25px;\\n    color: #20C20E;\\n    text-align: center;\\n    left: 85px;\\n}\\nol.BingoPlayers {\\n    margin-right: 30px;\\n}\\nol.LocatedCountries {\\n    margin-right: 30px;\\n}\\nli.GameUsers {\\n    font-family: 'digitalFont';\\n    font-size: 12px;\\n    color: #20C20E;\\n    list-style: none;\\n}\\nli.BingoList {\\n    font-size: 12px;\\n    list-style: none;\\n}\\nli.TrackedCountry {\\n    list-style: none;\\n}\\nli.CountriesToFind {\\n    list-style: none;\\n    align-items: center;\\n    margin-right: 30px;\\n}\\nli.BingoScores {\\n    list-style: none; \\n    font-family: 'digitalFont';\\n    font-size: 15px;\\n    color: #20C20E;\\n    margin-right: 20px;\\n}\\ndiv.buttonBar {\\n    position: sticky;\\n    width: 100%;\\n    bottom: 0;\\n}\\ndiv.ReadyArea {\\n    width: 100%;\\n    margin-right: 10px;\\n}\\nimg.CountryFlag {\\n    width: 15px;\\n    height: 10px;\\n    float: left;\\n    margin-right: 10px;\\n}\\nlabel.Guide {\\n    font-size: 12px;\\n    color: lightgrey;\\n}\\ndiv.timer {\\n    margin-left: 20px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nbutton.OptionsButton {\\n    width: 70%;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\np.PassiveText{\\n  color: white;\\n  font-size: 12px;\\n  text-align: justify;\\n  display: flex;\\n}\\nol.CategoryList {\\n    margin-right: 35px;\\n}\\nbutton.passiveButton {\\n    width: 80%;\\n    font-weight: bold;\\n    font-size: 11px;\\n}\\np.Stats {\\n    font-family: 'digitalFont';\\n    color: #20C20E;\\n    font-size: 20px;\\n}\\np.HelpText {\\n    font-size: 9x;\\n    color: lightgray;\\n}\\ndiv.Chart {\\n    width: 130px;\\n    height: 130px;\\n    align-self: center;\\n    align-items: center;\\n    margin-left: 35px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\nDoughnut {\\n    width: 20px;\\n    height: 10px;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\ndiv.timer {\\n    margin-right: 0px;\\n    margin-left: 18px;\\n}\\ndiv.CategoryChart {\\n    height: 100px;\\n    width: 100px;\\n    margin-left: 55px;\\n    position: relative;\\n    top: 100;\\n}\\np.UserScore {\\n    font-family: 'digitalFont';\\n    font-size: 30px;\\n    color: #20C20E;\\n    position: absolute;\\n    text-align: center;\\n    margin-left: 30px;\\n}\\ndiv.buttonBar {\\n    position: sticky;\\n    width: 100%;\\n    bottom: 0;\\n}\\nimg.CountryFlag {\\n    width: 15px;\\n    height: 10px;\\n    float: left;\\n    margin-right: 10px;\\n    margin-top: 5px;\\n}\\nlabel.Guide {\\n    font-size: 12px;\\n    color: lightgrey;\\n}\\nli.CountriesToFind {\\n    list-style: none;\\n    align-items: center;\\n    margin-right: 30px;\\n    font-size: 15px;\\n    max-width: 80%;\\n}\\nli.BingoList {\\n    margin-right: 30px;\\n    font-size: 12px;\\n    color: lightgray;\\n    align-items: left;\\n    font-style: italic;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/digital-7.ttf */ \"./src/popup/fonts/digital-7.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\n/* The below font styling is adapted from the styling from Cormac Muir's project */\\n/* C. Muir, ‘A Distributed Game Using Ad Trackers In Web Browsers’, Dissertation, University Of Glasgow, Glasgow, 2022. */\\n@font-face {\\n    font-family: 'digitalFont';\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n}\\nli{\\n  color: white;\\n}\\nli.TrackedCountry{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n}\\n.found {\\n  color: green;\\n}\\n.timerClose {\\n  color: red;\\n}\\nli.LobbyUsers{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n  font-style: italic;\\n}\\np{\\n  color: white;\\n}\\np.TinyText{\\n  color: white;\\n  font-size: 7px;\\n  font-style: italic;\\n}\\np.CountryText {\\n  color: white;\\n  font-size: 11.5px;\\n}\\np.CookieText {\\n  font-size: 10px;\\n}\\np.CategoryText {\\n  font-size: 12px;\\n}\\np.EndScreenText {\\n  font-size: 10px;\\n}\\n#timer {\\n  color: white;\\n}\\n#timerClose {\\n  color: red;\\n}\\n.timerClose {\\n  color: red;\\n}\\nlabel {\\n  color: white;\\n}\\nh5{\\n  color: white;\\n}\\ndiv {\\n  text-align: center;\\n}\\ndiv.GameResults {\\n  width: 100%;\\n}\\ndiv.TimerSection {\\n  align-self: center;\\n}\\ndiv.ClassicGameMode {\\n  height: 380px;\\n  width: 100%;\\n  max-height: 380px;\\n  display: inline-block;\\n}\\ndiv.EndScreenText {\\n  display: flex;\\n  min-height: 300px;\\n}\\n\\n/* Style below adapted from this tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */\\ndiv.RadioButtons{\\n  width: 200px;\\n  height: 30px;\\n}\\n/* Style below adapted from this tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */\\ndiv.RadioButtons input[type=\\\"radio\\\"] {\\n  opacity: 0.011;\\n  position: fixed;\\n  width: 0;\\n}\\n/* Style below adapted from this tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */\\ndiv.RadioButtons input[type=\\\"radio\\\"]:checked + label {\\n  background: #20C20E;\\n  border-radius: 4px;\\n}\\n/* Style below adapted from this tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */\\ndiv.RadioButtons label {\\n  display: inline-block;\\n  padding: 1px 1px;\\n  font-family: sans-serif;\\n  font-size: 15px;\\n  border: 1px solid gray;\\n  border-radius: 4px;\\n  margin-right: 5px;\\n}\\n/* Style below adapted from this tutorial: M Heath, \\\"Customize Radio Button with CSS\\\", markheath.net, Available at: https://markheath.net/post/customize-radio-button-css, Accessed 02/08/2022 */\\ndiv.RadioButtons input[type=\\\"radio\\\"]:focus + label {\\n  border: 2px  #444\\n}\\nbutton {\\n  border-radius: 4px;\\n  border: 1px solid black;\\n}\\nbutton.homepageButton {\\n   width: 45%;\\n  font-size: 11px;\\n}\\nbutton:hover {\\n  background-color: darkgreen\\n}\\nbutton.InformationBox {\\n  background-color: #181818;\\n  border: 1px solid lightgray;\\n  font-size: 9px;\\n}\\nbutton.InformationBox:hover {\\n  background-color: #20C20E;\\n}\\nBaseTimer {\\n  align-self: center;\\n}\\nbody {\\n  min-height: 300px;\\n  min-width: 200px;\\n  background-color: #181818;\\n  transition: color 5s, background-color 0.5s;\\n  line-height: 1.6;\\n  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,\\n    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\\n  font-size: 15px;\\n  text-rendering: optimizeLegibility;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\np.HelpText {\\n  font-size: 9px;\\n  color: lightgrey;\\n}\\np.ErrorText {\\n  font-size: 9px;\\n  color: red;\\n}\\nli.PlayerList {\\n  text-align: left;\\n  font-style: italic;\\n  font-size: 10px;\\n}\\nli.LeaderBoard {\\n  text-align: left;\\n  font-style: italic;\\n  font-size: x-small;\\n  margin-left: none;\\n}\\nli.CategoryList {\\n  font-size: 10px;\\n  list-style: none;\\n  font-style: italic;\\n}\\nh2 {\\n  font-family: 'digitalFont';\\n  font-size: 40px;\\n  color: #20C20E;\\n  margin-top: 0px;\\n  margin-bottom: 0px;\\n}\\nh2.GameOver {\\n  font-size: 30px;\\n}\\nimg.main-logo {\\n  width: 200px;\\n  height: 150px;\\n}\\nbutton {\\n  background-color: #20C20E;\\n  color: white;\\n  text-align: center;\\n  margin-left: 5px;\\n  padding-right: 5px;\\n  font-weight: bold;\\n}\\n#app {\\n  max-width: 1280px;\\n  margin: 0 auto;\\n  padding: 0.5rem;\\n\\n  font-weight: normal;\\n}\\nheader {\\n  line-height: 1.5;\\n}\\n.logo {\\n  display: block;\\n  margin: 0 auto 2rem;\\n}\\na,\\n.green {\\n  text-decoration: none;\\n  color: hsla(160, 100%, 37%, 1);\\n  transition: 0.4s;\\n}\\n@media (hover: hover) {\\na:hover {\\n    background-color: hsla(160, 100%, 37%, 0.2);\\n}\\n}\\n@media (min-width: 1024px) {\\nbody {\\n    display: flex;\\n    place-items: center;\\n}\\n#app {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    padding: 0 2rem;\\n}\\nheader {\\n    display: flex;\\n    place-items: center;\\n    padding-right: calc(var(--section-gap) / 2);\\n}\\nheader .wrapper {\\n    display: flex;\\n    place-items: flex-start;\\n    flex-wrap: wrap;\\n}\\n.logo {\\n    margin: 0 2rem 0 0;\\n}\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".base-timer[data-v-69efee18] {\\n  position: relative;\\n  margin-left: 45px;\\n  width: 75px;\\n  height: 75px;\\n}\\n.base-timer__circle[data-v-69efee18] {\\n  fill: none;\\n  stroke: none;\\n}\\n.base-timer__path-elapsed[data-v-69efee18] {\\n  stroke-width: 7px;\\n  stroke: grey;\\n}\\n.base-timer__label[data-v-69efee18] {\\n  position: absolute;\\n  width: 75px;\\n  height: 75px;\\n  top: 0;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: 18px;\\n  color: white;\\n}\\n.base-timer__path-remaining[data-v-69efee18] {\\n  stroke-width: 6px;\\n  stroke-linecap: round;\\n  transform: rotate(90deg);\\n  transform-origin: center;\\n  transition: 1s linear all;\\n}\\n.base-timer__path-remaining.green[data-v-69efee18] {\\n  color: #20C20E;\\n  stroke: #20C20E;\\n}\\n.base-timer__path-remaining.red[data-v-69efee18] {\\n  color: red;\\n  stroke: red;\\n}\\n.base-timer__svg[data-v-69efee18] {\\n  transform: scaleX(-1);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use%5B2%5D!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/components/AchievementsView.vue":
/*!*********************************************!*\
  !*** ./src/components/AchievementsView.vue ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AchievementsView_vue_vue_type_template_id_615280ce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AchievementsView.vue?vue&type=template&id=615280ce */ \"./src/components/AchievementsView.vue?vue&type=template&id=615280ce\");\n/* harmony import */ var _AchievementsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AchievementsView.vue?vue&type=script&lang=js */ \"./src/components/AchievementsView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css */ \"./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_AchievementsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_AchievementsView_vue_vue_type_template_id_615280ce__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/AchievementsView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?");

/***/ }),

/***/ "./src/components/BaseTimer.vue":
/*!**************************************!*\
  !*** ./src/components/BaseTimer.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _BaseTimer_vue_vue_type_template_id_69efee18_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTimer.vue?vue&type=template&id=69efee18&scoped=true */ \"./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true\");\n/* harmony import */ var _BaseTimer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseTimer.vue?vue&type=script&lang=js */ \"./src/components/BaseTimer.vue?vue&type=script&lang=js\");\n/* harmony import */ var _BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss */ \"./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_BaseTimer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_BaseTimer_vue_vue_type_template_id_69efee18_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',\"data-v-69efee18\"],['__file',\"src/components/BaseTimer.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?");

/***/ }),

/***/ "./src/components/CountryView.vue":
/*!****************************************!*\
  !*** ./src/components/CountryView.vue ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CountryView_vue_vue_type_template_id_dd6b384a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountryView.vue?vue&type=template&id=dd6b384a */ \"./src/components/CountryView.vue?vue&type=template&id=dd6b384a\");\n/* harmony import */ var _CountryView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountryView.vue?vue&type=script&lang=js */ \"./src/components/CountryView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css */ \"./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_CountryView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_CountryView_vue_vue_type_template_id_dd6b384a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/CountryView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?");

/***/ }),

/***/ "./src/components/HomePageView.vue":
/*!*****************************************!*\
  !*** ./src/components/HomePageView.vue ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HomePageView_vue_vue_type_template_id_1c0eae83__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomePageView.vue?vue&type=template&id=1c0eae83 */ \"./src/components/HomePageView.vue?vue&type=template&id=1c0eae83\");\n/* harmony import */ var _HomePageView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomePageView.vue?vue&type=script&lang=js */ \"./src/components/HomePageView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_HomePageView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_HomePageView_vue_vue_type_template_id_1c0eae83__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/HomePageView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HomePageView.vue?");

/***/ }),

/***/ "./src/components/HostsView.vue":
/*!**************************************!*\
  !*** ./src/components/HostsView.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _HostsView_vue_vue_type_template_id_ed40fde0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HostsView.vue?vue&type=template&id=ed40fde0 */ \"./src/components/HostsView.vue?vue&type=template&id=ed40fde0\");\n/* harmony import */ var _HostsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HostsView.vue?vue&type=script&lang=js */ \"./src/components/HostsView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_HostsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_HostsView_vue_vue_type_template_id_ed40fde0__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/HostsView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HostsView.vue?");

/***/ }),

/***/ "./src/components/IntroPage.vue":
/*!**************************************!*\
  !*** ./src/components/IntroPage.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _IntroPage_vue_vue_type_template_id_9137ccca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IntroPage.vue?vue&type=template&id=9137ccca */ \"./src/components/IntroPage.vue?vue&type=template&id=9137ccca\");\n/* harmony import */ var _IntroPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IntroPage.vue?vue&type=script&lang=js */ \"./src/components/IntroPage.vue?vue&type=script&lang=js\");\n/* harmony import */ var _IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css */ \"./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_IntroPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_IntroPage_vue_vue_type_template_id_9137ccca__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/IntroPage.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?");

/***/ }),

/***/ "./src/components/JoinLobby.vue":
/*!**************************************!*\
  !*** ./src/components/JoinLobby.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _JoinLobby_vue_vue_type_template_id_19ff2a68__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JoinLobby.vue?vue&type=template&id=19ff2a68 */ \"./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68\");\n/* harmony import */ var _JoinLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JoinLobby.vue?vue&type=script&lang=js */ \"./src/components/JoinLobby.vue?vue&type=script&lang=js\");\n/* harmony import */ var _JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css */ \"./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_JoinLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_JoinLobby_vue_vue_type_template_id_19ff2a68__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/JoinLobby.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?");

/***/ }),

/***/ "./src/components/LeaderBoard.vue":
/*!****************************************!*\
  !*** ./src/components/LeaderBoard.vue ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _LeaderBoard_vue_vue_type_template_id_12028246__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LeaderBoard.vue?vue&type=template&id=12028246 */ \"./src/components/LeaderBoard.vue?vue&type=template&id=12028246\");\n/* harmony import */ var _LeaderBoard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaderBoard.vue?vue&type=script&lang=js */ \"./src/components/LeaderBoard.vue?vue&type=script&lang=js\");\n/* harmony import */ var _LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css */ \"./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_LeaderBoard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_LeaderBoard_vue_vue_type_template_id_12028246__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/LeaderBoard.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?");

/***/ }),

/***/ "./src/components/LobbyView.vue":
/*!**************************************!*\
  !*** ./src/components/LobbyView.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _LobbyView_vue_vue_type_template_id_a6a73bca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LobbyView.vue?vue&type=template&id=a6a73bca */ \"./src/components/LobbyView.vue?vue&type=template&id=a6a73bca\");\n/* harmony import */ var _LobbyView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LobbyView.vue?vue&type=script&lang=js */ \"./src/components/LobbyView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css */ \"./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_LobbyView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_LobbyView_vue_vue_type_template_id_a6a73bca__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/LobbyView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?");

/***/ }),

/***/ "./src/components/MultiPlayerGame.vue":
/*!********************************************!*\
  !*** ./src/components/MultiPlayerGame.vue ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MultiPlayerGame_vue_vue_type_template_id_0ee736e8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MultiPlayerGame.vue?vue&type=template&id=0ee736e8 */ \"./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8\");\n/* harmony import */ var _MultiPlayerGame_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MultiPlayerGame.vue?vue&type=script&lang=js */ \"./src/components/MultiPlayerGame.vue?vue&type=script&lang=js\");\n/* harmony import */ var _MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css */ \"./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_MultiPlayerGame_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_MultiPlayerGame_vue_vue_type_template_id_0ee736e8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/MultiPlayerGame.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?");

/***/ }),

/***/ "./src/components/OptionsView.vue":
/*!****************************************!*\
  !*** ./src/components/OptionsView.vue ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _OptionsView_vue_vue_type_template_id_613e0ae3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionsView.vue?vue&type=template&id=613e0ae3 */ \"./src/components/OptionsView.vue?vue&type=template&id=613e0ae3\");\n/* harmony import */ var _OptionsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptionsView.vue?vue&type=script&lang=js */ \"./src/components/OptionsView.vue?vue&type=script&lang=js\");\n/* harmony import */ var _OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css */ \"./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_OptionsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_OptionsView_vue_vue_type_template_id_613e0ae3__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/OptionsView.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?");

/***/ }),

/***/ "./src/components/PassiveMode.vue":
/*!****************************************!*\
  !*** ./src/components/PassiveMode.vue ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PassiveMode_vue_vue_type_template_id_7a81aa6a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassiveMode.vue?vue&type=template&id=7a81aa6a */ \"./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a\");\n/* harmony import */ var _PassiveMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassiveMode.vue?vue&type=script&lang=js */ \"./src/components/PassiveMode.vue?vue&type=script&lang=js\");\n/* harmony import */ var _PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css */ \"./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_PassiveMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_PassiveMode_vue_vue_type_template_id_7a81aa6a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/PassiveMode.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?");

/***/ }),

/***/ "./src/components/PassiveModeChart.vue":
/*!*********************************************!*\
  !*** ./src/components/PassiveModeChart.vue ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PassiveModeChart_vue_vue_type_template_id_30d2a6c4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassiveModeChart.vue?vue&type=template&id=30d2a6c4 */ \"./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4\");\n/* harmony import */ var _PassiveModeChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassiveModeChart.vue?vue&type=script&lang=js */ \"./src/components/PassiveModeChart.vue?vue&type=script&lang=js\");\n/* harmony import */ var _PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css */ \"./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_PassiveModeChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_PassiveModeChart_vue_vue_type_template_id_30d2a6c4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/PassiveModeChart.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?");

/***/ }),

/***/ "./src/components/SetUsername.vue":
/*!****************************************!*\
  !*** ./src/components/SetUsername.vue ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SetUsername_vue_vue_type_template_id_74e00d50__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetUsername.vue?vue&type=template&id=74e00d50 */ \"./src/components/SetUsername.vue?vue&type=template&id=74e00d50\");\n/* harmony import */ var _SetUsername_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetUsername.vue?vue&type=script&lang=js */ \"./src/components/SetUsername.vue?vue&type=script&lang=js\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_SetUsername_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_SetUsername_vue_vue_type_template_id_74e00d50__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/SetUsername.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SetUsername.vue?");

/***/ }),

/***/ "./src/components/SoloGamePage.vue":
/*!*****************************************!*\
  !*** ./src/components/SoloGamePage.vue ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SoloGamePage_vue_vue_type_template_id_c5feb060__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SoloGamePage.vue?vue&type=template&id=c5feb060 */ \"./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060\");\n/* harmony import */ var _SoloGamePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SoloGamePage.vue?vue&type=script&lang=js */ \"./src/components/SoloGamePage.vue?vue&type=script&lang=js\");\n/* harmony import */ var _SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css */ \"./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_SoloGamePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_SoloGamePage_vue_vue_type_template_id_c5feb060__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/SoloGamePage.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?");

/***/ }),

/***/ "./src/components/SoloLobby.vue":
/*!**************************************!*\
  !*** ./src/components/SoloLobby.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SoloLobby_vue_vue_type_template_id_08932eb7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SoloLobby.vue?vue&type=template&id=08932eb7 */ \"./src/components/SoloLobby.vue?vue&type=template&id=08932eb7\");\n/* harmony import */ var _SoloLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SoloLobby.vue?vue&type=script&lang=js */ \"./src/components/SoloLobby.vue?vue&type=script&lang=js\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_SoloLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_SoloLobby_vue_vue_type_template_id_08932eb7__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/SoloLobby.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloLobby.vue?");

/***/ }),

/***/ "./src/components/UsernameChange.vue":
/*!*******************************************!*\
  !*** ./src/components/UsernameChange.vue ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UsernameChange_vue_vue_type_template_id_2c6bc954__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsernameChange.vue?vue&type=template&id=2c6bc954 */ \"./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954\");\n/* harmony import */ var _UsernameChange_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsernameChange.vue?vue&type=script&lang=js */ \"./src/components/UsernameChange.vue?vue&type=script&lang=js\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_UsernameChange_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_UsernameChange_vue_vue_type_template_id_2c6bc954__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/components/UsernameChange.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/components/UsernameChange.vue?");

/***/ }),

/***/ "./src/popup/App.vue":
/*!***************************!*\
  !*** ./src/popup/App.vue ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=3a0a60d6 */ \"./src/popup/App.vue?vue&type=template&id=3a0a60d6\");\n/* harmony import */ var _App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&setup=true&lang=js */ \"./src/popup/App.vue?vue&type=script&setup=true&lang=js\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/popup/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/components/AchievementsView.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./src/components/AchievementsView.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AchievementsView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?");

/***/ }),

/***/ "./src/components/BaseTimer.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/BaseTimer.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseTimer.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?");

/***/ }),

/***/ "./src/components/CountryView.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/CountryView.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CountryView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?");

/***/ }),

/***/ "./src/components/HomePageView.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./src/components/HomePageView.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomePageView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomePageView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomePageView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/HomePageView.vue?");

/***/ }),

/***/ "./src/components/HostsView.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/HostsView.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HostsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HostsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HostsView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/HostsView.vue?");

/***/ }),

/***/ "./src/components/IntroPage.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/IntroPage.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IntroPage.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?");

/***/ }),

/***/ "./src/components/JoinLobby.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/JoinLobby.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./JoinLobby.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?");

/***/ }),

/***/ "./src/components/LeaderBoard.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/LeaderBoard.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LeaderBoard.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?");

/***/ }),

/***/ "./src/components/LobbyView.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/LobbyView.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LobbyView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?");

/***/ }),

/***/ "./src/components/MultiPlayerGame.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/components/MultiPlayerGame.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MultiPlayerGame.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?");

/***/ }),

/***/ "./src/components/OptionsView.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/OptionsView.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OptionsView.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?");

/***/ }),

/***/ "./src/components/PassiveMode.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/PassiveMode.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveMode.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?");

/***/ }),

/***/ "./src/components/PassiveModeChart.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./src/components/PassiveModeChart.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveModeChart.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?");

/***/ }),

/***/ "./src/components/SetUsername.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/SetUsername.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SetUsername_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SetUsername_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SetUsername.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/SetUsername.vue?");

/***/ }),

/***/ "./src/components/SoloGamePage.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./src/components/SoloGamePage.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloGamePage.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?");

/***/ }),

/***/ "./src/components/SoloLobby.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/SoloLobby.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloLobby_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloLobby.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloLobby.vue?");

/***/ }),

/***/ "./src/components/UsernameChange.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./src/components/UsernameChange.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsernameChange_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsernameChange_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsernameChange.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/components/UsernameChange.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=script&setup=true&lang=js":
/*!**************************************************************!*\
  !*** ./src/popup/App.vue?vue&type=script&setup=true&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&setup=true&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/components/AchievementsView.vue?vue&type=template&id=615280ce":
/*!***************************************************************************!*\
  !*** ./src/components/AchievementsView.vue?vue&type=template&id=615280ce ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_template_id_615280ce__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_template_id_615280ce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AchievementsView.vue?vue&type=template&id=615280ce */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=template&id=615280ce\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?");

/***/ }),

/***/ "./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true":
/*!********************************************************************************!*\
  !*** ./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_template_id_69efee18_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_template_id_69efee18_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseTimer.vue?vue&type=template&id=69efee18&scoped=true */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=template&id=69efee18&scoped=true\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?");

/***/ }),

/***/ "./src/components/CountryView.vue?vue&type=template&id=dd6b384a":
/*!**********************************************************************!*\
  !*** ./src/components/CountryView.vue?vue&type=template&id=dd6b384a ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_template_id_dd6b384a__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_template_id_dd6b384a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CountryView.vue?vue&type=template&id=dd6b384a */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=template&id=dd6b384a\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?");

/***/ }),

/***/ "./src/components/HomePageView.vue?vue&type=template&id=1c0eae83":
/*!***********************************************************************!*\
  !*** ./src/components/HomePageView.vue?vue&type=template&id=1c0eae83 ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomePageView_vue_vue_type_template_id_1c0eae83__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomePageView_vue_vue_type_template_id_1c0eae83__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomePageView.vue?vue&type=template&id=1c0eae83 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HomePageView.vue?vue&type=template&id=1c0eae83\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HomePageView.vue?");

/***/ }),

/***/ "./src/components/HostsView.vue?vue&type=template&id=ed40fde0":
/*!********************************************************************!*\
  !*** ./src/components/HostsView.vue?vue&type=template&id=ed40fde0 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HostsView_vue_vue_type_template_id_ed40fde0__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HostsView_vue_vue_type_template_id_ed40fde0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HostsView.vue?vue&type=template&id=ed40fde0 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HostsView.vue?vue&type=template&id=ed40fde0\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/HostsView.vue?");

/***/ }),

/***/ "./src/components/IntroPage.vue?vue&type=template&id=9137ccca":
/*!********************************************************************!*\
  !*** ./src/components/IntroPage.vue?vue&type=template&id=9137ccca ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_template_id_9137ccca__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_template_id_9137ccca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IntroPage.vue?vue&type=template&id=9137ccca */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=template&id=9137ccca\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?");

/***/ }),

/***/ "./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68":
/*!********************************************************************!*\
  !*** ./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_template_id_19ff2a68__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_template_id_19ff2a68__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./JoinLobby.vue?vue&type=template&id=19ff2a68 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=template&id=19ff2a68\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?");

/***/ }),

/***/ "./src/components/LeaderBoard.vue?vue&type=template&id=12028246":
/*!**********************************************************************!*\
  !*** ./src/components/LeaderBoard.vue?vue&type=template&id=12028246 ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_template_id_12028246__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_template_id_12028246__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LeaderBoard.vue?vue&type=template&id=12028246 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=template&id=12028246\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?");

/***/ }),

/***/ "./src/components/LobbyView.vue?vue&type=template&id=a6a73bca":
/*!********************************************************************!*\
  !*** ./src/components/LobbyView.vue?vue&type=template&id=a6a73bca ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_template_id_a6a73bca__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_template_id_a6a73bca__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LobbyView.vue?vue&type=template&id=a6a73bca */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=template&id=a6a73bca\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?");

/***/ }),

/***/ "./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8":
/*!**************************************************************************!*\
  !*** ./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8 ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_template_id_0ee736e8__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_template_id_0ee736e8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MultiPlayerGame.vue?vue&type=template&id=0ee736e8 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=template&id=0ee736e8\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?");

/***/ }),

/***/ "./src/components/OptionsView.vue?vue&type=template&id=613e0ae3":
/*!**********************************************************************!*\
  !*** ./src/components/OptionsView.vue?vue&type=template&id=613e0ae3 ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_template_id_613e0ae3__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_template_id_613e0ae3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OptionsView.vue?vue&type=template&id=613e0ae3 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=template&id=613e0ae3\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?");

/***/ }),

/***/ "./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a":
/*!**********************************************************************!*\
  !*** ./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_template_id_7a81aa6a__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_template_id_7a81aa6a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveMode.vue?vue&type=template&id=7a81aa6a */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=template&id=7a81aa6a\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?");

/***/ }),

/***/ "./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4":
/*!***************************************************************************!*\
  !*** ./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4 ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_template_id_30d2a6c4__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_template_id_30d2a6c4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveModeChart.vue?vue&type=template&id=30d2a6c4 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=template&id=30d2a6c4\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?");

/***/ }),

/***/ "./src/components/SetUsername.vue?vue&type=template&id=74e00d50":
/*!**********************************************************************!*\
  !*** ./src/components/SetUsername.vue?vue&type=template&id=74e00d50 ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SetUsername_vue_vue_type_template_id_74e00d50__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SetUsername_vue_vue_type_template_id_74e00d50__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SetUsername.vue?vue&type=template&id=74e00d50 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SetUsername.vue?vue&type=template&id=74e00d50\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SetUsername.vue?");

/***/ }),

/***/ "./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060":
/*!***********************************************************************!*\
  !*** ./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060 ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_template_id_c5feb060__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_template_id_c5feb060__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloGamePage.vue?vue&type=template&id=c5feb060 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=template&id=c5feb060\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?");

/***/ }),

/***/ "./src/components/SoloLobby.vue?vue&type=template&id=08932eb7":
/*!********************************************************************!*\
  !*** ./src/components/SoloLobby.vue?vue&type=template&id=08932eb7 ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloLobby_vue_vue_type_template_id_08932eb7__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloLobby_vue_vue_type_template_id_08932eb7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloLobby.vue?vue&type=template&id=08932eb7 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloLobby.vue?vue&type=template&id=08932eb7\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloLobby.vue?");

/***/ }),

/***/ "./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954":
/*!*************************************************************************!*\
  !*** ./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954 ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsernameChange_vue_vue_type_template_id_2c6bc954__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsernameChange_vue_vue_type_template_id_2c6bc954__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsernameChange.vue?vue&type=template&id=2c6bc954 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/UsernameChange.vue?vue&type=template&id=2c6bc954\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/UsernameChange.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=template&id=3a0a60d6":
/*!*********************************************************!*\
  !*** ./src/popup/App.vue?vue&type=template&id=3a0a60d6 ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=3a0a60d6 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css":
/*!*****************************************************************************************!*\
  !*** ./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AchievementsView_vue_vue_type_style_index_0_id_615280ce_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?");

/***/ }),

/***/ "./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css":
/*!************************************************************************************!*\
  !*** ./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CountryView_vue_vue_type_style_index_0_id_dd6b384a_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?");

/***/ }),

/***/ "./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css":
/*!**********************************************************************************!*\
  !*** ./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IntroPage_vue_vue_type_style_index_0_id_9137ccca_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?");

/***/ }),

/***/ "./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css":
/*!**********************************************************************************!*\
  !*** ./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_JoinLobby_vue_vue_type_style_index_0_id_19ff2a68_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?");

/***/ }),

/***/ "./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css":
/*!************************************************************************************!*\
  !*** ./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LeaderBoard_vue_vue_type_style_index_0_id_12028246_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?");

/***/ }),

/***/ "./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css":
/*!**********************************************************************************!*\
  !*** ./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LobbyView_vue_vue_type_style_index_0_id_a6a73bca_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?");

/***/ }),

/***/ "./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css":
/*!****************************************************************************************!*\
  !*** ./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MultiPlayerGame_vue_vue_type_style_index_0_id_0ee736e8_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?");

/***/ }),

/***/ "./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css":
/*!************************************************************************************!*\
  !*** ./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OptionsView_vue_vue_type_style_index_0_id_613e0ae3_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?");

/***/ }),

/***/ "./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css":
/*!************************************************************************************!*\
  !*** ./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveMode_vue_vue_type_style_index_0_id_7a81aa6a_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?");

/***/ }),

/***/ "./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css":
/*!*****************************************************************************************!*\
  !*** ./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PassiveModeChart_vue_vue_type_style_index_0_id_30d2a6c4_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?");

/***/ }),

/***/ "./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css":
/*!*************************************************************************************!*\
  !*** ./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SoloGamePage_vue_vue_type_style_index_0_id_c5feb060_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!***********************************************************************!*\
  !*** ./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss":
/*!***********************************************************************************************!*\
  !*** ./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseTimer_vue_vue_type_style_index_0_id_69efee18_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/AchievementsView.vue?vue&type=style&index=0&id=615280ce&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"596a97c9\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/AchievementsView.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/CountryView.vue?vue&type=style&index=0&id=dd6b384a&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"635a365b\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/CountryView.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/IntroPage.vue?vue&type=style&index=0&id=9137ccca&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"1c2853d2\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/IntroPage.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/JoinLobby.vue?vue&type=style&index=0&id=19ff2a68&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"ed3d48d4\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/JoinLobby.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LeaderBoard.vue?vue&type=style&index=0&id=12028246&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"ed22ee08\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LeaderBoard.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/LobbyView.vue?vue&type=style&index=0&id=a6a73bca&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"03d8d335\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/LobbyView.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiPlayerGame.vue?vue&type=style&index=0&id=0ee736e8&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"1977c30c\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/MultiPlayerGame.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/OptionsView.vue?vue&type=style&index=0&id=613e0ae3&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"aa4eafee\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/OptionsView.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveMode.vue?vue&type=style&index=0&id=7a81aa6a&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"36019bea\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveMode.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PassiveModeChart.vue?vue&type=style&index=0&id=30d2a6c4&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"99996ec0\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/PassiveModeChart.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SoloGamePage.vue?vue&type=style&index=0&id=c5feb060&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"6605afd0\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/SoloGamePage.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"833f8124\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/BaseTimer.vue?vue&type=style&index=0&id=69efee18&scoped=true&lang=scss\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"639f29c5\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/components/BaseTimer.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use%5B2%5D!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/popup/fonts/digital-7.ttf":
/*!***************************************!*\
  !*** ./src/popup/fonts/digital-7.ttf ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("module.exports = __webpack_require__.p + \"fonts/digital-7.f005fbcc.ttf\";\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/fonts/digital-7.ttf?");

/***/ }),

/***/ "?ac64":
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://tracker-hunt/ws_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktracker_hunt"] = self["webpackChunktracker_hunt"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chunk-vendors"], function() { return __webpack_require__("./src/popup/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;