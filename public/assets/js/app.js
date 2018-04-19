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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _breakpoint = __webpack_require__(/*! modules/breakpoint */ \"./modules/breakpoint.js\");\n\nvar _breakpoint2 = _interopRequireDefault(_breakpoint);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar breakpoint = new _breakpoint2.default('(min-width: 800px)');\n\nbreakpoint.on('match', function () {\n  console.log('match');\n});\n\nbreakpoint.on('unmatch', function () {\n  console.log('unmatch');\n});\n\nbreakpoint.check();\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./core/dispatcher.js":
/*!****************************!*\
  !*** ./core/dispatcher.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Dispatcher = function () {\n  function Dispatcher() {\n    _classCallCheck(this, Dispatcher);\n\n    this._observers = {};\n  }\n\n  _createClass(Dispatcher, [{\n    key: \"registerListener\",\n    value: function registerListener(event, listener) {\n      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n      (this._observers[event] || (this._observers[event] = [])).push({\n        listener: listener,\n        once: options.once || false\n      });\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, listener) {\n      this.registerListener(event, listener);\n    }\n  }, {\n    key: \"once\",\n    value: function once(event, listener) {\n      this.registerListener(event, listener, {\n        once: true\n      });\n    }\n  }, {\n    key: \"emit\",\n    value: function emit(event, data) {\n      var key = void 0,\n          value = void 0;\n      for (value = this._observers[event], key = 0; value && key < value.length;) {\n        var o = value[key++];\n        o.listener.apply(this, data);\n        o.once && this.off(event, o.listener);\n      }\n    }\n  }, {\n    key: \"off\",\n    value: function off(event, listener) {\n      var key = void 0,\n          value = void 0;\n      for (value = this._observers[event] || []; listener && (key = value.findIndex(function (o) {\n        return o.listener === listener;\n      })) > -1;) {\n        value.splice(key, 1);\n      }\n      this._observers[event] = listener ? value : [];\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this._observers = {};\n    }\n  }]);\n\n  return Dispatcher;\n}();\n\nexports.default = Dispatcher;\n\n//# sourceURL=webpack:///./core/dispatcher.js?");

/***/ }),

/***/ "./core/module.js":
/*!************************!*\
  !*** ./core/module.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _dispatcher5 = __webpack_require__(/*! core/dispatcher */ \"./core/dispatcher.js\");\n\nvar _dispatcher6 = _interopRequireDefault(_dispatcher5);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Module = function () {\n  function Module() {\n    _classCallCheck(this, Module);\n\n    this.dispatcher = new _dispatcher6.default();\n\n    this.init && this.init.apply(this, arguments);\n  }\n\n  _createClass(Module, [{\n    key: 'on',\n    value: function on() {\n      var _dispatcher;\n\n      (_dispatcher = this.dispatcher).on.apply(_dispatcher, arguments);\n      return this;\n    }\n  }, {\n    key: 'once',\n    value: function once() {\n      var _dispatcher2;\n\n      (_dispatcher2 = this.dispatcher).once.apply(_dispatcher2, arguments);\n      return this;\n    }\n  }, {\n    key: 'off',\n    value: function off() {\n      var _dispatcher3;\n\n      (_dispatcher3 = this.dispatcher).off.apply(_dispatcher3, arguments);\n      return this;\n    }\n  }, {\n    key: 'emit',\n    value: function emit() {\n      var _dispatcher4;\n\n      (_dispatcher4 = this.dispatcher).emit.apply(_dispatcher4, arguments);\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.dispatcher.destroy();\n    }\n  }]);\n\n  return Module;\n}();\n\nexports.default = Module;\n\n//# sourceURL=webpack:///./core/module.js?");

/***/ }),

/***/ "./modules/breakpoint.js":
/*!*******************************!*\
  !*** ./modules/breakpoint.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _module = __webpack_require__(/*! module */ \"./core/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Breakpoint = function (_Module) {\n  _inherits(Breakpoint, _Module);\n\n  function Breakpoint() {\n    _classCallCheck(this, Breakpoint);\n\n    return _possibleConstructorReturn(this, (Breakpoint.__proto__ || Object.getPrototypeOf(Breakpoint)).apply(this, arguments));\n  }\n\n  _createClass(Breakpoint, [{\n    key: 'init',\n    value: function init(mediaQueryString) {\n      var _this2 = this;\n\n      this.mql = window.matchMedia(mediaQueryString);\n      this.listener = function () {\n        return _this2.emit(_this2.mql.matches ? 'match' : 'unmatch', [_this2.mql]);\n      };\n      this.mql.addListener(this.listener);\n    }\n  }, {\n    key: 'check',\n    value: function check() {\n      this.listener.call();\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.mql.removeListener(this.listener);\n    }\n  }]);\n\n  return Breakpoint;\n}(_module2.default);\n\nexports.default = Breakpoint;\n\n//# sourceURL=webpack:///./modules/breakpoint.js?");

/***/ })

/******/ });