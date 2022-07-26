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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n//var countryList = chrome.storage.local.get[[\"countryList\"]];\nconst __default__ = {\n  // https://manage.auth0.com/dashboard/eu/dev-li-9809u/applications/s449g7DqINXUA9dZNRPdVTwPswnMX9qJ/quickstart\n  sockets: {\n    connect() {\n      console.log('no worries, goose');\n    },\n\n    disconnect() {\n      console.log(\"socket has been disconnected\");\n    },\n\n    testMessage() {\n      console.log('test passed');\n    },\n\n    UserNotFound() {\n      this.UsernamePage = true;\n      this.IntroPage = false;\n    },\n\n    endBingoModeGame(lobbyAndUser) {\n      var lobby = lobbyAndUser[0];\n\n      for (var i = 0; i < this.countriesToFind.length; i++) {\n        if (this.countriesToFind[i].found === true) {\n          this.noOfCountriesBingo++;\n        }\n      }\n\n      console.log(this.playersLobby === lobby);\n\n      if (this.playersLobby === lobby && this.UsersID != lobbyAndUser[1]) {\n        this.winningUser = lobbyAndUser[1];\n        this.gameOver = true;\n        this.reset();\n        this.didYouWin = false;\n      }\n    },\n\n    receiveCountriesToVisit(lobbyAndCountries) {\n      var lobby = lobbyAndCountries[0];\n      console.log(lobbyAndCountries);\n\n      if (this.playersLobby === lobby && !this.isLobbyCreator) {\n        this.countriesToFind = lobbyAndCountries[1];\n      }\n    },\n\n    UserFound(users) {\n      console.log(users);\n      this.UsernamePage = false;\n      this.HomePage = true;\n      this.IntroPage = false;\n      this.UsersID = users[0].username;\n      this.UserGoogleID = users[0].googleID;\n      this.userProfile = new User(this.UsersID);\n    },\n\n    lobbySuccess(lobbyDetails) {\n      console.log(\"successfully connected to lobby\");\n      var lobbyID = lobbyDetails[0];\n      var listOfUsers = lobbyDetails[1];\n      console.log(lobbyID);\n      this.playersLobby = lobbyID;\n      this.UsersInLobby = listOfUsers;\n      this.noOfUsersInLobby++;\n      this.JoinLobbyPage = false;\n      this.LobbyPage = true; //this.$socket.join(lobbyID)\n\n      this.lobbyError = false;\n      this.allPlayersReady = false;\n    },\n\n    lobbyFailure() {\n      console.log(\"there was an error when attempting to connect to the server\");\n      this.lobbyError = 'Error: Lobby Not Found';\n    },\n\n    startGame(lobbyID) {\n      if (lobbyID === this.playersLobby) {\n        this.initiateGame();\n      }\n    },\n\n    updateGameModeAndTime(messageDetails) {\n      var lobbyID = messageDetails[0];\n\n      if (lobbyID === this.playersLobby) {\n        this.GameMode = messageDetails[1];\n        this.timer = messageDetails[2];\n      }\n\n      this.gameOver = false;\n    },\n\n    player_leave_message(messageDetails) {\n      this.playerLeaveMessage = \"User: \" + messageDetails + \" has disconnected from the lobby.\";\n\n      if (this.UsersInLobby.length === 1) {\n        this.playerLeaveMessage += \"You are the only player in this multiplayer game.\";\n      }\n\n      console.log(this.playerLeaveMessage);\n    },\n\n    updateUsers(lobbyDetails) {\n      console.log('we reached updating users');\n      var listOfUsers = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n      console.log(lobbyDetails);\n      console.log(this.playersLobby === lobbyID);\n      console.log(listOfUsers);\n      console.log(this.UsersInLobby);\n\n      if (this.playersLobby === lobbyID) {\n        this.UsersInLobby = listOfUsers;\n        this.noOfUsersInLobby = this.UsersInLobby.length;\n        console.log('we updated the users');\n        console.log(this.UsersInLobby);\n      }\n\n      console.log(listOfUsers);\n    },\n\n    player_is_ready(lobbyDetails) {\n      var allReady = true;\n      var user = lobbyDetails[0];\n      var lobbyID = lobbyDetails[1];\n\n      if (lobbyID === this.playersLobby) {\n        for (var i = 0; i < this.noOfUsersInLobby; i++) {\n          console.log(this.UsersInLobby[i]);\n\n          if (this.UsersInLobby[i].userID === user.userID) {\n            this.UsersInLobby[i].ready = true;\n          }\n\n          if (this.UsersInLobby[i].ready != true) {\n            allReady = false;\n          }\n        }\n      }\n\n      if (allReady) {\n        this.allPlayersReady = true;\n      }\n\n      console.log(allReady);\n    },\n\n    removePlayerFromLobby(user, lobbyID) {\n      if (this.playersLobby === lobbyID) {\n        for (var i = 0; i < this.noOfUsersInLobby; i++) {\n          if (this.UsersInLobby[i] === user) {\n            for (var j = i; j < this.noOfUsersInLobby - 1; j++) {\n              this.UsersInLobby[i] = this.UsersInlobby[i + 1];\n            }\n\n            this.UsersInLobby[this.noOfUsersInLobby--] = undefined;\n          }\n        }\n      }\n    },\n\n    sendLeaderBoards(MessageDetails) {\n      this.multiClassicLeaderboard = MessageDetails[0];\n      this.multiBingoLeaderboard = MessageDetails[1];\n    }\n\n  },\n\n  data() {\n    return {\n      message: \"This is a test\",\n      LoginPage: false,\n      IntroPage: true,\n      count: 69,\n      PasswordPage: false,\n      RegistrationPage: false,\n      HomePage: false,\n      LeaderBoard: false,\n      OptionsPage: false,\n      JoinLobbyPage: false,\n      LobbyPage: false,\n      SoloPage: false,\n      UsernamePage: false,\n      playersLobby: '',\n      UsersID: '1234',\n      UsersInLobby: [],\n      noOfUsersInLobby: 0,\n      componentVersion: 0,\n      UserGoogleID: '',\n      SoloGame: false,\n      VisitedCountries: [],\n      componentKey: 0,\n      userScore: 0,\n      gameStarted: false,\n      gameOver: false,\n      noOfCountries: 0,\n      userProfile: undefined,\n      allUserIDs: [],\n      allUsers: [],\n      MultiPlayer: false,\n      WinningUser: undefined,\n      didYouWin: false,\n      lobbyError: '',\n      isLobbyCreator: false,\n      allPlayersReady: false,\n      UsernameChangePage: false,\n      PassivePage: false,\n      HostPage: false,\n      CountryPage: false,\n      GameMode: 'Classic',\n      userLeaveMessage: \"\",\n      passiveModeHosts: [],\n      passiveModeCountries: [],\n      passiveModeTotalTrackers: 0,\n      passiveModeTotalCounties: 0,\n      passiveModeUniqueHosts: 0,\n      easyCountries: [\"United States\", \"United Kingdom\"],\n      medEasyCountries: [\"Canada\"],\n      hardCountries: [\"Russia\"],\n      countriesToFind: [],\n      noOfCountriesBingo: 0,\n      soloClassicLeaderboard: [],\n      soloBingoLeaderboard: [],\n      multiClassicLeaderboard: [],\n      multiBingoLeaderboard: [],\n      timer: 10,\n      timePassed: 0,\n      timerClose: false,\n      userSignedIn: false\n    };\n  },\n\n  computed: {\n    // https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f\n    formatTimeLeft() {\n      var timeTG = this.timer;\n      var minutes = Math.floor(timeTG / 60);\n      var seconds = timeTG % 60;\n\n      if (seconds < 10) {\n        seconds = `0${seconds}`;\n      }\n\n      return `${minutes}:${seconds}`;\n    },\n\n    timeLeft() {\n      return this.timer - this.timePassed;\n    } //,\n    //orderedCountries: function(){\n    //return _.orderBy(this.BingoCountries, 'count')\n    //}\n\n\n  },\n  props: {\n    timeToGo: {\n      type: Number,\n      required: true\n    }\n  },\n  components: {//BaseTimer\n  },\n  // Adapted from https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js\n  watch: {\n    timer: {\n      handler(value) {\n        if (value > 0 && this.gameStarted) {\n          setTimeout(() => {\n            this.timer--;\n          }, 1000);\n        } else if (value <= 10 && value > 1) {\n          this.timerClose = true;\n        } else if (value === 0) {\n          this.endGame();\n        }\n      },\n\n      immediate: true\n    }\n  },\n  methods: {\n    testMethod() {\n      this.timerClose = true; //console.log(BaseTimer)\n    },\n\n    getHighScores(multiplayer, gamemode) {\n      this.$socket.emit('retrieveLeaderBoards', multiplayer, gamemode);\n    },\n\n    initiateGame() {\n      var vm = this;\n      this.gameStarted = true;\n\n      if (this.timer <= 0) {\n        this.timer = 120;\n      }\n\n      this.timer = this.timer * 1;\n      this.timer -= 1;\n      chrome.runtime.sendMessage({\n        message: 'reset'\n      }, function (response) {\n        if (response === 'success') {\n          console.log('successfully started the game.');\n          vm.VisitedCountries = [];\n          vm.userScore = 0;\n        }\n\n        return true;\n      });\n      /*\n      \n      chrome.storage.local.get([\"countryList\"], function(result){\n          let score = 0;\n          if(!(result == undefined)){\n            for(var i = 0; i < result.countryList.length; i++){\n              score += result.countryList[i].count;\n            }\n          }\n          vm.userScore = score;\n          vm.userProfile.score = score;\n          vm.VisitedCountries = result.countryList;\n          vm.noOfCountries = result.countryList.length;\n      })\n       */\n\n      if (this.GameMode === \"Bingo\") {\n        this.countriesToFind = [];\n        this.countriesToFind.push({\n          country: this.hardCountries[this.generateRandomIntHelper(this.hardCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.easyCountries[this.generateRandomIntHelper(this.easyCountries.length)],\n          found: false\n        });\n        this.countriesToFind.push({\n          country: this.medEasyCountries[this.generateRandomIntHelper(this.medEasyCountries.length)],\n          found: false\n        });\n        console.log(this.countriesToFind);\n        this.$socket.emit('countriesToVisit', this.playersLobby, this.countriesToFind);\n      }\n\n      chrome.storage.onChanged.addListener(function (result) {\n        vm.updateListOfCountries();\n        vm.VisitedCountries = result.countryList.newValue;\n        vm.gameStarted = true; //console.log(vm.GameMode)\n\n        if (vm.GameMode === \"Classic\") {\n          vm.updateScoreClassic();\n        } else if (vm.GameMode === \"Bingo\") {\n          vm.updateScoreBingo();\n        }\n      });\n      /* chrome.windows.create({\n        url: 'https://www.google.com',\n      }) */\n    },\n\n    generateRandomIntHelper(max) {\n      return Math.floor(Math.random() * max); //Nabbed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random\n    },\n\n    onGameModeChange(event) {\n      var gameModeSelected = event.target.value;\n      this.GameMode = gameModeSelected;\n    },\n\n    onTimeChange(event) {\n      // https://www.codecheef.org/article/how-to-get-selected-radio-button-value-in-vuejs\n      var timeSelected = event.target.value;\n      this.timer = timeSelected;\n    },\n\n    HostToPassive() {\n      this.HostPage = false;\n      this.PassivePage = true;\n    },\n\n    CountToPassive() {\n      this.CountryPage = false;\n      this.PassivePage = true;\n    },\n\n    PassiveToHost() {\n      this.PassivePage = false;\n      this.HostPage = true;\n    },\n\n    PassiveToCountry() {\n      this.PassivePage = false;\n      this.CountryPage = true;\n    },\n\n    changeUsernamePage() {\n      this.OptionsPage = false;\n      this.UsernameChangePage = true;\n    },\n\n    changeUsername() {\n      this.UsersID = this.$refs.NewUsername.value;\n      this.userProfile.userID = this.UsersID;\n      this.exitToHomePage();\n      console.log(this.UserGoogleID);\n      this.$socket.emit('newUsername', this.UserGoogleID, this.UsersID);\n    },\n\n    leaveGame() {\n      console.log(this.UsersInLobby);\n\n      for (var i = 0; i < this.UsersInLobby.length; i++) {\n        if (this.UsersInLobby[i].userID === this.UsersID) {\n          /*for(var j = i; j < this.UsersInLobby.length-1; j++){\n            this.UsersInLobby[j] = this.UsersInLobby[j+1];\n          }\n          this.UsersInLobby[this.UsersInLobby.length] = undefined;*/\n          this.UsersInLobby.splice(i, i + 1);\n          console.log(\"Player deleted\");\n          console.log(this.UsersInLobby);\n        }\n      }\n\n      this.$socket.emit('playerLeft', this.UsersInLobby, this.playersLobby, this.UsersID);\n      console.log('we reached here');\n      this.playersLobby = '';\n      this.isLobbyCreator = false;\n      this.exitToHomePageReset();\n    },\n\n    endGame() {\n      var winningScore = 0;\n\n      if (this.MultiPlayer) {\n        for (var i = 0; i < this.noOfUsersInLobby; i++) {\n          if (this.UsersInLobby[i].score >= winningScore) {\n            winningScore = this.UsersInLobby[i].score;\n            var winningUser = this.UsersInLobby[i].userID;\n          }\n        }\n      }\n\n      this.WinningUser = winningUser;\n      this.gameOver = true;\n\n      if (this.GameMode === \"Classic\") {\n        this.$socket.emit('addScoreToDatabase', this.UsersID, this.GameMode, this.userScore, this.MultiPlayer === true);\n      }\n\n      if (this.WinningUser === this.UsersID) {\n        this.didYouWin = true; // This is here to make sure this is only fired once per game, by the winner\n\n        this.$socket.emit('gameWon', this.UserGoogleID);\n      } //Close the Lobby\n\n\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.reset();\n    },\n\n    endBingoGame() {\n      this.didYouWin = true;\n\n      if (this.MultiPlayer) {\n        this.$socket.emit('endBingoGame', this.playersLobby, this.UserGoogleID);\n        this.$socket.emit('gameWon', this.UserGoogleID);\n        this.$socket.emit('closeLobby', this.playersLobby);\n      }\n\n      this.noOfCountriesBingo = this.countriesToFind.length;\n      this.WinningUser = this.UsersID;\n      this.didYouWin = true;\n      this.gameOver = true;\n      this.reset();\n    },\n\n    playerReady() {\n      this.userProfile.ready = true;\n\n      for (var i = 0; i < this.noOfUsersInLobby; i++) {\n        if (this.UsersInLobby[i].userID === this.userProfile.userID) {\n          this.UsersInLobby[i].ready = true;\n        }\n      }\n\n      this.$socket.emit('playerReady', this.userProfile, this.playersLobby);\n    },\n\n    get_updated_countries() {\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        console.log(result.countryList);\n        console.log(this.VisitedCountries);\n      });\n    },\n\n    updateListOfCountries() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        vm.VisitedCountries = result.countryList;\n      });\n    },\n\n    passiveMode() {\n      var vm = this;\n      chrome.storage.local.get([\"passiveHosts\"], function (result) {\n        vm.passiveModeHosts = result.passiveHosts;\n        console.log(vm.passiveModeHosts);\n        var totalHosts = 0;\n\n        for (var i = 0; i < result.passiveHosts.length; i++) {\n          totalHosts += result.passiveHosts[i].count;\n        }\n\n        vm.passiveModeTotalTrackers = totalHosts;\n        vm.passiveModeUniqueHosts = result.passiveHosts.length;\n      });\n      chrome.storage.local.get([\"passiveCountryList\"], function (result) {\n        vm.passiveModeCountries = result.passiveCountryList;\n        console.log(vm.passiveModeCountries);\n        vm.passiveModeTotalCounties = result.passiveCountryList.length;\n      });\n      this.HomePage = false;\n      this.PassivePage = true;\n      console.log(this.passiveModeCountries);\n      console.log(this.passiveModeHosts);\n    },\n\n    updateScoreClassic() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        let count = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);\n        let score = 0;\n\n        for (var i = 0; i < result.countryList.length; i++) {\n          count.value += result.countryList[i].count;\n\n          if (result.countryList[i].name === \"United States\") {\n            score += result.countryList[i].count;\n          } else if (result.countryList[i].name === \"United Kingdom\" || result.countryList[i].name === \"Canada\") {\n            score += result.countryList[i].count * 2;\n            console.log(score + \"Test passed\");\n          } else if (result.countryList[i].name === \"Germany\" || result.countryList[i].name === \"Netherlands\" || result.countryList[i].name === \"Ireland\") {\n            score += result.countryList[i].count * 3;\n          } else if (result.countryList[i].name === \"Russia\") {\n            score += result.countryList[i].count * 4;\n          } else {\n            score += result.countryList[i].count * 5;\n          }\n        }\n\n        vm.noOfUsersInLobby = vm.UsersInLobby.length;\n        vm.userScore = score;\n        vm.userProfile.score = score;\n        vm.noOfCountries = result.countryList.length;\n\n        for (var j = 0; j < vm.noOfUsersInLobby; j++) {\n          if (vm.userProfile.userID === vm.UsersInLobby[j].userID) {\n            vm.UsersInLobby[j].score = score;\n          }\n        }\n      });\n\n      if (this.MultiPlayer) {\n        this.$socket.emit('scoreUpdate', this.userProfile, this.playersLobby, this.userScore);\n      }\n    },\n\n    updateScoreBingo() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        //console.log(result.countryList)\n        for (var i = 0; i < result.countryList.length; i++) {\n          for (var j = 0; j < vm.countriesToFind.length; j++) {\n            if (result.countryList[i].name === vm.countriesToFind[j].country) {\n              vm.countriesToFind[j].found = true; //console.log(vm.countriesToFind[j]);\n            }\n          }\n        }\n\n        vm.noOfCountries = result.countryList.length;\n      });\n      var allFound = true;\n      console.log(this.countriesToFind);\n\n      for (var j = 0; j < this.countriesToFind.length; j++) {\n        if (this.countriesToFind[j].found != true) {\n          allFound = false;\n        } else if (!(this.countriesToFind[j] in this.userProfile.BingoCountries) && this.countriesToFind[j].found === true) {\n          this.userProfile.BingoCountries.push(this.countriesToFind[j]);\n        }\n\n        console.log(this.countriesToFind[j].found);\n      }\n\n      console.log(allFound);\n\n      if (this.MultiPlayer) {\n        this.$socket.emit('bingoScoreUpdate', this.userProfile, this.lobbyID);\n      }\n\n      if (allFound) {\n        this.endBingoGame();\n        this.didYouWin = true;\n        this.WinningUser = this.userProfile.userID;\n      }\n    },\n\n    gameSetup() {\n      if (this.allPlayersReady) {\n        this.$socket.emit('startTheGame', this.playersLobby);\n      } else if (this.MultiPlayer === false) {\n        this.initiateGame();\n      }\n    },\n\n    googleLogin() {\n      var vm = this;\n      chrome.runtime.sendMessage({\n        message: 'login'\n      }, function (response) {\n        if (response === 'success') {\n          vm.userSignedIn = true;\n          vm.IntroPage = false;\n          chrome.runtime.sendMessage({\n            message: 'googleID'\n          }, function (response) {\n            if (response === '' || response === undefined) {\n              console.log(\"No google ID found\");\n            } else {\n              var googleID = response;\n              console.log(googleID);\n              googleID = googleID.substring(0, 255);\n              vm.UserGoogleID = googleID;\n              console.log('test + ' + vm.UserGoogleID);\n              vm.$socket.emit('doesUserExist', googleID);\n            }\n          });\n          console.log(vm.UserGoogleID);\n        }\n      });\n    },\n\n    getGoogleID() {\n      var vm = this;\n      chrome.runtime.sendMessage({\n        message: 'googleID'\n      }, function (response) {\n        if (response === '' || response === undefined) {\n          console.log(\"No google ID found\");\n          return '';\n        } else {\n          var googleID = response;\n          console.log(googleID);\n          googleID = googleID.substring(0, 255);\n          vm.UserGoogleID = googleID;\n          console.log('test + ' + vm.UserGoogleID);\n          return googleID;\n        }\n      });\n    },\n\n    noLoginMode() {\n      this.UsersID = this.$refs.nickname.value;\n      var userFound = false;\n      this.userProfile = new User(this.UsersID);\n      this.userProfile.userID = this.UsersID; //this.userProfile.googleID = this.UserGoogleID;\n      //var vm = this;\n\n      this.UsernamePage = false;\n      this.HomePage = true;\n      /*\n       for(var i = 0; i < this.allUsers.length; i++){\n        console.log(this.allUsers[i].googleID)\n        if(this.allUsers[i].googleID === this.UserGoogleID){\n          this.UserID = this.allUsers[i].googleID;\n          this.userProfile = this.allUsers[i];\n          this.UsernamePage = false;\n          this.HomePage = true;\n          userFound = true;\n          console.log('this should fire for the second')\n        }\n      }\n      */\n\n      if (this.UsersID === '' && !userFound) {\n        alert(\"Please enter a name\");\n      } else if (this.UsersID in this.allUserIDs && !userFound) {\n        alert(\"Error, that name has been taken\");\n      }\n\n      this.$socket.emit('newUser', this.UsersID, this.UserGoogleID);\n      console.log(\"reached here\");\n      /*\n      chrome.storage.local.get([\"userQueryResult\"], function(result){\n        console.log(result);\n        if(result === false){\n            vm.userProfile = new User(vm.UsersID);\n            vm.userProfile.googleID = vm.UserGoogleID;\n            vm.UsernamePage = false;\n            vm.HomePage = true;\n            vm.allUserIDs.push(vm.UsersID);\n            vm.allUsers.push(vm.userProfile);\n            vm.$socket.emit('newUser', vm.userProfile.userID, vm.userProfile.googleID)\n        }else if(result === true){\n            chrome.storage.local.get([\"usersFromQuery\"], function(result){\n              console.log(result)\n            })\n        }else{\n          console.log(\"Error, query resulted in neither false nor true\")\n        }\n      }) */\n\n      /*\n      if(this.UsersID === '' && !(userFound)){\n        alert(\"Please enter a name\")\n      }else if(this.UsersID in this.allUserIDs && !(userFound)){\n        alert(\"Error, that name has been taken\");\n      }else if(!(userFound)){\n        console.log('This should fire for the first round')\n        this.userProfile = new User(this.UsersID);\n        this.userProfile.googleID = this.UserGoogleID;\n        this.UsernamePage = false;\n        this.HomePage = true;\n        this.allUserIDs.push(this.UsersID);\n        this.allUsers.push(this.userProfile);\n         this.$socket.emit('newUser', this.userProfile.userID, this.userProfile.googleID)\n        */\n    },\n\n    soloGameInitiated() {\n      this.gameOver = false;\n      this.SoloPage = false;\n      this.SoloGame = true; //this.GameMode = \n      //this.timer = $('input[name=time]:checked').val();\n\n      console.log(this.GameMode);\n      console.log(this.timer);\n    },\n\n    multiGameInitiated() {\n      this.countriesToFind = [];\n      this.gameOver = false;\n      this.LobbyPage = false;\n      this.MultiPlayer = true;\n\n      if (this.isLobbyCreator) {\n        this.$socket.emit('gameModeAndTime', this.playersLobby, this.GameMode, this.timer);\n      }\n    },\n\n    noLoginToIntro() {\n      this.UsernamePage = false;\n      this.IntroPage = true;\n    },\n\n    NoAccount() {\n      this.IntroPage = false;\n      this.NoLoginPage = true;\n    },\n\n    closeLobby() {\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.exitToHomePageReset();\n    },\n\n    enterLobby() {\n      if (this.$refs.LobbyID === null) {\n        return;\n      } else {\n        var lobbyID = this.$refs.LobbyID.value;\n        this.playersLobby = lobbyID;\n        this.$socket.emit('JoinLobby', lobbyID, this.userProfile);\n      }\n    },\n\n    introToLogin() {\n      this.LoginPage = true;\n      this.IntroPage = false;\n    },\n\n    loginToIntro() {\n      this.LoginPage = false;\n      this.IntroPage = true;\n    },\n\n    loginPageChange() {\n      this.LoginPage = false;\n      this.HomePage = true;\n    },\n\n    solomode() {\n      this.HomePage = false;\n      this.SoloPage = true;\n    },\n\n    leaderboards() {\n      this.LeaderBoard = true;\n      this.HomePage = false;\n    },\n\n    joinlobby() {\n      this.JoinLobbyPage = true;\n      this.HomePage = false;\n    },\n\n    options() {\n      this.OptionsPage = true;\n      this.HomePage = false;\n    },\n\n    createLobby() {\n      var newLobbyID = this.createNewLobbyID();\n      this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);\n      this.noOfUsersInLobby = 0;\n      this.playersLobby = newLobbyID;\n      this.UsersInLobby[this.noOfUsersInLobby++] = this.userProfile;\n      this.LobbyPage = true;\n      this.HomePage = false;\n      this.isLobbyCreator = true;\n    },\n\n    exitToHomePage() {\n      this.LobbyPage = false;\n      this.JoinLobbyPage = false;\n      this.LeaderBoard = false;\n      this.SoloPage = false;\n      this.OptionsPage = false;\n      this.HomePage = true;\n      this.SoloPage = false;\n      this.SoloGame = false;\n      this.MultiPlayer = false;\n      this.UsernameChangePage = false;\n      this.PassivePage = false;\n      this.HostPage = false;\n      this.CountryPage = false;\n    },\n\n    exitToHomePageReset() {\n      this.reset();\n      this.exitToHomePage();\n    },\n\n    reset() {\n      this.isLobbyCreator = false;\n      this.userProfile.ready = false;\n      this.UsersInLobby = [];\n      this.userScore = 0;\n      this.timer = 0;\n      this.allPlayersReady = false;\n      this.didYouWin = false;\n      this.winningUser = false;\n      this.VisitedCountries = [];\n      this.noOfUsersInLobby = 0;\n      this.gameStarted = false;\n      this.userLeaveMessage = \"\";\n      this.countriesToVisit = [];\n    },\n\n    createNewLobbyID() {\n      /* adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */\n      var id = '';\n      var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n\n      for (var i = 0; i < 7; i++) {\n        id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));\n      }\n\n      return id;\n    }\n\n  }\n}; // Class Helpers:\n\nclass User {\n  constructor(userID) {\n    this.userID = userID;\n    this.score = 0;\n    this.ready = false;\n    this.googleID = '';\n    this.BingoCountries = [];\n  }\n\n}\n\n //import BaseTimer from \"../components/BaseTimer\"\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/Object.assign(__default__, {\n  __name: 'App',\n\n  setup(__props, {\n    expose\n  }) {\n    expose();\n    const __returned__ = {\n      User,\n      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref\n    };\n    Object.defineProperty(__returned__, '__isScriptSetup', {\n      enumerable: false,\n      value: true\n    });\n    return __returned__;\n  }\n\n}));\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6 ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0,\n  id: \"Intro-Page\",\n  stle: \"width: 450px\",\n  ref: \"Intro-Page\"\n};\nconst _hoisted_2 = {\n  key: 0\n};\nconst _hoisted_3 = {\n  key: 0,\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n};\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Who is watching you?\", -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = {\n  key: 0,\n  class: \"HelpText\"\n};\nconst _hoisted_6 = {\n  key: 1,\n  id: \"Home-Page\"\n};\n\nconst _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_10 = {\n  key: 0,\n  class: \"HelpText\"\n};\n\nconst _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_13 = {\n  key: 2,\n  id: \"Leader-Board\"\n};\n\nconst _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"LeaderBoards\", -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Personal\", -1\n/* HOISTED */\n);\n\nconst _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"World\", -1\n/* HOISTED */\n);\n\nconst _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", {\n  id: \"Leaderboard\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Classic\", -1\n/* HOISTED */\n);\n\nconst _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Bingo\", -1\n/* HOISTED */\n);\n\nconst _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_24 = {\n  key: 3,\n  id: \"Options-Page\"\n};\n\nconst _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Light Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Dark Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_32 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Language\", -1\n/* HOISTED */\n);\n\nconst _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_36 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_37 = {\n  key: 4,\n  id: \"UsernameChangePage\"\n};\n\nconst _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_41 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_42 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_43 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter a new username:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_44 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_45 = {\n  ref: \"NewUsername\",\n  type: \"text\"\n};\n\nconst _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_47 = {\n  key: 5,\n  id: \"Join-Lobby\"\n};\n\nconst _hoisted_48 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_49 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_50 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_51 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_53 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter lobby ID:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_55 = {\n  ref: \"LobbyID\",\n  type: \"text\"\n};\nconst _hoisted_56 = {\n  class: \"ErrorText\"\n};\nconst _hoisted_57 = {\n  key: 6,\n  id: \"UsernamePage\"\n};\n\nconst _hoisted_58 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_59 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_60 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_61 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_62 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_63 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter a username for your account:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_64 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_65 = {\n  ref: \"nickname\",\n  type: \"text\"\n};\n\nconst _hoisted_66 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_67 = {\n  key: 7,\n  id: \"Lobby\"\n};\n\nconst _hoisted_68 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_69 = {\n  class: \"HelpText\"\n};\nconst _hoisted_70 = {\n  key: 1\n};\nconst _hoisted_71 = {\n  key: 3\n};\n\nconst _hoisted_72 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Connected Players:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_73 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_74 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_75 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_76 = {\n  key: 5\n};\nconst _hoisted_77 = {\n  key: 7\n};\nconst _hoisted_78 = {\n  key: 9\n};\nconst _hoisted_79 = {\n  key: 8\n};\n\nconst _hoisted_80 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_81 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"\\\"Passive Mode\\\" engages whenever you install TrackerHunt. This will show a collection of all of the trackers encountered since the application was installed.\", -1\n/* HOISTED */\n);\n\nconst _hoisted_82 = {\n  class: \"PassiveText\"\n};\nconst _hoisted_83 = {\n  class: \"PassiveText\"\n};\nconst _hoisted_84 = {\n  class: \"PassiveText\"\n};\nconst _hoisted_85 = {\n  class: \"PassiveText\"\n};\n\nconst _hoisted_86 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"To see a complete list of hosts and counts, click \");\n\nconst _hoisted_87 = {\n  class: \"PassiveText\"\n};\n\nconst _hoisted_88 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"To see a complete list of countries and counts, click \");\n\nconst _hoisted_89 = {\n  key: 9\n};\n\nconst _hoisted_90 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_91 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Passive Mode - Complete list of Hosts\", -1\n/* HOISTED */\n);\n\nconst _hoisted_92 = {\n  key: 10\n};\n\nconst _hoisted_93 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_94 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Passive Mode - Complete list of Countries\", -1\n/* HOISTED */\n);\n\nconst _hoisted_95 = {\n  key: 11,\n  id: \"Solo-Mode\"\n};\n\nconst _hoisted_96 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_97 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Solo Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_98 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Classic\", -1\n/* HOISTED */\n);\n\nconst _hoisted_99 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<label>Bingo</label><p id=\\\"LeaderBoard\\\">Previous Scores:</p><ul><li class=\\\"PlayerList\\\" id=\\\"Score1\\\">1. </li><li class=\\\"PlayerList\\\" id=\\\"Score2\\\">2. </li><li class=\\\"PlayerList\\\" id=\\\"Score3\\\">3. </li><li class=\\\"PlayerList\\\" id=\\\"Score4\\\">4. </li><li class=\\\"PlayerList\\\" id=\\\"Score5\\\">5. </li></ul><br>\", 4);\n\nconst _hoisted_103 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"2 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_104 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"5 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_105 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"10 min\", -1\n/* HOISTED */\n);\n\nconst _hoisted_106 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_107 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_108 = {\n  class: \"HelpText\"\n};\nconst _hoisted_109 = {\n  key: 0\n};\n\nconst _hoisted_110 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_111 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Time remaining: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_112 = {\n  key: 0\n};\n\nconst _hoisted_113 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_114 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_115 = {\n  key: 1\n};\n\nconst _hoisted_116 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Countries To Locate:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_117 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Countries Located\", -1\n/* HOISTED */\n);\n\nconst _hoisted_118 = {\n  key: 1\n};\n\nconst _hoisted_119 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_120 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_121 = {\n  key: 0\n};\n\nconst _hoisted_122 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_123 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Time remaining: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_124 = {\n  key: 0\n};\n\nconst _hoisted_125 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_126 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_127 = {\n  key: 1\n};\n\nconst _hoisted_128 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Countries To Locate:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_129 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Countries Located\", -1\n/* HOISTED */\n);\n\nconst _hoisted_130 = {\n  key: 2\n};\nconst _hoisted_131 = {\n  key: 3\n};\n\nconst _hoisted_132 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", {\n  class: \"LobbyUsers\"\n}, \"All players are ready\", -1\n/* HOISTED */\n);\n\nconst _hoisted_133 = [_hoisted_132];\nconst _hoisted_134 = {\n  key: 4\n};\nconst _hoisted_135 = {\n  class: \"ErrorText\"\n};\nconst _hoisted_136 = {\n  key: 1\n};\n\nconst _hoisted_137 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_138 = {\n  key: 0\n};\n\nconst _hoisted_139 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You won! Congratulations\", -1\n/* HOISTED */\n);\n\nconst _hoisted_140 = {\n  key: 0,\n  class: \"trophy\",\n  src: \"staticimages/trophy.png\",\n  alt: \"A picture of a trophy\"\n};\nconst _hoisted_141 = {\n  key: 1\n};\nconst _hoisted_142 = {\n  key: 2\n};\nconst _hoisted_143 = {\n  key: 3\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"app\",\n    key: $data.componentVersion\n  }, [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"h2\", _hoisted_2, \"TrackHunt\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"img\", _hoisted_3)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n      key: 0,\n      onClick: _cache[0] || (_cache[0] = (...args) => $options.googleLogin && $options.googleLogin(...args)),\n      ref: \"LoginButton\"\n    }, \"Login\", 512\n    /* NEED_PATCH */\n    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<Transition><button v-if=\\\"IntroPage\\\" @click=\\\"NoAccount\\\">No-Login Mode</button></Transition> -\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_5, \"To use TrackHunt, sign in with Google and ensure you are signed in on your browser.\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  })], 512\n  /* NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.HomePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_6, [_hoisted_7, _hoisted_8, _hoisted_9, $data.userSignedIn ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_10, \"Welcome back, \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.UsersID) + \"!\", 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[1] || (_cache[1] = (...args) => $options.solomode && $options.solomode(...args)),\n    type: \"button\"\n  }, \"Play Solo\"), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[2] || (_cache[2] = (...args) => $options.createLobby && $options.createLobby(...args)),\n    type: \"button\"\n  }, \"Create Lobby\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[3] || (_cache[3] = (...args) => $options.joinlobby && $options.joinlobby(...args)),\n    type: \"button\"\n  }, \"Join Lobby\"), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[4] || (_cache[4] = (...args) => $options.options && $options.options(...args)),\n    type: \"button\"\n  }, \"Options\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[5] || (_cache[5] = (...args) => $options.leaderboards && $options.leaderboards(...args)),\n    type: \"button\"\n  }, \"LeaderBoards\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[6] || (_cache[6] = (...args) => $options.passiveMode && $options.passiveMode(...args)),\n    type: \"button\"\n  }, \"View Passive Mode Stats\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.LeaderBoard ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_13, [_hoisted_14, _hoisted_15, _hoisted_16, _hoisted_17, _hoisted_18, _hoisted_19, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.multiClassicLeaderboard, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.username) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.createdAt), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_20, _hoisted_21, _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"-<button class=\\\"Radio\\\" type=\\\"button\\\">Roulette</button>--\"), _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[7] || (_cache[7] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.OptionsPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_24, [_hoisted_25, _hoisted_26, _hoisted_27, _hoisted_28, _hoisted_29, _hoisted_30, _hoisted_31, _hoisted_32, _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[8] || (_cache[8] = (...args) => $options.changeUsernamePage && $options.changeUsernamePage(...args)),\n    type: \"button\"\n  }, \"Change Username\"), _hoisted_34, _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[9] || (_cache[9] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Home Page\"), _hoisted_36])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.UsernameChangePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_37, [_hoisted_38, _hoisted_39, _hoisted_40, _hoisted_41, _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your current username is: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.UsersID), 1\n  /* TEXT */\n  ), _hoisted_43, _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_45, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[10] || (_cache[10] = (...args) => $options.changeUsername && $options.changeUsername(...args)),\n    type: \"button\"\n  }, \"Save\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[11] || (_cache[11] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.JoinLobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_47, [_hoisted_48, _hoisted_49, _hoisted_50, _hoisted_51, _hoisted_52, _hoisted_53, _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_55, null, 512\n  /* NEED_PATCH */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lobbyError), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[12] || (_cache[12] = (...args) => $options.enterLobby && $options.enterLobby(...args)),\n    type: \"button\"\n  }, \"Join\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[13] || (_cache[13] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.UsernamePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_57, [_hoisted_58, _hoisted_59, _hoisted_60, _hoisted_61, _hoisted_62, _hoisted_63, _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_65, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[14] || (_cache[14] = (...args) => $options.noLoginMode && $options.noLoginMode(...args)),\n    type: \"button\"\n  }, \"Join\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[15] || (_cache[15] = (...args) => $options.noLoginToIntro && $options.noLoginToIntro(...args)),\n    type: \"button\"\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.LobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_67, [_hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_69, \"Lobby ID: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.playersLobby), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"--Animation of the wheel turning ---\"), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 0,\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Classic\",\n    onChange: _cache[16] || (_cache[16] = (...args) => $options.onGameModeChange && $options.onGameModeChange(...args))\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_70, \"Classic\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 2,\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Bingo\",\n    onChange: _cache[17] || (_cache[17] = (...args) => $options.onGameModeChange && $options.onGameModeChange(...args))\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_71, \"Bingo\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), _hoisted_72, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, (item, count) => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: \"LobbyUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(++count) + \". \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_73, _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<button class=\\\"Radio\\\" type=\\\"button\\\">Roulette</button>-\"), _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---This should only be visible for the lobby leader: --\"), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 4,\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"10\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[18] || (_cache[18] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_76, \"2 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 6,\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"300\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[19] || (_cache[19] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_77, \"5 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", {\n    key: 8,\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"600\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[20] || (_cache[20] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_78, \"10 min\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 10,\n    onClick: _cache[21] || (_cache[21] = (...args) => $options.closeLobby && $options.closeLobby(...args)),\n    type: \"button\"\n  }, \"Close Lobby\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[22] || (_cache[22] = (...args) => $options.multiGameInitiated && $options.multiGameInitiated(...args)),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<button @click=\\\"exitToHomePage\\\" type=\\\"button\\\">Cancel</button>--\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[23] || (_cache[23] = (...args) => $options.leaveGame && $options.leaveGame(...args)),\n    type: \"button\"\n  }, \"Leave Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.PassivePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_79, [_hoisted_80, _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_82, \"Since you installed TackerHunt, you have been tracked: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.passiveModeTotalTrackers) + \" times.\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_83, \"This was done by a total of \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.passiveModeUniqueHosts) + \" different entities.\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_84, \"These entities hailed from \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.passiveModeTotalCounties) + \" countries.\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_85, [_hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[24] || (_cache[24] = (...args) => $options.PassiveToHost && $options.PassiveToHost(...args))\n  }, \"here\")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_87, [_hoisted_88, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[25] || (_cache[25] = (...args) => $options.PassiveToCountry && $options.PassiveToCountry(...args))\n  }, \"here\")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[26] || (_cache[26] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args))\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.HostPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_89, [_hoisted_90, _hoisted_91, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.passiveModeHosts, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.URL) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[27] || (_cache[27] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args))\n  }, \"HomePage\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[28] || (_cache[28] = (...args) => $options.HostToPassive && $options.HostToPassive(...args))\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.CountryPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_92, [_hoisted_93, _hoisted_94, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.passiveModeCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      key: item,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[29] || (_cache[29] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args))\n  }, \"HomePage\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[30] || (_cache[30] = (...args) => $options.CountToPassive && $options.CountToPassive(...args))\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.SoloPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_95, [_hoisted_96, _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Classic\",\n    onChange: _cache[31] || (_cache[31] = (...args) => $options.onGameModeChange && $options.onGameModeChange(...args))\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  ), _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    class: \"Radio\",\n    type: \"radio\",\n    name: \"GameType\",\n    value: \"Bingo\",\n    onChange: _cache[32] || (_cache[32] = (...args) => $options.onGameModeChange && $options.onGameModeChange(...args))\n  }, null, 32\n  /* HYDRATE_EVENTS */\n  ), _hoisted_99, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"10\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[33] || (_cache[33] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_103, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"300\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[34] || (_cache[34] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", {\n    class: \"Radio\",\n    type: \"radio\",\n    value: \"600\",\n    name: \"time\",\n    ref: \"Timebutton\",\n    onChange: _cache[35] || (_cache[35] = $event => $options.onTimeChange($event))\n  }, null, 544\n  /* HYDRATE_EVENTS, NEED_PATCH */\n  ), _hoisted_105, _hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[36] || (_cache[36] = (...args) => $options.soloGameInitiated && $options.soloGameInitiated(...args)),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[37] || (_cache[37] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Cancel\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.SoloGame ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"Solo-Game\",\n    key: $data.componentVersion\n  }, [_hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_108, \"Solo Mode - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.GameMode), 1\n  /* TEXT */\n  ), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_109, [_hoisted_110, _hoisted_111, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([\"timer\", {\n      timer: $data.timerClose\n    }]),\n    ref: \"timer\",\n    id: \"timer\"\n  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.timer), 3\n  /* TEXT, CLASS */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---Using a more sophisticated solution for the timer. Adapted from https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---<BaseTimer :time-left=\\\"timeLeft\\\"></BaseTimer>\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<div class=\\\"TimerSection\\\">--\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---<BaseTimer :timeToGo=\\\"timeLeft\\\"/>\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----</div>-\"), $data.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_112, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_113, _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_115, [_hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.countriesToFind, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"CountriesToFind\",\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({\n        found: item.found\n      }),\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.country), 3\n    /* TEXT, CLASS */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_117, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCountries\",\n      class: \"BingoList\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[38] || (_cache[38] = (...args) => $options.gameSetup && $options.gameSetup(...args)),\n    type: \"button\"\n  }, \"Start\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[39] || (_cache[39] = (...args) => $options.endGame && $options.endGame(...args)),\n    type: \"button\"\n  }, \"End Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_118, [_hoisted_119, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s)\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[40] || (_cache[40] = (...args) => $options.exitToHomePageReset && $options.exitToHomePageReset(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"- --<button @click=\\\"gameSetup\\\" type=\\\"button\\\">Refresh</button> -\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.MultiPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"Multiplayer-Game\",\n    key: $data.componentVersion\n  }, [_hoisted_120, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<p class=\\\"HelpText\\\">Solo Mode</p>-\"), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_121, [_hoisted_122, _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.timer), 1\n  /* TEXT */\n  ), $data.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_124, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_125, _hoisted_126, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_127, [_hoisted_128, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.countriesToFind, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"CountriesToFind\",\n      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({\n        found: item.found\n      }),\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.country), 3\n    /* TEXT, CLASS */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))]), _hoisted_129, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ol\", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfCountries\",\n      class: \"BingoList\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.allPlayersReady ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_130, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"LobbyUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ready), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.allPlayersReady && !$data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_131, _hoisted_133)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.allPlayersReady && $data.gameStarted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"ol\", _hoisted_134, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"LobbyUsers\",\n      key: item\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playerLeaveMessage), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.isLobbyCreator ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n    key: 5,\n    onClick: _cache[41] || (_cache[41] = (...args) => $options.gameSetup && $options.gameSetup(...args)),\n    type: \"button\"\n  }, \"Start\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[42] || (_cache[42] = (...args) => $options.playerReady && $options.playerReady(...args))\n  }, \"Ready Up\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[43] || (_cache[43] = (...args) => $options.leaveGame && $options.leaveGame(...args)),\n    type: \"button\"\n  }, \"Leave Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_136, [_hoisted_137, $data.didYouWin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_138, [_hoisted_139, $data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"img\", _hoisted_140)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.didYouWin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Condolenses. The winner of the game was \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.WinningUser), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.GameMode === 'Classic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_142, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"LobbyUsers\",\n      key: item.name\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s) in total\", 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.GameMode === 'Bingo' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_143, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You managed to get tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountriesBingo) + \" of the bingo countries\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s) in total\", 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[44] || (_cache[44] = (...args) => $options.exitToHomePageReset && $options.exitToHomePageReset(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"- --<button @click=\\\"gameSetup\\\" type=\\\"button\\\">Refresh</button> -\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]);\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/popup/main.js":
/*!***************************!*\
  !*** ./src/popup/main.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-vue */ \"./node_modules/@auth0/auth0-vue/dist/auth0-vue.production.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue */ \"./src/popup/App.vue\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-socket.io */ \"./node_modules/vue-socket.io/dist/vue-socketio.js\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_socket_io__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n //Vue.use(new VueSocketIO({\n//\tdebug: true,\n//\tconnection: SocketIO('http://localhost:3080', {})\n//}))\n\nconst optionsVueIO = {\n  debug: true,\n  //connection: SocketIO('http://138.68.132.17:3080/')\n  //connection: SocketIO('http://localhost:3080')\n  connection: socket_io_client__WEBPACK_IMPORTED_MODULE_4___default()('http://44.203.94.188:3080')\n};\nconst app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]).use(new (vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default())(optionsVueIO)).use((0,_auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__.createAuth0)({\n  domain: \"dev-li-9809u.eu.auth0.com\",\n  client_id: \"s449g7DqINXUA9dZNRPdVTwPswnMX9qJ\",\n  redirect_uri: window.location.origin\n}));\napp.mount('#app');\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/digital-7.ttf */ \"./src/popup/fonts/digital-7.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\n/* Cormac's code but adjusted: */\\n@font-face {\\n    font-family: 'digitalFont';\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n}\\n\\n/* https://vuejs.org/guide/built-ins/transition.html#css-based-transitions */\\n.v-enter-active,\\n.v-leave-active{\\n  transition: opacity 5s ease;\\n}\\n.v-enter-from,\\n.v-leave-to {\\n  opacity: 0;\\n}\\nli{\\n  color: white;\\n}\\nli.TrackedCountry{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n  font-style: italic;\\n}\\n.found {\\n  color: green;\\n}\\n.timerClose {\\n  color: red;\\n}\\nli.LobbyUsers{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n  font-style: italic;\\n}\\nli.BingoList{\\n  color: white;\\n  font-size: x-small;\\n  list-style: none;\\n  font-style: italic;\\n  display: flex;\\n}\\np{\\n  color: white;\\n}\\np.PassiveText{\\n  color: white;\\n  font-size: small;\\n  font-style: none;\\n  display: flex;\\n}\\n#timer {\\n  color: white;\\n}\\n#timerClose {\\n  color: red;\\n}\\n.timerClose {\\n  color: red;\\n}\\nlabel {\\n  color: white;\\n}\\nh5{\\n  color: white;\\n}\\ndiv {\\n  width: 200px;\\n  height: 200px;\\n  text-align: center;\\n}\\ndiv.TimerSection {\\n  align-self: center;\\n}\\nBaseTimer {\\n  align-self: center;\\n}\\nbody {\\n  min-height: 300px;\\n  min-width: 200px;\\n  background-color: #181818;\\n  /*color: var(--color-text);\\n  background: var(--color-background); */\\n  transition: color 5s, background-color 0.5s;\\n  line-height: 1.6;\\n  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,\\n    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\\n  font-size: 15px;\\n  text-rendering: optimizeLegibility;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\np.HelpText {\\n  font-size: 9px;\\n  color: white;\\n}\\np.ErrorText {\\n  font-size: 9px;\\n  color: red;\\n}\\nli.PlayerList {\\n  text-align: left;\\n  font-style: italic;\\n  font-size: 10px;\\n}\\nh2 {\\n  font-family: 'digitalFont';\\n  font-size: 40px;\\n  color: #20C20E;\\n  margin-top: 0px;\\n  margin-bottom: 0px;\\n}\\nimg.main-logo {\\n  width: 200px;\\n  height: 150px;\\n}\\nbutton {\\n  background-color: #20C20E;\\n  color: white;\\n  text-align: center;\\n  margin-left: 5px;\\n  padding-right: 5px;\\n}\\n#app {\\n  max-width: 1280px;\\n  margin: 0 auto;\\n  padding: 0.5rem;\\n\\n  font-weight: normal;\\n}\\nheader {\\n  line-height: 1.5;\\n}\\n.logo {\\n  display: block;\\n  margin: 0 auto 2rem;\\n}\\na,\\n.green {\\n  text-decoration: none;\\n  color: hsla(160, 100%, 37%, 1);\\n  transition: 0.4s;\\n}\\n@media (hover: hover) {\\na:hover {\\n    background-color: hsla(160, 100%, 37%, 0.2);\\n}\\n}\\n@media (min-width: 1024px) {\\nbody {\\n    display: flex;\\n    place-items: center;\\n}\\n#app {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    padding: 0 2rem;\\n}\\nheader {\\n    display: flex;\\n    place-items: center;\\n    padding-right: calc(var(--section-gap) / 2);\\n}\\nheader .wrapper {\\n    display: flex;\\n    place-items: flex-start;\\n    flex-wrap: wrap;\\n}\\n.logo {\\n    margin: 0 2rem 0 0;\\n}\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/popup/App.vue":
/*!***************************!*\
  !*** ./src/popup/App.vue ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=3a0a60d6 */ \"./src/popup/App.vue?vue&type=template&id=3a0a60d6\");\n/* harmony import */ var _App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&setup=true&lang=js */ \"./src/popup/App.vue?vue&type=script&setup=true&lang=js\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\n/* harmony import */ var _Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_Users_fergussmith_tracker_hunt_my_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/popup/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=script&setup=true&lang=js":
/*!**************************************************************!*\
  !*** ./src/popup/App.vue?vue&type=script&setup=true&lang=js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=script&setup=true&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=script&setup=true&lang=js\");\n \n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=template&id=3a0a60d6":
/*!*********************************************************!*\
  !*** ./src/popup/App.vue?vue&type=template&id=3a0a60d6 ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_template_id_3a0a60d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=template&id=3a0a60d6 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6\");\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!***********************************************************************!*\
  !*** ./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_12_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_App_vue_vue_type_style_index_0_id_3a0a60d6_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"833f8124\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/vue-style-loader/index.js??clonedRuleSet-12.use%5B0%5D!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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