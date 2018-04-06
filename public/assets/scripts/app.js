/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app.js","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _breakpoint = __webpack_require__(/*! modules/breakpoint */ \"./modules/breakpoint.js\");\n\nvar _breakpoint2 = _interopRequireDefault(_breakpoint);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar breakpoint = new _breakpoint2.default('(min-width: 800px)');\n\nbreakpoint.on('match', function () {\n  console.log('match');\n});\n\nbreakpoint.on('unmatch', function () {\n  console.log('unmatch');\n});\n\nbreakpoint.check();\n\nalert('in');\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./modules/breakpoint.js":
/*!*******************************!*\
  !*** ./modules/breakpoint.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _module = __webpack_require__(/*! module */ \"./modules/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Breakpoint = function (_Module) {\n  _inherits(Breakpoint, _Module);\n\n  function Breakpoint() {\n    _classCallCheck(this, Breakpoint);\n\n    return _possibleConstructorReturn(this, (Breakpoint.__proto__ || Object.getPrototypeOf(Breakpoint)).apply(this, arguments));\n  }\n\n  _createClass(Breakpoint, [{\n    key: 'init',\n    value: function init(mediaQueryString) {\n      var _this2 = this;\n\n      var mql = window.matchMedia(mediaQueryString);\n      var listener = function listener() {\n        return _this2.trigger(mql.matches ? 'match' : 'unmatch', [mql]);\n      };\n\n      mql.addListener(listener);\n\n      this.set('mql', mql);\n      this.set('listener', listener);\n    }\n  }, {\n    key: 'check',\n    value: function check() {\n      this.get('listener').call();\n\n      //return this for chaining\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      var mql = this.get('mql');\n      var listener = this.get('listener');\n\n      mql.removeListener(listener);\n\n      _get(Breakpoint.prototype.__proto__ || Object.getPrototypeOf(Breakpoint.prototype), 'destroy', this).call(this);\n    }\n  }]);\n\n  return Breakpoint;\n}(_module2.default);\n\nexports.default = Breakpoint;\n\n//# sourceURL=webpack:///./modules/breakpoint.js?");

/***/ }),

/***/ "./modules/module.js":
/*!***************************!*\
  !*** ./modules/module.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _set2 = __webpack_require__(/*! lodash/set */ \"../../node_modules/lodash/set.js\");\n\nvar _set3 = _interopRequireDefault(_set2);\n\nvar _get2 = __webpack_require__(/*! lodash/get */ \"../../node_modules/lodash/get.js\");\n\nvar _get3 = _interopRequireDefault(_get2);\n\nvar _has2 = __webpack_require__(/*! lodash/has */ \"../../node_modules/lodash/has.js\");\n\nvar _has3 = _interopRequireDefault(_has2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Module = function () {\n  function Module() {\n    _classCallCheck(this, Module);\n\n    this._data = {};\n    this._observers = {};\n    this.init && this.init.apply(this, arguments);\n  }\n\n  _createClass(Module, [{\n    key: 'set',\n    value: function set(path, value) {\n      (0, _set3.default)(this._data, path, value);\n      return value;\n    }\n  }, {\n    key: 'get',\n    value: function get(path, defaultValue) {\n      return (0, _get3.default)(this._data, path, defaultValue);\n    }\n  }, {\n    key: 'has',\n    value: function has(path) {\n      return (0, _has3.default)(this._data, path);\n    }\n  }, {\n    key: 'on',\n    value: function on(event, listener) {\n      // push listerner to list of observers\n      (this._observers[event] || (this._observers[event] = [])).push(listener);\n\n      //return this for chaining\n      return this;\n    }\n  }, {\n    key: 'trigger',\n    value: function trigger(event, data) {\n      // cycle through all listerners for a given event\n      for (var _value = this._observers[event], _key = 0; _value && _key < _value.length;) {\n        // call listener and pass data\n        _value[_key++].apply(this, data);\n      }\n\n      //return this for chaining\n      return this;\n    }\n  }, {\n    key: 'off',\n    value: function off(event, listener) {\n      // get index of the given listener\n      for (var _value2 = this._observers[event] || []; listener && (key = _value2.indexOf(listener)) > -1;) {\n        // remove the listener\n        _value2.splice(key, 1);\n      }\n\n      // assign the new list\n      this._observers[event] = listener ? value : [];\n\n      // return this for chaining\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      delete this._data;\n      delete this._observers;\n    }\n  }]);\n\n  return Module;\n}();\n\nexports.default = Module;\n\n//# sourceURL=webpack:///./modules/module.js?");

/***/ })

/******/ });