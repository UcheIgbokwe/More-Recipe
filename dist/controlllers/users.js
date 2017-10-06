'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

/**
 * Get secret key from environment variable
 */

_dotenv2.default.config();
var secret = process.env.SECRET_TOKEN;

var usersController = {
  /**
    * Controller to create a new user
   *
   * @param {any} request
   * @param {any} response
   * @returns {obj} User
   */
  create: function create(request, response) {
    var body = request.body;

    /**
    * Requirments
    */

    var rules = {
      firstName: 'required|string',
      lastName: 'required|string',
      emailAddress: 'required|email',
      password: 'required|min:6|max:24|alpha_num',
      password_confirmation: 'required|same:password'
    };

    var validation = new _validatorjs2.default(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }
    User.findOne({ where: { emailAddress: body.emailAddress } }).then(function (user) {
      if (user) {
        return response.status(404).json({ message: 'User already exists. Try again.' });
      }
      var hashedPassword = _bcryptjs2.default.hashSync(request.body.password.trim());
      User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        emailAddress: request.body.emailAddress,
        password: hashedPassword
      }).then(function (savedUser) {
        var data = _lodash2.default.pick(savedUser, ['id', 'firstName', 'lastName']);
        var authToken = _jsonwebtoken2.default.sign({ data: data }, secret, { expiresIn: 86400 });
        response.status(200).json({ auth: true, user: data, token: authToken });
      }).catch(function (error) {
        return response.status(500).json({ error: error.message });
      });
    }).catch(function () {
      return response.status(500).json({ message: 'There was a problem registering the user.' });
    });
  },


  /**
   * Controller to log in an existing user
   * @param {any} request
   * @param {any} response
   * @returns {json} user
   */
  login: function login(request, response) {
    var body = request.body;

    /**
    * Requirements
    */

    var rules = {
      emailAddress: 'required|email',
      password: 'required|min:6|max:24|alpha_num'
    };

    var validation = new _validatorjs2.default(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }

    var token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });

    _jsonwebtoken2.default.verify(token, secret, function (error) {
      if (error) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    });

    User.findOne({
      where: {
        emailAddress: request.body.emailAddress
      }
    }).then(function (user) {
      if (!user) {
        return response.status(404).json({ message: 'Authentication failed. No user found.' });
      }
      if (user) {
        var confirmPassword = _bcryptjs2.default.compareSync(request.body.password.trim(), user.password);
        if (confirmPassword === false) {
          response.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
      }

      var data = _lodash2.default.pick(user, ['id', 'firstName', 'lastName']);
      var myToken = _jsonwebtoken2.default.sign(data, secret, { expiresIn: 86400 });
      var decoded = _jsonwebtoken2.default.verify(myToken, secret);
      return response.status(201).send({ message: 'Log in successful', user: decoded, token: myToken });
    }).catch(function (error) {
      return response.send(error);
    });
  }
};

exports.default = usersController;