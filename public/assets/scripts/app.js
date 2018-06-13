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
eval("\n\nvar _breakpoint = __webpack_require__(/*! @modules/breakpoint */ \"./modules/breakpoint.js\");\n\nvar _breakpoint2 = _interopRequireDefault(_breakpoint);\n\nvar _icons = __webpack_require__(/*! @modules/icons */ \"./modules/icons.js\");\n\nvar _icons2 = _interopRequireDefault(_icons);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar breakpoint = new _breakpoint2.default('(min-width: 800px)');\n\nbreakpoint.on('match', function () {\n  console.log('match');\n});\n\nbreakpoint.on('unmatch', function () {\n  console.log('unmatch');\n});\n\nbreakpoint.check();\n\nvar url = '/assets/icons/sprite.svg';\nvar ttl =  false ? undefined : 0; // default: 300000 (5 minutes)\nvar key = 'default-icons'; // default: 'icons'\n\nvar icons = new _icons2.default(url, {\n  key: key,\n  ttl: ttl\n});\n\n// flush cache if necessary\nicons.flush();\n\n//# sourceURL=webpack:///./app.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _dispatcher5 = __webpack_require__(/*! @core/dispatcher */ \"./core/dispatcher.js\");\n\nvar _dispatcher6 = _interopRequireDefault(_dispatcher5);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Module = function () {\n  function Module() {\n    _classCallCheck(this, Module);\n\n    this.dispatcher = new _dispatcher6.default();\n\n    this.init && this.init.apply(this, arguments);\n  }\n\n  _createClass(Module, [{\n    key: 'on',\n    value: function on() {\n      var _dispatcher;\n\n      (_dispatcher = this.dispatcher).on.apply(_dispatcher, arguments);\n      return this;\n    }\n  }, {\n    key: 'once',\n    value: function once() {\n      var _dispatcher2;\n\n      (_dispatcher2 = this.dispatcher).once.apply(_dispatcher2, arguments);\n      return this;\n    }\n  }, {\n    key: 'off',\n    value: function off() {\n      var _dispatcher3;\n\n      (_dispatcher3 = this.dispatcher).off.apply(_dispatcher3, arguments);\n      return this;\n    }\n  }, {\n    key: 'emit',\n    value: function emit() {\n      var _dispatcher4;\n\n      (_dispatcher4 = this.dispatcher).emit.apply(_dispatcher4, arguments);\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.dispatcher.destroy();\n    }\n  }]);\n\n  return Module;\n}();\n\nexports.default = Module;\n\n//# sourceURL=webpack:///./core/module.js?");

/***/ }),

/***/ "./modules/breakpoint.js":
/*!*******************************!*\
  !*** ./modules/breakpoint.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _module = __webpack_require__(/*! module */ \"./core/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Breakpoint = function (_Module) {\n  _inherits(Breakpoint, _Module);\n\n  function Breakpoint() {\n    _classCallCheck(this, Breakpoint);\n\n    return _possibleConstructorReturn(this, (Breakpoint.__proto__ || Object.getPrototypeOf(Breakpoint)).apply(this, arguments));\n  }\n\n  _createClass(Breakpoint, [{\n    key: 'init',\n    value: function init(mediaQueryString) {\n      var _this2 = this;\n\n      this.mql = window.matchMedia(mediaQueryString);\n      this.listener = function () {\n        return _this2.emit(_this2.mql.matches ? 'match' : 'unmatch', [_this2.mql]);\n      };\n      this.mql.addListener(this.listener);\n    }\n  }, {\n    key: 'check',\n    value: function check() {\n      this.listener.call();\n      return this;\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      this.mql.removeListener(this.listener);\n    }\n  }]);\n\n  return Breakpoint;\n}(_module2.default);\n\nexports.default = Breakpoint;\n\n//# sourceURL=webpack:///./modules/breakpoint.js?");

/***/ }),

