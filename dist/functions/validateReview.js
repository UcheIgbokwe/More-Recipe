'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateReview = function validateReview(input) {
  var errors = {};
  if (_validator2.default.isEmpty(input.comment)) {
    errors.comment = 'Review comment is empty!';
  }
  return {
    errors: errors,
    isvalid: (0, _lodash2.default)(errors)
  };
};

exports.default = validateReview;