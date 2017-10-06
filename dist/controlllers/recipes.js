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

var Recipes = _models2.default.Recipes,
    User = _models2.default.User;

console.log(Recipes, User);

/**
 * Get secret key from environment variable
 */
_dotenv2.default.config();
var secret = process.env.SECRET_TOKEN;

/**
 * Requirements
 */
var recipeController = {
  create: function create(request, response) {
    var body = request.body;

    var rules = {
      recipeName: 'required|min:3',
      ingredient: 'required',
      recipeDirection: 'required:min:6'
    };
    var token = request.headers['x-access-token'];
    if (!token) {
      return response.status(401).send({ auth: false, message: 'No token provided.' });
    }

    var decodedId = _jsonwebtoken2.default.verify(token, secret);

    var validation = new _validatorjs2.default(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }
    User.findById(decodedId.data.id).then(function (user) {
      if (!user) {
        response.status(404).json({ errorCode: 404, message: 'User not found.' });
      }
      return Recipes.create({
        userId: decodedId.data.id,
        recipeName: request.body.recipeName,
        ingredientQuantity: request.body.ingredientQuantity,
        ingredient: request.body.ingredient,
        recipeDirection: request.body.recipeDirection,
        recipeImage: request.body.recipeImage
      }).then(function (recipe) {
        return response.status(201).json({ message: 'Recipe created successfully ', recipe: recipe });
      }).catch(function (error) {
        return response.status(404).send(error.message);
      });
    }).catch(function (error) {
      return response.status(404).send(error.message);
    });
  },


  /**
   * Get a single recipe
   * @param {any} request
   * @param {any} response
   * @returns {obj} json
   */
  get: function get(request, response) {
    return Recipes.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        response.status(404).json({ message: 'Recipe not found' });
      }
      return recipe.update({ views: recipe.views + 1 });
    }).then(function (recipe) {
      if (!recipe) {
        response.status(404).json({ message: 'Recipe not found' });
      }
      response.status(200).json({ recipe: recipe });
    }).catch(function (error) {
      return response.status(400).json({ error: error.message });
    });
  },


  /**
   * Return all recipes;
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */
  getAll: function getAll(request, response) {
    return Recipes.findAll().then(function (recipes) {
      return response.status(200).json({ message: recipes });
    }).catch(function (error) {
      return response.status(400).json(error);
    });
  },
  delete: function _delete(request, response) {
    return Recipes.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        response.status(404).json({ message: 'Recipe not found' });
      }
      var token = request.headers['x-access-token'];
      if (!token) {
        return response.status(401).json({ auth: false, message: 'No token provided.' });
      } else if (token) {
        var decodedId = _jsonwebtoken2.default.verify(token, secret);
        if (decodedId.data.id === recipe.userId) {
          return recipe.destroy().then(function () {
            return response.status(200).json({ message: 'Recipe deleted' });
          }).catch(function (error) {
            return response.status(400).json(error);
          });
        }
      }
    }).catch(function (error) {
      return response.status(400).json(error);
    });
  },
  update: function update(request, response) {
    var body = request.body;

    return Recipes.findById(request.params.id).then(function (recipe) {
      if (!recipe) {
        response.status(404).json({ message: 'Recipe not found.' });
      }
      return Recipes.update({
        recipeName: body.recipeImage,
        ingredientQuantity: body.ingredientQuantity,
        ingredient: body.ingredient,
        recipeDirection: body.recipeDirection,
        recipeImage: body.recipeImage
      }, { where: { id: request.params.id } });
    }).then(function (updatedRecipe) {
      return response.status(200).json({ message: 'Update successful', updatedRecipe: updatedRecipe });
    }).catch(function (error) {
      return response.status(400).json({ error: error.message });
    });
  }
};

exports.default = recipeController;