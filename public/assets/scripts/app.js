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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _breakpoint = __webpack_require__(/*! @modules/breakpoint */ \"./modules/breakpoint.js\");\n\nvar _breakpoint2 = _interopRequireDefault(_breakpoint);\n\nvar _icons = __webpack_require__(/*! @modules/icons */ \"./modules/icons.js\");\n\nvar _icons2 = _interopRequireDefault(_icons);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar breakpoint = new _breakpoint2.default('(min-width: 800px)');\n\nbreakpoint.on('match', function () {\n  console.log('match');\n});\n\nbreakpoint.on('unmatch', function () {\n  console.log('unmatch');\n});\n\nbreakpoint.check();\n\nvar url = '/assets/icons/sprite.svg';\nvar ttl =  false ? undefined : 0; // default: 300000 (5 minutes)\nvar key = 'default-icons'; // default: 'icons'\n\nvar icons = new _icons2.default(url, key, ttl);\n\n// flush cache if necessary\nicons.flush();\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./core/dispatcher.js":
/*!****************************!*\
  !*** ./core/dispatcher.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar _class = function () {\n  function _class() {\n    _classCallCheck(this, _class);\n\n    this._observers = {};\n  }\n\n  _createClass(_class, [{\n    key: \"register\",\n    value: function register(event, listener) {\n      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n      (this._observers[event] || (this._observers[event] = [])).push({\n        listener: listener,\n        once: options.once || false\n      });\n    }\n  }, {\n    key: \"on\",\n    value: function on(event, listener) {\n      this.register(event, listener);\n    }\n  }, {\n    key: \"once\",\n    value: function once(event, listener) {\n      this.register(event, listener, {\n        once: true\n      });\n    }\n  }, {\n    key: \"emit\",\n    value: function emit(event, data) {\n      var i = void 0,\n          value = void 0;\n      for (value = this._observers[event], i = 0; value && i < value.length;) {\n        var o = value[i++];\n        o.listener.apply(this, data);\n        o.once && this.off(event, o.listener);\n      }\n    }\n  }, {\n    key: \"off\",\n    value: function off(event, listener) {\n      var i = void 0,\n          value = void 0;\n      for (value = this._observers[event] || []; listener && (i = value.findIndex(function (o) {\n        return o.listener === listener;\n      })) > -1;) {\n        value.splice(i, 1);\n      }\n      this._observers[event] = listener ? value : [];\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this._observers = {};\n    }\n  }]);\n\n  return _class;\n}();\n\nexports.default = _class;\n\n//# sourceURL=webpack:///./core/dispatcher.js?");

/***/ }),

/***/ "./core/module.js":
/*!************************!*\
  !*** ./core/module.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _dispatcher5 = __webpack_require__(/*! @core/dispatcher */ \"./core/dispatcher.js\");\n\nvar _dispatcher6 = _interopRequireDefault(_dispatcher5);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar _class = function () {\n  function _class() {\n    _classCallCheck(this, _class);\n\n    this.dispatcher = new _dispatcher6.default();\n\n    this.init && this.init.apply(this, arguments);\n  }\n\n  _createClass(_class, [{\n    key: 'on',\n    value: function on() {\n      var _dispatcher;\n\n      (_dispatcher = this.dispatcher).on.apply(_dispatcher, arguments);\n      return this;\n    }\n  }, {\n    key: 'once',\n    value: function once() {\n      var _dispatcher2;\n\n      (_dispatcher2 = this.dispatcher).once.apply(_dispatcher2, arguments);\n      return this;\n    }\n  }, {\n    key: 'off',\n    value: function off() {\n      var _dispatcher3;\n\n      (_dispatcher3 = this.dispatcher).off.apply(_dispatcher3, arguments);\n      return this;\n    }\n  }, {\n    key: 'emit',\n    value: function emit() {\n      var _dispatcher4;\n\n      (_dispatcher4 = this.dispatcher).emit.apply(_dispatcher4, arguments);\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.dispatcher.destroy();\n    }\n  }]);\n\n  return _class;\n}();\n\nexports.default = _class;\n\n//# sourceURL=webpack:///./core/module.js?");

/***/ }),

/***/ "./modules/breakpoint.js":
/*!*******************************!*\
  !*** ./modules/breakpoint.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _module = __webpack_require__(/*! module */ \"./core/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _class = function (_Module) {\n  _inherits(_class, _Module);\n\n  function _class() {\n    _classCallCheck(this, _class);\n\n    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));\n  }\n\n  _createClass(_class, [{\n    key: 'init',\n    value: function init(mediaQueryString) {\n      var _this2 = this;\n\n      this.mql = window.matchMedia(mediaQueryString);\n      this.listener = function () {\n        return _this2.emit(_this2.mql.matches ? 'match' : 'unmatch', [_this2.mql]);\n      };\n      this.mql.addListener(this.listener);\n    }\n  }, {\n    key: 'check',\n    value: function check() {\n      this.listener.call();\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.mql.removeListener(this.listener);\n    }\n  }]);\n\n  return _class;\n}(_module2.default);\n\nexports.default = _class;\n\n//# sourceURL=webpack:///./modules/breakpoint.js?");

/***/ }),

/***/ "./modules/icons.js":
/*!**************************!*\
  !*** ./modules/icons.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _module = __webpack_require__(/*! module */ \"./core/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _class = function (_Module) {\n  _inherits(_class, _Module);\n\n  function _class() {\n    _classCallCheck(this, _class);\n\n    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));\n  }\n\n  _createClass(_class, [{\n    key: 'init',\n    value: function init(url, key, ttl) {\n      var _this2 = this;\n\n      this.key = key || 'icons';\n      this.ttl = ttl || 1000 * 60 * 60 * 24; // 24 hours\n\n      var icons = this.get();\n\n      if (icons) return this.insert(icons);\n\n      return fetch(url).then(function (response) {\n        return response.text();\n      }).then(function (icons) {\n        _this2.set(icons, _this2.ttl);\n        _this2.insert(icons);\n      });\n    }\n  }, {\n    key: 'get',\n    value: function get() {\n      var data = localStorage.getItem(this.key);\n\n      if (!data) return null;\n\n      var entry = JSON.parse(data);\n\n      if (entry.expires < Date.now()) {\n        this.flush();\n        return null;\n      }\n\n      return entry.value;\n    }\n  }, {\n    key: 'set',\n    value: function set(value, ttl) {\n      var data = JSON.stringify({\n        expires: Date.now() + ttl,\n        value: value\n      });\n\n      localStorage.setItem(this.key, data);\n    }\n  }, {\n    key: 'insert',\n    value: function insert(icons) {\n      if (!icons) return;\n      document.body.insertAdjacentHTML('beforeend', icons);\n      this.icons = document.body.lastElementChild;\n    }\n  }, {\n    key: 'flush',\n    value: function flush() {\n      localStorage.removeItem(this.key);\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      if (this.icons) document.body.removeChild(this.icons);\n      this.flush();\n    }\n  }]);\n\n  return _class;\n}(_module2.default);\n\nexports.default = _class;\n\n//# sourceURL=webpack:///./modules/icons.js?");

/***/ })

/******/ });