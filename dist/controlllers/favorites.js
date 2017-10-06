'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorites = _models2.default.Favorites,
    Recipes = _models2.default.Recipes;


var favoritesController = {
  /**
   * Favorite a recipe
   *
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */

  create: function create(request, response) {
    if (!request.params.id) {
      return response.status(404).json({ error: 'Recipe id is required.' });
    }
    Favorites.findOne({
      where: {
        recipeId: request.params.id,
        userId: request.decoded.id
      }
    }).then(function (favorite) {
      if (favorite) {
        return response.status(400).json({
          message: 'Recipe already favorited.'
        });
      }
      return Favorites.create({
        recipeId: request.params.id,
        userId: request.decoded.id
      });
    }).then(function (favoriteSuccess) {
      return response.status(201).json({
        message: 'Recipe successfully favorited.',
        data: favoriteSuccess
      });
    }).catch(function (error) {
      return response.status(400).json({
        message: 'An error occured during this operation',
        error: error.message
      });
    });
  },
  getAll: function getAll(request, response) {
    Favorites.findAll({
      where: { userId: request.params.id },
      include: [{ model: Recipes }]
    }).then(function (isFound) {
      if (isFound.length === 0) {
        return response.status(404).json({ message: 'No favorites found.' });
      } else if (isFound) {
        return response.status(200).json({ message: isFound });
      }
    }).catch(function (error) {
      return response.status(400).json({ error: error.message });
    });
  }
};

exports.default = favoritesController;