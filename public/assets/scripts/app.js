webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.square = square;
exports.diag = diag;
var sqrt = exports.sqrt = Math.sqrt;

function square(x) {
  return x * x;
}

function diag(x, y) {
  return sqrt(square(x) + square(y));
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lib = __webpack_require__(0);

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5

/***/ })
],[1]);