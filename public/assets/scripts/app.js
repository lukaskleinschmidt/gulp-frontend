/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/scripts";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_breakpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @modules/breakpoint */ \"./modules/breakpoint.js\");\n/* harmony import */ var _modules_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @modules/icons */ \"./modules/icons.js\");\n\n\nconst breakpoint = new _modules_breakpoint__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('(min-width: 800px)');\nbreakpoint.on('match', () => {\n  console.log('match');\n});\nbreakpoint.on('unmatch', () => {\n  console.log('unmatch');\n});\nbreakpoint.check();\nconst url = '/assets/icons/sprite.svg';\nconst ttl =  false ? undefined : 0; // 24h\n\nconst icons = new _modules_icons__WEBPACK_IMPORTED_MODULE_1__[\"default\"](url, ttl); // flush cache if necessary\n\nicons.flush();\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./core/dispatcher.js":
/*!****************************!*\
  !*** ./core/dispatcher.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n  constructor() {\n    this._observers = {};\n  }\n\n  register(event, listener, options = {}) {\n    (this._observers[event] || (this._observers[event] = [])).push({\n      listener: listener,\n      once: options.once || false\n    });\n  }\n\n  on(event, listener) {\n    this.register(event, listener);\n  }\n\n  once(event, listener) {\n    this.register(event, listener, {\n      once: true\n    });\n  }\n\n  emit(event, data) {\n    let i, value;\n\n    for (value = this._observers[event], i = 0; value && i < value.length;) {\n      const o = value[i++];\n      o.listener.apply(this, data);\n      o.once && this.off(event, o.listener);\n    }\n  }\n\n  off(event, listener) {\n    let i, value;\n\n    for (value = this._observers[event] || []; listener && (i = value.findIndex(o => o.listener === listener)) > -1;) {\n      value.splice(i, 1);\n    }\n\n    this._observers[event] = listener ? value : [];\n  }\n\n  destroy() {\n    this._observers = {};\n  }\n\n});\n\n//# sourceURL=webpack:///./core/dispatcher.js?");

/***/ }),

/***/ "./core/module.js":
/*!************************!*\
  !*** ./core/module.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/dispatcher */ \"./core/dispatcher.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n  constructor() {\n    this._dispatcher = new _core_dispatcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.init && this.init.apply(this, arguments);\n  }\n\n  on() {\n    this._dispatcher.on(...arguments);\n\n    return this;\n  }\n\n  once() {\n    this._dispatcher.once(...arguments);\n\n    return this;\n  }\n\n  off() {\n    this._dispatcher.off(...arguments);\n\n    return this;\n  }\n\n  emit() {\n    this._dispatcher.emit(...arguments);\n\n    return this;\n  }\n\n  destroy() {\n    this._dispatcher.destroy();\n  }\n\n});\n\n//# sourceURL=webpack:///./core/module.js?");

/***/ }),

/***/ "./modules/breakpoint.js":
/*!*******************************!*\
  !*** ./modules/breakpoint.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! module */ \"./core/module.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends module__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  init(mediaQueryString) {\n    this.mql = window.matchMedia(mediaQueryString);\n\n    this.listener = () => this.emit(this.mql.matches ? 'match' : 'unmatch', [this.mql]);\n\n    this.mql.addListener(this.listener);\n  }\n\n  check() {\n    this.listener.call();\n    return this;\n  }\n\n  destroy() {\n    this.mql.removeListener(this.listener);\n  }\n\n});\n\n//# sourceURL=webpack:///./modules/breakpoint.js?");

/***/ }),

/***/ "./modules/icons.js":
/*!**************************!*\
  !*** ./modules/icons.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! module */ \"./core/module.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends module__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  init(url, ttl, key) {\n    this.ttl = ttl || 1000 * 60 * 60 * 24; // 24 hours\n\n    this.key = key || 'icons';\n    let icons = this.get();\n    if (icons) return this.insert(icons);\n    return fetch(url).then(response => response.text()).then(icons => {\n      this.set(icons, this.ttl);\n      this.insert(icons);\n    });\n  }\n\n  get() {\n    const data = localStorage.getItem(this.key);\n    if (!data) return null;\n    const entry = JSON.parse(data);\n\n    if (entry.expires < Date.now()) {\n      this.flush();\n      return null;\n    }\n\n    return entry.value;\n  }\n\n  set(value, ttl) {\n    const data = JSON.stringify({\n      expires: Date.now() + ttl,\n      value: value\n    });\n    localStorage.setItem(this.key, data);\n  }\n\n  insert(icons) {\n    if (!icons) return;\n    document.body.insertAdjacentHTML('beforeend', icons);\n    this.icons = document.body.lastElementChild;\n  }\n\n  flush() {\n    localStorage.removeItem(this.key);\n  }\n\n  destroy() {\n    if (this.icons) document.body.removeChild(this.icons);\n    this.flush();\n  }\n\n});\n\n//# sourceURL=webpack:///./modules/icons.js?");

/***/ })

/******/ });