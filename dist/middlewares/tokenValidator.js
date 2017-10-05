'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET;
var validate = function validate(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verify token
    _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
      if (error) {
        return res.status(401).json({
          error: 'true',
          message: 'failed to authenticaticate token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    return res.status(401).json({
      error: 'true',
      message: 'No token provided.'
    });
  }
};

exports.default = validate;