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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/types */ \"./node_modules/@babel/types/lib/index.js\");\n/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! process */ \"../../node_modules/process/browser.js\");\n/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n//var countryList = chrome.storage.local.get[[\"countryList\"]];\nconst __default__ = {\n  // https://manage.auth0.com/dashboard/eu/dev-li-9809u/applications/s449g7DqINXUA9dZNRPdVTwPswnMX9qJ/quickstart\n  sockets: {\n    connect() {\n      console.log('no worries, goose');\n    },\n\n    disconnect() {\n      console.log(\"socket has been disconnected\");\n    },\n\n    lobbySuccess(lobbyID) {\n      console.log(\"successfully connected to lobby\");\n      this.playersLobby = lobbyID;\n      this.UsersInLobby[this.noOfUsersInLobby++] = this.userProfile;\n      this.JoinLobbyPage = false;\n      this.LobbyPage = true;\n    },\n\n    lobbyFailure() {\n      console.log(\"there was an error when attempting to connect to the server\");\n    },\n\n    testMessage() {\n      console.log(\"Test message was successful\");\n    },\n\n    updateUsers(listOfUsers) {\n      this.UsersInLobby = listOfUsers;\n      console.log(this.UsersInLobby);\n    },\n\n    player_is_ready() {\n      var allReady = true;\n\n      for (var i = 0; i < this.noOfUsersInLobby; i++) {\n        if (this.UsersInLobby[i].ready != true) {\n          allReady = false;\n        }\n      }\n\n      if (allReady) {\n        this.gameSetup();\n      }\n\n      console.log(allReady);\n    }\n\n  },\n\n  data() {\n    return {\n      message: \"This is a test\",\n      LoginPage: false,\n      IntroPage: true,\n      count: 69,\n      PasswordPage: false,\n      RegistrationPage: false,\n      HomePage: false,\n      LeaderBoard: false,\n      OptionsPage: false,\n      JoinLobbyPage: false,\n      LobbyPage: false,\n      SoloPage: false,\n      UsernamePage: false,\n      playersLobby: '',\n      UsersID: '1234',\n      UsersInLobby: [],\n      noOfUsersInLobby: 0,\n      componentVersion: 0,\n      UserGoogleID: '',\n      SoloGame: false,\n      VisitedCountries: [],\n      VC: [],\n      componentKey: 0,\n      testCountries: ['France', 'UK'],\n      userScore: 0,\n      gameStarted: false,\n      gameOver: false,\n      noOfCountries: 0,\n      userProfile: undefined,\n      allUserIDs: [],\n      MultiPlayer: false,\n      WinningUser: undefined,\n      didYouWin: false,\n      timer: 120,\n      userSignedIn: false\n    };\n  },\n\n  // Adapted from https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js\n  watch: {\n    timer: {\n      handler(value) {\n        if (value > 0 && this.gameStarted) {\n          setTimeout(() => {\n            this.timer--;\n          }, 1000);\n        } else if (value === 0) {\n          this.endGame();\n        }\n      },\n\n      immediate: true\n    }\n  },\n  methods: {\n    endGame() {\n      var winningScore = 0;\n\n      if (this.MultiPlayer) {\n        for (var i = 0; i < this.noOfUsersInLobby; i++) {\n          if (this.UsersInLobby[i].score >= winningScore) {\n            winningScore = this.UsersInLobby[i].score;\n            var winningUser = this.UsersInLobby[i].userID;\n          }\n        }\n      }\n\n      console.log(winningScore + winningUser);\n      this.WinningUser = winningUser;\n      this.gameOver = true;\n      console.log(this.WinningUser);\n      console.log(this.WinningUser);\n\n      if (this.WinningUser === this.UsersID) {\n        this.didYouWin = true;\n      } //Close the Lobby\n\n\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.UsersInLobby = [];\n      this.noOfUsersInLobby = 0;\n    },\n\n    playerReady() {\n      this.userProfile.ready = true;\n\n      for (var i = 0; i < this.noOfUsersInLobby; i++) {\n        if (this.UsersInLobby[i].userID === this.UsersID) {\n          this.UsersInLobby[i].ready = true;\n        }\n      }\n\n      this.$socket.emit('playerReady', this.userProfile, this.playersLobby);\n    },\n\n    get_updated_countries() {\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        console.log(result.countryList);\n        console.log(this.VisitedCountries);\n      });\n    },\n\n    updateListOfCountries() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        vm.VisitedCountries = result.countryList;\n      });\n    },\n\n    updateScore() {\n      var vm = this;\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        console.log('test');\n        let count = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);\n\n        for (var i = 0; i < result.countryList.length; i++) {\n          count.value += result.countryList[i].count;\n        }\n\n        vm.noOfUsersInLobby = vm.UsersInLobby.length;\n        vm.userScore = count;\n        vm.userProfile.score = count; //console.log(vm.userProfile.score);\n\n        vm.noOfCountries = result.countryList.length;\n\n        for (var j = 0; j < vm.noOfUsersInLobby; j++) {\n          console.log(vm.UsersInLobby[j]);\n          console.log('test');\n          console.log(vm.userProfile.userID);\n          console.log(vm.UsersInLobby[j].userID);\n\n          if (vm.userProfile.userID === vm.UsersInLobby[j].userID) {\n            vm.UsersInLobby[j].score = count;\n            console.log(vm.UsersInLobby[j].score);\n          }\n        }\n      });\n\n      if (this.MultiPlayer) {\n        this.$socket.emit('scoreUpdate', this.UserProfile, this.LobbyID, this.userScore);\n      }\n    },\n\n    gameSetup() {\n      var vm = this;\n      this.gameStarted = true;\n\n      if (this.timer <= 0) {\n        this.timer = 120;\n      }\n\n      this.timer += 1;\n      chrome.runtime.sendMessage({\n        message: 'reset'\n      }, function (response) {\n        if (response === 'success') {\n          console.log('successfully started the game.');\n          vm.VisitedCountries = [];\n          vm.userScore = 0;\n        }\n\n        return true;\n      });\n      chrome.storage.local.get([\"countryList\"], function (result) {\n        let test = 0;\n\n        if (!(result == undefined)) {\n          for (var i = 0; i < result.countryList.length; i++) {\n            test += result.countryList[i].count;\n          }\n        } //console.log(test);\n\n\n        vm.userScore = test;\n        vm.userProfile.score = test;\n        vm.VisitedCountries = result.countryList;\n        vm.noOfCountries = result.countryList.length;\n      });\n      chrome.storage.onChanged.addListener(function (result) {\n        vm.updateScore();\n        vm.updateListOfCountries(); //console.log(result.countryList.newValue);\n\n        vm.VisitedCountries = result.countryList.newValue;\n        vm.gameStarted = true; //console.log(result.countryList.newValue[0].count)     \n        //console.log(this.testScore.value);\n        //console.log(isReactive(this.testScore));\n      });\n    },\n\n    googleLogin() {\n      var vm = this;\n      chrome.runtime.sendMessage({\n        message: 'login'\n      }, function (response) {\n        if (response === 'success') {\n          vm.userSignedIn = true;\n          vm.IntroPage = false;\n          vm.UsernamePage = true; //vm.UserGoogleID = userID;\n        }\n      });\n      chrome.runtime.sendMessage({\n        message: 'googleID'\n      }, function (response) {\n        if (response === '') {\n          console.log(\"No google ID found\");\n        } else {\n          vm.UserGoogleID = response; //console.log('test + ' + response);\n        }\n      });\n    },\n\n    noLoginMode() {\n      this.UsersID = this.$refs.nickname.value;\n\n      if (this.UsersID === '') {\n        alert(\"Please enter a name\");\n      } else if (this.UsersID in this.allUserIDs) {\n        alert(\"Error, that name has been taken\");\n      } else {\n        this.userProfile = new User(this.UsersID);\n        this.UsernamePage = false;\n        this.HomePage = true;\n        this.allUserIDs.push(this.UsersID);\n      }\n    },\n\n    soloGameInitiated() {\n      this.gameOver = false;\n      this.SoloPage = false;\n      this.SoloGame = true;\n    },\n\n    multiGameInitiated() {\n      this.gameOver = false;\n      this.LobbyPage = false;\n      this.MultiPlayer = true;\n    },\n\n    noLoginToIntro() {\n      this.NoLoginPage = false;\n      this.IntroPage = true;\n    },\n\n    NoAccount() {\n      this.IntroPage = false;\n      this.NoLoginPage = true;\n    },\n\n    closeLobby() {\n      this.$socket.emit('closeLobby', this.playersLobby);\n      this.LobbyPage = false;\n      this.HomePage = true;\n    },\n\n    enterLobby() {\n      if (this.$refs.LobbyID === null) {\n        return;\n      } else {\n        var lobbyID = this.$refs.LobbyID.value;\n        this.$socket.emit('JoinLobby', lobbyID, this.userProfile);\n      }\n    },\n\n    introToLogin() {\n      this.LoginPage = true;\n      this.IntroPage = false;\n    },\n\n    loginToIntro() {\n      this.LoginPage = false;\n      this.IntroPage = true;\n    },\n\n    loginPageChange() {\n      this.LoginPage = false;\n      this.HomePage = true;\n    },\n\n    solomode() {\n      this.HomePage = false;\n      this.SoloPage = true;\n    },\n\n    leaderboards() {\n      this.LeaderBoard = true;\n      this.HomePage = false;\n    },\n\n    joinlobby() {\n      this.JoinLobbyPage = true;\n      this.HomePage = false;\n    },\n\n    options() {\n      this.OptionsPage = true;\n      this.HomePage = false;\n    },\n\n    createLobby() {\n      var newLobbyID = this.createNewLobbyID();\n      this.$socket.emit('CreateNewLobby', newLobbyID, this.userProfile);\n      this.playersLobby = newLobbyID;\n      this.noOfUsersInLobby += 1;\n      this.LobbyPage = true;\n      this.HomePage = false;\n    },\n\n    exitToHomePage() {\n      this.LobbyPage = false;\n      this.JoinLobbyPage = false;\n      this.LeaderBoard = false;\n      this.SoloPage = false;\n      this.OptionsPage = false;\n      this.HomePage = true;\n      this.SoloPage = false;\n      this.SoloGame = false;\n      this.MultiPlayer = false;\n    },\n\n    createNewLobbyID() {\n      /* adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */\n      var id = '';\n      var allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n\n      for (var i = 0; i < 7; i++) {\n        id += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));\n      }\n\n      return id;\n    }\n\n  }\n}; // Class Helpers:\n\nclass User {\n  constructor(userID) {\n    this.userID = userID;\n    this.score = 0;\n    this.ready = false;\n  }\n\n}\n\n\n //import { isReactive } from 'vue';\n\n //import { reactive } from '@vue/reactivity';\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/Object.assign(__default__, {\n  __name: 'App',\n\n  setup(__props, {\n    expose\n  }) {\n    expose();\n    console.log(_babel_types__WEBPACK_IMPORTED_MODULE_1__.classBody);\n    console.log(process__WEBPACK_IMPORTED_MODULE_2__.listenerCount);\n    const __returned__ = {\n      User,\n      classBody: _babel_types__WEBPACK_IMPORTED_MODULE_1__.classBody,\n      listenerCount: process__WEBPACK_IMPORTED_MODULE_2__.listenerCount,\n      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref\n    };\n    Object.defineProperty(__returned__, '__isScriptSetup', {\n      enumerable: false,\n      value: true\n    });\n    return __returned__;\n  }\n\n}));\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=template&id=3a0a60d6 ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  key: 0,\n  id: \"Intro-Page\",\n  stle: \"width: 450px\",\n  ref: \"Intro-Page\"\n};\nconst _hoisted_2 = {\n  key: 0\n};\nconst _hoisted_3 = {\n  key: 0,\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n};\n\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Who is watching you?\", -1\n/* HOISTED */\n);\n\nconst _hoisted_5 = {\n  key: 0,\n  class: \"HelpText\"\n};\n\nconst _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"New to TrackHunt? Sign up \");\n\nconst _hoisted_7 = {\n  key: 1,\n  id: \"Login-Page\"\n};\nconst _hoisted_8 = {\n  key: 0\n};\nconst _hoisted_9 = {\n  key: 0,\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n};\n\nconst _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_11 = {\n  key: 0\n};\nconst _hoisted_12 = {\n  key: 0,\n  type: \"text\"\n};\n\nconst _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_14 = {\n  key: 0\n};\nconst _hoisted_15 = {\n  key: 0,\n  type: \"password\"\n};\n\nconst _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_17 = {\n  key: 2,\n  id: \"Password-Reset\"\n};\n\nconst _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<h2>TrackHunt</h2><img class=\\\"main-logo\\\" src=\\\"staticimages/Logo.png\\\" alt=\\\"TrackHunt Logo\\\"><br><h6>Password Reset Form</h6><label>Email:</label><input type=\\\"text\\\"><br><label>Confirm Email:</label><input type=\\\"text\\\"><br><button type=\\\"button\\\">Cancel</button><button type=\\\"button\\\">Reset Password</button><p class=\\\"HelpText\\\">Forgotten your details? Click <a href=\\\"www.google.com\\\"> Here</a></p>\", 13);\n\nconst _hoisted_31 = [_hoisted_18];\nconst _hoisted_32 = {\n  key: 3,\n  id: \"Registration\"\n};\n\nconst _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<h2>TrackHunt</h2><img class=\\\"main-logo\\\" src=\\\"staticimages/Logo.png\\\" alt=\\\"TrackHunt Logo\\\"><br><h6>Sign Up Form</h6><label>Username:</label><input type=\\\"text\\\"><br><label>Password:</label><input type=\\\"password\\\"><br><label>Confirm Password:</label><input type=\\\"password\\\"><br><button type=\\\"button\\\">Cancel</button><button type=\\\"button\\\">Sign Up</button>\", 15);\n\nconst _hoisted_48 = [_hoisted_33];\nconst _hoisted_49 = {\n  key: 4,\n  id: \"Home-Page\"\n};\n\nconst _hoisted_50 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_51 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_53 = {\n  key: 0,\n  class: \"HelpText\"\n};\n\nconst _hoisted_54 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_55 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_56 = {\n  key: 5,\n  id: \"Leader-Board\"\n};\n\nconst _hoisted_57 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<h2>TrackHunt</h2><br><p class=\\\"HelpText\\\">LeaderBoards</p><button class=\\\"Radio\\\" type=\\\"button\\\">Personal</button><button class=\\\"Radio\\\" type=\\\"button\\\">World</button><br><div id=\\\"Leaderboard\\\"></div><button class=\\\"Radio\\\" type=\\\"button\\\">Classic</button><button class=\\\"Radio\\\" type=\\\"button\\\">Bingo</button><button class=\\\"Radio\\\" type=\\\"button\\\">Roulette</button><br>\", 11);\n\nconst _hoisted_68 = {\n  key: 6,\n  id: \"Options-Page\"\n};\n\nconst _hoisted_69 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_70 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_71 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_72 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Light Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_73 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_74 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Dark Mode\", -1\n/* HOISTED */\n);\n\nconst _hoisted_75 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_76 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  type: \"button\"\n}, \"Language\", -1\n/* HOISTED */\n);\n\nconst _hoisted_77 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_78 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_79 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_80 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_81 = {\n  key: 7,\n  id: \"Join-Lobby\"\n};\n\nconst _hoisted_82 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_83 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_84 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_85 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_86 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_87 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter lobby ID:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_88 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_89 = {\n  ref: \"LobbyID\",\n  type: \"text\"\n};\n\nconst _hoisted_90 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_91 = {\n  key: 8,\n  id: \"UsernamePage\"\n};\n\nconst _hoisted_92 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_93 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n  class: \"main-logo\",\n  src: \"staticimages/Logo.png\",\n  alt: \"TrackHunt Logo\"\n}, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_94 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_95 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_96 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_97 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Enter a nickname for your session:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_98 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_99 = {\n  ref: \"nickname\",\n  type: \"text\"\n};\n\nconst _hoisted_100 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_101 = {\n  key: 9,\n  id: \"Lobby\"\n};\n\nconst _hoisted_102 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_103 = {\n  class: \"HelpText\"\n};\n\nconst _hoisted_104 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", {\n  class: \"HelpText\"\n}, \"Connected Players:\", -1\n/* HOISTED */\n);\n\nconst _hoisted_105 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ul\", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---\\n      <li class=\\\"PlayerList\\\" id=\\\"Player1\\\">1. {{ UsersInLobby[0].userID }}</li>\\n      <li class=\\\"PlayerList\\\" id=\\\"Player2\\\">2. {{ UsersInLobby[1].userID }}</li>\\n      <li class=\\\"PlayerList\\\" id=\\\"Player3\\\">3. {{ UsersInLobby[2].userID }}</li>\\n      <li class=\\\"PlayerList\\\" id=\\\"Player4\\\">4. {{ UsersInLobby[3].userID }}</li>\\n      \")], -1\n/* HOISTED */\n);\n\nconst _hoisted_106 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Classic\", -1\n/* HOISTED */\n);\n\nconst _hoisted_107 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Bingo\", -1\n/* HOISTED */\n);\n\nconst _hoisted_108 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n  class: \"Radio\",\n  type: \"button\"\n}, \"Roulette\", -1\n/* HOISTED */\n);\n\nconst _hoisted_109 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_110 = {\n  key: 10,\n  id: \"Solo-Mode\"\n};\n\nconst _hoisted_111 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<h2>TrackHunt</h2><p class=\\\"HelpText\\\">Solo Mode</p><br><p id=\\\"LeaderBoard\\\">Previous Scores:</p><ul><li class=\\\"PlayerList\\\" id=\\\"Score1\\\">1. </li><li class=\\\"PlayerList\\\" id=\\\"Score2\\\">2. </li><li class=\\\"PlayerList\\\" id=\\\"Score3\\\">3. </li><li class=\\\"PlayerList\\\" id=\\\"Score4\\\">4. </li><li class=\\\"PlayerList\\\" id=\\\"Score5\\\">5. </li></ul><br><button class=\\\"Radio\\\" type=\\\"button\\\">Classic</button><button class=\\\"Radio\\\" type=\\\"button\\\">Bingo</button><br>\", 9);\n\nconst _hoisted_120 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_121 = {\n  key: 0\n};\n\nconst _hoisted_122 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_123 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Time remaining: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_124 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_125 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_126 = {\n  key: 1\n};\n\nconst _hoisted_127 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_128 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"TrackHunt\", -1\n/* HOISTED */\n);\n\nconst _hoisted_129 = {\n  key: 0\n};\n\nconst _hoisted_130 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_131 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Time remaining: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_132 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\", null, null, -1\n/* HOISTED */\n);\n\nconst _hoisted_133 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", null, \"Current Score: \", -1\n/* HOISTED */\n);\n\nconst _hoisted_134 = {\n  key: 1\n};\n\nconst _hoisted_135 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"GAME OVER\", -1\n/* HOISTED */\n);\n\nconst _hoisted_136 = {\n  key: 0\n};\n\nconst _hoisted_137 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You won! Congratularions\", -1\n/* HOISTED */\n);\n\nconst _hoisted_138 = [_hoisted_137];\nconst _hoisted_139 = {\n  key: 1\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"app\",\n    key: $data.componentVersion\n  }, [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"h2\", _hoisted_2, \"TrackHunt\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"img\", _hoisted_3)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n      key: 0,\n      onClick: _cache[0] || (_cache[0] = (...args) => $options.googleLogin && $options.googleLogin(...args)),\n      ref: \"LoginButton\"\n    }, \"Login\", 512\n    /* NEED_PATCH */\n    )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<Transition><button v-if=\\\"IntroPage\\\" @click=\\\"NoAccount\\\">No-Login Mode</button></Transition> -\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.IntroPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"a\", {\n      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.refresh && _ctx.refresh(...args))\n    }, \"Here\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  })], 512\n  /* NEED_PATCH */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"h2\", _hoisted_8, \"TrackHunt\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"img\", _hoisted_9)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_11, \"Username:\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", _hoisted_12)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"label\", _hoisted_14, \"Password:\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"input\", _hoisted_15)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n      key: 0,\n      onClick: _cache[2] || (_cache[2] = (...args) => $options.loginToIntro && $options.loginToIntro(...args)),\n      type: \"button\"\n    }, \"Cancel\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, null, {\n    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.LoginPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"button\", {\n      key: 0,\n      onClick: _cache[3] || (_cache[3] = (...args) => $options.loginPageChange && $options.loginPageChange(...args)),\n      type: \"button\"\n    }, \"Login\")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]),\n    _: 1\n    /* STABLE */\n\n  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.PasswordPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_17, _hoisted_31)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.RegistrationPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_32, _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.HomePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_49, [_hoisted_50, _hoisted_51, _hoisted_52, $data.userSignedIn ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"p\", _hoisted_53, \"Welcome back, \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.UsersID) + \"!\", 1\n  /* TEXT */\n  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[4] || (_cache[4] = (...args) => $options.solomode && $options.solomode(...args)),\n    type: \"button\"\n  }, \"Play Solo\"), _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[5] || (_cache[5] = (...args) => $options.leaderboards && $options.leaderboards(...args)),\n    type: \"button\"\n  }, \"LeaderBoards\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[6] || (_cache[6] = (...args) => $options.joinlobby && $options.joinlobby(...args)),\n    type: \"button\"\n  }, \"Join Lobby\"), _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[7] || (_cache[7] = (...args) => $options.options && $options.options(...args)),\n    type: \"button\"\n  }, \"Options\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[8] || (_cache[8] = (...args) => $options.createLobby && $options.createLobby(...args)),\n    type: \"button\"\n  }, \"Create Lobby\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.LeaderBoard ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_56, [_hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[9] || (_cache[9] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.OptionsPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_68, [_hoisted_69, _hoisted_70, _hoisted_71, _hoisted_72, _hoisted_73, _hoisted_74, _hoisted_75, _hoisted_76, _hoisted_77, _hoisted_78, _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[10] || (_cache[10] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Home Page\"), _hoisted_80])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.JoinLobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_81, [_hoisted_82, _hoisted_83, _hoisted_84, _hoisted_85, _hoisted_86, _hoisted_87, _hoisted_88, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_89, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[11] || (_cache[11] = (...args) => $options.enterLobby && $options.enterLobby(...args)),\n    type: \"button\"\n  }, \"Join\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[12] || (_cache[12] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.UsernamePage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_91, [_hoisted_92, _hoisted_93, _hoisted_94, _hoisted_95, _hoisted_96, _hoisted_97, _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"input\", _hoisted_99, null, 512\n  /* NEED_PATCH */\n  ), _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[13] || (_cache[13] = (...args) => $options.noLoginMode && $options.noLoginMode(...args)),\n    type: \"button\"\n  }, \"Join\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[14] || (_cache[14] = (...args) => $options.noLoginToIntro && $options.noLoginToIntro(...args)),\n    type: \"button\"\n  }, \"Back\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.LobbyPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_101, [_hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", _hoisted_103, \"Lobby ID: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.playersLobby), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"--Animation of the wheel turning ---\"), _hoisted_104, _hoisted_105, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      class: \"LobbyUsers\",\n      key: item.userID\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfUsersInLobby) + \". \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_106, _hoisted_107, _hoisted_108, _hoisted_109, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"---This should only be visible for the lobby leader: --\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[15] || (_cache[15] = (...args) => $options.closeLobby && $options.closeLobby(...args)),\n    type: \"button\"\n  }, \"Close Lobby\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[16] || (_cache[16] = (...args) => $options.multiGameInitiated && $options.multiGameInitiated(...args)),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[17] || (_cache[17] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Cancel\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.SoloPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_110, [_hoisted_111, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[18] || (_cache[18] = (...args) => $options.soloGameInitiated && $options.soloGameInitiated(...args)),\n    type: \"button\"\n  }, \"Begin Game\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[19] || (_cache[19] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"Cancel\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.SoloGame ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"Solo-Game\",\n    key: $data.componentVersion\n  }, [_hoisted_120, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<p class=\\\"HelpText\\\">Solo Mode</p>-\"), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_121, [_hoisted_122, _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.timer), 1\n  /* TEXT */\n  ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_124, _hoisted_125, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[20] || (_cache[20] = (...args) => $options.gameSetup && $options.gameSetup(...args)),\n    type: \"button\"\n  }, \"Start\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[21] || (_cache[21] = (...args) => $options.endGame && $options.endGame(...args)),\n    type: \"button\"\n  }, \"End Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_126, [_hoisted_127, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s)\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[22] || (_cache[22] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"- --<button @click=\\\"gameSetup\\\" type=\\\"button\\\">Refresh</button> -\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.MultiPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", {\n    id: \"Multiplayer-Game\",\n    key: $data.componentVersion\n  }, [_hoisted_128, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"----<p class=\\\"HelpText\\\">Solo Mode</p>-\"), !$data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_129, [_hoisted_130, _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.timer), 1\n  /* TEXT */\n  ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.VisitedCountries, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      key: item.name,\n      class: \"TrackedCountry\"\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.count), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), _hoisted_132, _hoisted_133, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(this.userScore), 1\n  /* TEXT */\n  ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"LobbyUsers\",\n      key: item.name\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[23] || (_cache[23] = (...args) => $options.playerReady && $options.playerReady(...args)),\n    type: \"button\"\n  }, \"Start\"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[24] || (_cache[24] = (...args) => $options.endGame && $options.endGame(...args)),\n    type: \"button\"\n  }, \"End Game\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), $data.gameOver ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_134, [_hoisted_135, $data.didYouWin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_136, _hoisted_138)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), !$data.didYouWin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_139, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Condolenses. The winner of the game was \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.WinningUser.userID), 1\n  /* TEXT */\n  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.UsersInLobby, item => {\n    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"li\", {\n      ref_for: true,\n      ref: \"ListOfScores\",\n      class: \"OtherPlayers\",\n      key: item.name\n    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.userID) + \" - \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.score), 1\n    /* TEXT */\n    );\n  }), 128\n  /* KEYED_FRAGMENT */\n  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Your score was: \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.userScore), 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"You were tracked by \" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noOfCountries) + \" nation(s)\", 1\n  /* TEXT */\n  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[25] || (_cache[25] = (...args) => $options.exitToHomePage && $options.exitToHomePage(...args)),\n    type: \"button\"\n  }, \"HomePage\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"- --<button @click=\\\"gameSetup\\\" type=\\\"button\\\">Refresh</button> -\")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)]);\n}\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/popup/main.js":
/*!***************************!*\
  !*** ./src/popup/main.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-vue */ \"./node_modules/@auth0/auth0-vue/dist/auth0-vue.production.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue */ \"./src/popup/App.vue\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-socket.io */ \"./node_modules/vue-socket.io/dist/vue-socketio.js\");\n/* harmony import */ var vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_socket_io__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n //Vue.use(new VueSocketIO({\n//\tdebug: true,\n//\tconnection: SocketIO('http://localhost:3080', {})\n//}))\n\nconst optionsVueIO = {\n  debgu: true,\n  connection: socket_io_client__WEBPACK_IMPORTED_MODULE_4___default()('http://138.68.132.17:3080')\n};\nconst app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]).use(new (vue_socket_io__WEBPACK_IMPORTED_MODULE_3___default())(optionsVueIO)).use((0,_auth0_auth0_vue__WEBPACK_IMPORTED_MODULE_1__.createAuth0)({\n  domain: \"dev-li-9809u.eu.auth0.com\",\n  client_id: \"s449g7DqINXUA9dZNRPdVTwPswnMX9qJ\",\n  redirect_uri: window.location.origin\n}));\napp.mount('#app');\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/popup/App.vue?vue&type=style&index=0&id=3a0a60d6&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/digital-7.ttf */ \"./src/popup/fonts/digital-7.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"\\n/* Cormac's code but adjusted: */\\n@font-face {\\n    font-family: 'digitalFont';\\n    src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n}\\n\\n/* https://vuejs.org/guide/built-ins/transition.html#css-based-transitions */\\n.v-enter-active,\\n.v-leave-active{\\n  transition: opacity 5s ease;\\n}\\n.v-enter-from,\\n.v-leave-to {\\n  opacity: 0;\\n}\\nli{\\n  color: white;\\n}\\nli.TrackedCountry{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n  font-style: italic;\\n}\\nli.LobbyUsers{\\n  color: white;\\n  font-size: smaller;\\n  list-style: none;\\n  font-style: italic;\\n}\\np{\\n  color: white;\\n}\\nlabel {\\n  color: white;\\n}\\nh5{\\n  color: white;\\n}\\ndiv {\\n  width: 200px;\\n  height: 200px;\\n  text-align: center;\\n}\\nbody {\\n  min-height: 300px;\\n  min-width: 200px;\\n  background-color: #181818;\\n  /*color: var(--color-text);\\n  background: var(--color-background); */\\n  transition: color 5s, background-color 0.5s;\\n  line-height: 1.6;\\n  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,\\n    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\\n  font-size: 15px;\\n  text-rendering: optimizeLegibility;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\np.HelpText {\\n  font-size: 10px;\\n  color: white;\\n}\\nli.PlayerList {\\n  text-align: left;\\n  font-style: italic;\\n  font-size: 10px;\\n}\\nh2 {\\n  font-family: 'digitalFont';\\n  font-size: 40px;\\n  color: #20C20E;\\n}\\nimg.main-logo {\\n  width: 200px;\\n  height: 150px;\\n}\\nbutton {\\n  background-color: #20C20E;\\n  color: white;\\n  text-align: center;\\n  margin-left: 5px;\\n  padding-right: 5px;\\n}\\n#app {\\n  max-width: 1280px;\\n  margin: 0 auto;\\n  padding: 0.5rem;\\n\\n  font-weight: normal;\\n}\\nheader {\\n  line-height: 1.5;\\n}\\n.logo {\\n  display: block;\\n  margin: 0 auto 2rem;\\n}\\na,\\n.green {\\n  text-decoration: none;\\n  color: hsla(160, 100%, 37%, 1);\\n  transition: 0.4s;\\n}\\n@media (hover: hover) {\\na:hover {\\n    background-color: hsla(160, 100%, 37%, 0.2);\\n}\\n}\\n@media (min-width: 1024px) {\\nbody {\\n    display: flex;\\n    place-items: center;\\n}\\n#app {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    padding: 0 2rem;\\n}\\nheader {\\n    display: flex;\\n    place-items: center;\\n    padding-right: calc(var(--section-gap) / 2);\\n}\\nheader .wrapper {\\n    display: flex;\\n    place-items: flex-start;\\n    flex-wrap: wrap;\\n}\\n.logo {\\n    margin: 0 2rem 0 0;\\n}\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://tracker-hunt/./src/popup/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

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