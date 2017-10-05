'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 *
 * @export
 * @class PasswordHelper
 */
var PasswordHelper = function () {
  function PasswordHelper() {
    _classCallCheck(this, PasswordHelper);
  }

  _createClass(PasswordHelper, [{
    key: 'hashPassword',

    /**
     *
     *
     * @param {any} password
     * @returns hash
     * @memberof PasswordHelper
     */
    value: function hashPassword(password) {
      this.salt = _bcrypt2.default.genSaltSync(10);
      var hash = _bcrypt2.default.hashSync(password, this.salt);
      return hash;
    }
    /**
     * 
     * 
     * @param {any} password 
     * @param {any} hash 
     * @memberof PasswordHelper
     */

    /**
    * 
    * 
    * @param {any} password 
    * @param {any} hash 
    * @returns 
    * @memberof PasswordHelper
    */

  }, {
    key: 'decrypt',
    value: function decrypt(password, hash) {
      this.status = _bcrypt2.default.compareSync(password, hash);
      return this.status;
    }
  }]);

  return PasswordHelper;
}();

exports.default = PasswordHelper;