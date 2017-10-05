'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipe = _models2.default.Recipe;
var user = _models2.default.User;
var review = _models2.default.Review;
var favourite = _models2.default.Favourite;

/**
 * 
 * 
 * @export
 * @class Favourite
 */

var Favourite = function () {
  function Favourite() {
    _classCallCheck(this, Favourite);
  }

  _createClass(Favourite, [{
    key: 'addFavourite',

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Favourite
     */
    value: function addFavourite(req, res) {
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe to favourite');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      recipe.findById(req.params.recipeId).then(function (found) {
        if (!found) {
          return res.status(404).send('recipe doesn\'t exist in catalogue');
        }
        favourite.findOne({
          where: {
            recipeId: req.params.recipeId,
            $and: {
              userId: req.decoded.id
            }
          }
        }).then(function (foundRecipe) {
          if (foundRecipe) {
            return res.status(403).json({
              status: 'Fail',
              message: 'Already added this recipe to your favourites'
            });
          }
          favourite.create({
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }).then(function () {
            return res.status(201).json({
              status: 'Success',
              message: 'Recipe added to favourites'
            });
          }).catch(function () {
            return res.status(500).send('Unable to add to favourites due to server error');
          });
        }).catch(function () {
          return res.status(500).send('a server error ocurred');
        });
      }).catch(function () {
        return res.status(500).send('Internal server error, please try again later');
      });

      return this;
    }
    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Favourite
     */

  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      favourite.findAll({
        where: {
          userId: req.params.userId
        },
        include: [{
          model: recipe, attributes: ['name', 'ingredients', 'directions']
        }]
      }).then(function (found) {
        if (!found) {
          return res.status(404).json({
            status: 'success',
            message: 'You have no recipes added as favourites'
          });
        }
        if (found) {
          return res.status(200).json({
            status: 'Success',
            favourites: found
          });
        }
      }).catch(function (error) {
        console.log(error);
        return res.status(500).send('Unable to get favourites, internal server error');
      });
      return this;
    }
  }]);

  return Favourite;
}();

exports.default = Favourite;