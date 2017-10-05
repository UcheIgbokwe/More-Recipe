'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash.isempty');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRecipe = function validateRecipe(input) {
  var errors = {};
  if (_validator2.default.isEmpty(input.name)) {
    errors.name = 'Recipe name is empty!';
  }
  if (_validator2.default.isEmpty(input.ingredients)) {
    errors.ingredients = 'Ingredients field is empty!';
  }
  if (_validator2.default.isEmpty(input.description)) {
    errors.description = 'Add description to cook!';
  }
  if (!_validator2.default.isLength(input.name, { min: 5, max: 100 })) {
    errors.name = 'Recipe name must be a minimum of 5 characters';
  }
  return {
    errors: errors,
    isvalid: (0, _lodash2.default)(errors)
  };
};

exports.default = validateRecipe;