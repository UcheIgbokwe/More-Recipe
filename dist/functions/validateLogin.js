'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLogin = function validateLogin(input) {
  var errors = {};
  if (_validator2.default.isEmpty(input.email)) {
    errors.email = 'Email is empty!';
  }
  if (!_validator2.default.isEmail(input.email)) {
    errors.email = 'Email is invalid!';
  }
  if (_validator2.default.isEmpty(input.password)) {
    errors.password = 'Password is empty!';
  }
  return {
    errors: errors,
    isvalid: (0, _lodash2.default)(errors)
  };
};

exports.default = validateLogin;