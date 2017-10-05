'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validateSignup2 = require('../functions/validateSignup');

var _validateSignup3 = _interopRequireDefault(_validateSignup2);

var _validateLogin2 = require('../functions/validateLogin');

var _validateLogin3 = _interopRequireDefault(_validateLogin2);

var _encryption = require('../functions/encryption');

var passwordHelper = _interopRequireWildcard(_encryption);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = new passwordHelper.default();
var user = _models2.default.User;
var secret = process.env.SEC;
/**
 * 
 * 
 * @export
 * @class User
 */

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'createUser',

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof User
     */
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof User
     */
    value: function createUser(req, res) {
      console.log(req.body);

      var _validateSignup = (0, _validateSignup3.default)(req.body),
          errors = _validateSignup.errors,
          isvalid = _validateSignup.isvalid;

      if (!isvalid) {
        return res.status(400).json(errors);
      }
      user.findOne({
        where: { email: req.body.email.toLowerCase() }
      }).catch(function () {
        return res.status(500).send('A server error ocurred, Please try again later');
      }).then(function (existing) {
        if (!existing) {
          console.log(req.body.password);
          var Password = helper.hashPassword(req.body.password);
          user.create({
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: Password
          }).then(function (newUser) {

            // const token = jwt.sign({
            //   id: newUser.dataValues.id,
            //   firstName: newUser.dataValues.firstName,
            //   lastName: newUser.dataValues.lastName,
            //   email: newUser.dataValues.email,
            // }, //secret, { expiresIn: 86400 });

            if (newUser) {
              return res.status(201).json({
                status: 'success',
                // token,
                user: newUser
              });
            } else {
              return res.status(403).json({
                status: 'Fail',
                message: 'User with email already exists'
              });
            }
          }).catch(function (error) {
            return res.status(500).json({
              status: 'fail',
              message: error
            });
          });
        }
      });
      return this;
    }

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof User
     */

  }, {
    key: 'userLogin',
    value: function userLogin(req, res) {
      var _validateLogin = (0, _validateLogin3.default)(req.body),
          errors = _validateLogin.errors,
          isvalid = _validateLogin.isvalid;

      if (!isvalid) {
        return res.status(400).json(errors);
      }
      user.findOne({
        where: { email: req.body.email.toLowerCase() }
      }).then(function (foundUser) {
        if (foundUser) {
          var result = helper.decrypt(req.body.password, foundUser.dataValues.password);
          if (result) {
            var token = _jsonwebtoken2.default.sign({
              id: foundUser.dataValues.id,
              firstName: foundUser.dataValues.firstName,
              lastName: foundUser.dataValues.lastName,
              email: foundUser.dataValues.email
            }, secret, { expiresIn: 86400 });
            res.status(200).json({
              status: 'success',
              token: token,
              foundUser: foundUser
            });
          } else {
            res.status(401).json({
              status: 'fail',
              message: 'Email and password don\'t match'
            });
          }
        } else {
          res.status(404).json({
            status: 'fail',
            message: 'user with email ' + req.body.email + ' not found'
          });
        }
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof User
     */

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var password = req.body.password;
      user.findOne({
        where: {
          id: req.decoded.id
        }
      }).then(function (foundUser) {
        if (foundUser) {
          var result = helper.decrypt(password, foundUser.dataValues.password);
          if (result) {
            user.destroy({
              where: {
                id: req.decoded.id
              }
            }).then(function () {
              return res.status(200).send('Your account has been deleted successfully.');
            }).catch(function () {
              res.status(500).send('Unable to delete account now, please try again later');
            });
          }
        }
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @memberof User
     */

  }, {
    key: 'updateUser',
    value: function updateUser(req, res) {
      // const firstname = req.body.firstname;
      // const lastname = req.body.lastname;
      var email = req.body.email;
      var password = req.body.password;
      var confirmPassword = req.body.confirmPassword;

      if (!_validator2.default.isEmail(email)) {
        return res.status(400).send('Email is not valid');
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          status: 'Fail',
          message: 'Passwords don\'t match'
        });
      }
      user.findOne({
        where: {
          id: req.decoded.id
        }
      }).then(function (foundUser) {
        if (!foundUser) {
          return res.status(401).send('Unauthorized!');
        }
        if (foundUser) {
          var Update = {
            email: email.toLowerCase() || foundUser.dataValues.email,
            password: foundUser.dataValues.password || helper.hashPassword(password)
          };
          foundUser.update(Update).then(function () {
            return res.status(200).send('Profile update successful');
          }).catch(function (error) {
            console.log(error);
            return res.status(500).send('Internal server error. Unable to update profile');
          });
        }
      }).catch(function (error) {
        console.log(error);
        return res.status(500).send('Internal server error. Unable to update profile');
      });
      return this;
    }
  }]);

  return User;
}();

exports.default = User;