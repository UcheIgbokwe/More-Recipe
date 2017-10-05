'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateSignUp = function validateSignUp(input) {
  var errors = {};
  if (_validator2.default.isEmpty(input.firstName)) {
    errors.firstname = 'First name is empty!';
  }
  if (!_validator2.default.isAlpha(input.firstName)) {
    errors.firstname = 'First name should be alphabets';
  }
  if (_validator2.default.isEmpty(input.lastName)) {
    errors.lastname = 'Last name is empty!';
  }
  if (!_validator2.default.isAlpha(input.lastName)) {
    errors.lastname = 'Last name should be alphabets';
  }
  if (_validator2.default.isEmpty(input.email)) {
    errors.email = 'Email is empty!';
  }
  if (!_validator2.default.isEmail(input.email)) {
    errors.email = 'Email is invalid!';
  }
  if (_validator2.default.isEmpty(input.password)) {
    errors.password = 'Password field is empty';
  }
  if (!_validator2.default.isLength(input.password, { min: 5, max: 100 })) {
    errors.password = 'Password must be minimum of 5 characters';
  }
  if (_validator2.default.isEmpty(input.confirmPassword)) {
    errors.confirmPassword = 'ConfirmPassword field is empty!';
  }
  if (!_validator2.default.equals(input.password, input.confirmPassword)) {
    errors.confirmPassword = 'Passwords don\'t match';
  }
  return {
    errors: errors,
    isvalid: (0, _lodash2.default)(errors)
  };
};

exports.default = validateSignUp;