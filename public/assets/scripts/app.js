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
/******/ 	__webpack_require__.p = "/assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/scripts/app.js":
/*!*******************************!*\
  !*** ./assets/scripts/app.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/icons */ \"./assets/scripts/lib/icons.js\");\n // load and cache icon sprite\n\nconst url = '/assets/media/icons.svg';\nconst ttl =  false ? undefined : 0;\nObject(_lib_icons__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(url, ttl);\n\n//# sourceURL=webpack:///./assets/scripts/app.js?");

/***/ }),

/***/ "./assets/scripts/lib/icons.js":
/*!*************************************!*\
  !*** ./assets/scripts/lib/icons.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createIcons; });\nfunction createIcons(url) {\n  let ttl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 86400000;\n  let key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : url;\n  load().then(insert);\n\n  function load() {\n    const value = get();\n    if (value) return Promise.resolve(value);\n    return fetch(url).then(parse).then(store);\n  }\n\n  function get() {\n    try {\n      const string = localStorage.getItem(key);\n      const data = JSON.parse(string);\n      return Date.now() < data.expires ? data.value : flush();\n    } catch (e) {\n      return null;\n    }\n  }\n\n  function store(value) {\n    if (!value) return value;\n    const data = {\n      expires: Date.now() + ttl,\n      value\n    };\n    const string = JSON.stringify(data);\n    localStorage.setItem(key, string);\n    return value;\n  }\n\n  function insert(value) {\n    if (!value) return value;\n    document.body.insertAdjacentHTML('beforeend', value);\n    document.body.lastElementChild;\n    return value;\n  }\n\n  function parse(_ref) {\n    let text = _ref.text,\n        status = _ref.status;\n    return status === 200 ? text() : null;\n  }\n\n  function flush() {\n    localStorage.removeItem(key);\n    return null;\n  }\n\n  return {\n    flush\n  };\n}\n\n//# sourceURL=webpack:///./assets/scripts/lib/icons.js?");

/***/ })

/******/ });