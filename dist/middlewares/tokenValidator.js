'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET_TOKEN;
var User = _models2.default.User;

var authourization = {
  verifyToken: function verifyToken(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
        if (error) {
          return res.status(401).json({ message: error.message });
        }
        User.findById(decoded.data.id).then(function (user) {
          if (!user) {
            return res.json({ message: error.message });
          }
          req.decoded = decoded.data;
          return next();
        }).catch(function (err) {
          return res.status(404).json({ error: err.message });
        });
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  },
  verifyUser: function verifyUser(req, res, next) {
    User.findById(req.params.id).then(function (user) {
      if (!user) {
        req.user = user;
        return next();
      }
      return res.status(404).json({ message: 'User not found' });
    }).catch(function (error) {
      return res.status(500).json({ error: error.message });
    });
  }
};
exports.default = authourization;