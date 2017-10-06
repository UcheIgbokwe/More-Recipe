'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipe = _models2.default.Recipe,
    User = _models2.default.User,
    Review = _models2.default.Review;


_dotenv2.default.config();
var secret = process.env.SECRET_TOKEN;

var reviewsController = {
  create: function create(request, response) {
    var body = request.body;

    var rules = {
      review: 'required|min:3'
    };

    var validation = new _validatorjs2.default(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }

    var token = request.headers['x-access-token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });

    var decodedId = _jsonwebtoken2.default.verify(token, secret);

    User.findById(decodedId.data.id).then(function (user) {
      if (!user) {
        return response.status(404).json({ errorCode: 404, message: 'User not found.' });
      }
    }).catch(function (error) {
      return response.status(400).json(error.message);
    });

    Recipe.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        return response.status(404).json({ code: 404, message: 'Recipe not found.' });
      }

      return Review.create({
        review: request.body.review,
        recipeId: request.params.id,
        userId: decodedId.data.id
      }).then(function (reviewPosted) {
        return response.status(201).json({ statusCode: 201, message: 'Review created.', data: reviewPosted });
      }).catch(function (error) {
        return response.status(404).json(error.message);
      });
    }).catch(function (error) {
      return response.status(400).json(error.message);
    });
  }
};

exports.default = reviewsController;