/***/ "./modules/icons.js":
/*!**************************!*\
  !*** ./modules/icons.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _storage = __webpack_require__(/*! @modules/storage */ \"./modules/storage.js\");\n\nvar _module = __webpack_require__(/*! module */ \"./core/module.js\");\n\nvar _module2 = _interopRequireDefault(_module);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Icons = function (_Module) {\n  _inherits(Icons, _Module);\n\n  function Icons() {\n    _classCallCheck(this, Icons);\n\n    return _possibleConstructorReturn(this, (Icons.__proto__ || Object.getPrototypeOf(Icons)).apply(this, arguments));\n  }\n\n  _createClass(Icons, [{\n    key: 'init',\n    value: function init(url, options) {\n      var _this2 = this;\n\n      this.options = Object.assign({}, {\n        key: 'icons',\n        ttl: 300000\n      }, options || {});\n\n      var icons = void 0;\n\n      if (_storage.localStorage.available) {\n        icons = _storage.localStorage.getItem(this.options.key);\n        this.insert(icons);\n      }\n\n      if (!icons) {\n        var request = new XMLHttpRequest();\n\n        request.onreadystatechange = function () {\n          if (request.readyState == 4 && request.status == 200) {\n            if (_storage.localStorage.available) {\n              _storage.localStorage.setItem(_this2.options.key, request.responseText, _this2.options.ttl);\n            }\n\n            _this2.insert(request.responseText);\n          }\n        };\n\n        request.open('GET', url, true);\n        request.send(null);\n      }\n    }\n  }, {\n    key: 'insert',\n    value: function insert(icons) {\n      if (!icons) return;\n      document.body.insertAdjacentHTML('beforeend', icons);\n    }\n  }, {\n    key: 'flush',\n    value: function flush() {\n      if (!_storage.localStorage.available) return;\n      _storage.localStorage.flush(this.options.key);\n    }\n  }]);\n\n  return Icons;\n}(_module2.default);\n\nexports.default = Icons;\n\n//# sourceURL=webpack:///./modules/icons.js?");

/***/ }),

/***/ "./modules/storage.js":
/*!****************************!*\
  !*** ./modules/storage.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction storageAvailable(type) {\n  try {\n    var storage = window[type],\n        x = '__storage_test__';\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0;\n  }\n}\n\n// IDEA: fallback to simple object storage\n\nvar Storage = function () {\n  function Storage(type) {\n    _classCallCheck(this, Storage);\n\n    this.available = storageAvailable(type);\n    this.type = type;\n  }\n\n  _createClass(Storage, [{\n    key: 'get',\n    value: function get(key) {\n      if (!this.available) return null;\n\n      var entry = JSON.parse(window[this.type].getItem(key) || '0');\n\n      if (!entry) return null;\n\n      if (entry.expires && entry.expires < Date.now()) {\n        this.flush(key);\n        return null;\n      }\n\n      return entry.value;\n    }\n  }, {\n    key: 'getItem',\n    value: function getItem() {\n      return this.get.apply(this, arguments);\n    }\n  }, {\n    key: 'set',\n    value: function set(key, value) {\n      var ttl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n      if (!this.available) return;\n\n      var expires = Date.now() + ttl;\n\n      window[this.type].setItem(key, JSON.stringify({\n        expires: ttl ? expires : false,\n        value: value\n      }));\n    }\n  }, {\n    key: 'setItem',\n    value: function setItem() {\n      this.set.apply(this, arguments);\n    }\n  }, {\n    key: 'flush',\n    value: function flush(key) {\n      window[this.type].removeItem(key);\n    }\n  }]);\n\n  return Storage;\n}();\n\nvar sessionStorage = exports.sessionStorage = new Storage('sessionStorage');\nvar localStorage = exports.localStorage = new Storage('localStorage');\n\n//# sourceURL=webpack:///./modules/storage.js?");

/***/ })

/******/ });