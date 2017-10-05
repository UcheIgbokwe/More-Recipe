'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validateRecipe2 = require('../functions/validateRecipe');

var _validateRecipe3 = _interopRequireDefault(_validateRecipe2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipe = _models2.default.Recipe;
/* const user = models.User;
const review = models.Review; */

/**
 * 
 * 
 * @export
 * @class Recipe
 */

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, [{
    key: 'addRecipe',

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */
    value: function addRecipe(req, res) {
      var _validateRecipe = (0, _validateRecipe3.default)(req.body),
          errors = _validateRecipe.errors,
          isvalid = _validateRecipe.isvalid;

      if (!isvalid) {
        return res.status(400).json(errors);
      }
      recipe.findOne({
        where: {
          name: req.body.name.toLowerCase(),
          $and: {
            userId: req.decoded.id
          }
        }
      }).then(function (foundRecipe) {
        if (foundRecipe) {
          return res.status(403).json({
            status: 'Fail',
            message: 'You already have a recipe with this name'
          });
        }
        if (!foundRecipe) {
          recipe.create({
            name: req.body.name.toLowerCase(),
            userId: req.decoded.id,
            ingredients: req.body.ingredients.toLowerCase(),
            directions: req.body.description.toLowerCase()
          }).then(function (newRecipe) {
            res.status(201).json({
              status: 'success',
              recipe: newRecipe
            });
          }).catch(function (error) {
            res.status(500).json({
              status: 'Fail',
              message: error
            });
          });
        }
      }).catch(function (error) {
        res.status(500).json({
          status: 'fail',
          error: error
        });
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */

  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe to update');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      var name = req.body.name;
      var description = req.body.description;
      var ingredients = req.body.ingredients;
      recipe.findOne({
        where: {
          id: req.params.recipeId,
          $and: {
            userId: req.decoded.id
          }
        }
      }).then(function (foundRecipe) {
        if (foundRecipe) {
          var update = {
            name: name.toLowerCase() || foundRecipe.dataValues.name,
            ingredients: ingredients.toLowerCase() || foundRecipe.dataValues.ingredients,
            directions: description.toLowerCase() || foundRecipe.dataValues.description
          };
          foundRecipe.update(update).then(function (updatedRecipe) {
            return res.status(200).json({
              status: 'Update successful',
              recipe: updatedRecipe
            });
          }).catch(function (error) {
            return res.status(500).json({
              status: 'Fail',
              message: error
            });
          });
        }
        if (!foundRecipe) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Can\'t find recipe with id ' + req.params.recipeId
          });
        }
      }).catch(function (error) {
        return res.status(500).json({
          status: 'Fail',
          error: error
        });
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe to delete');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      recipe.findOne({
        where: {
          id: req.params.recipeId,
          $and: {
            userId: req.decoded.id
          }
        }
      }).then(function (foundRecipe) {
        if (foundRecipe) {
          recipe.destroy({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          }).then(function () {
            return res.status(200).json({
              status: 'Success',
              message: 'recipe deleted'
            });
          }).catch(function (error) {
            return res.status(500).send(error);
          });
        }
        if (!foundRecipe) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Can\'t find recipe with id ' + req.params.recipeId + ' by you'
          });
        }
      }).catch(function (error) {
        return res.status(500).json({
          status: 'Fail',
          error: error
        });
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */

  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      if (!req.query.sort) {
        recipe.findAll().then(function (recipes) {
          if (recipes) {
            return res.status(200).json({
              status: 'Success',
              recipes: recipes
            });
          }
          if (!recipes) {
            return res.status(404).send('No recipes found');
          }
        }).catch(function (error) {
          return res.status(500).json({
            error: error
          });
        });
      }
      if (req.query.sort) {
        recipe.findAll().then(function (recipes) {
          if (recipes) {
            var sorted = recipes.sort(function (a, b) {
              return b.upvote - a.upvote;
            });
            return res.status(200).json({
              status: 'Succes',
              sorted: sorted
            });
          }
          if (!recipes) {
            return res.status(200).send('Currently no recipes');
          }
        }).catch(function (error) {
          return res.status(500).json({
            status: 'Fail',
            error: error
          });
        });
      }
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @memberof Recipe
     */

  }, {
    key: 'viewOne',
    value: function viewOne(req, res) {
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      recipe.findOne({
        where: { id: req.params.recipeId },
        include: [{ model: _models2.default.User, attributes: ['firstName', 'lastName', 'email'] }, { model: _models2.default.Review, attributes: ['comment'] }]
      }).then(function (foundRecipe) {
        if (!foundRecipe) {
          return res.status(404).send('Can\'t find recipe with id ' + req.params.recipeId);
        }
        if (foundRecipe) {
          // add reviews
          return res.status(200).json({
            status: 'Success',
            foundRecipe: foundRecipe
          });
        }
      }).catch(function (error) {
        console.log(error);
        return res.status(500).json({
          status: 'Fail',
          error: error
        });
      });
      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Recipe
     */

  }, {
    key: 'getAllUser',
    value: function getAllUser(req, res) {
      recipe.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [{ model: _models2.default.Review, attributes: ['comment'] }]
      }).then(function (all) {
        if (!all) {
          return res.status(404).send('You currently have no recipes');
        }
        if (all) {
          return res.status(200).json({
            status: 'Success',
            recipes: all
          });
        }
      }).catch(function () {
        return res.status(500).send('Unable to find all recipes by you');
      });
      return this;
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;