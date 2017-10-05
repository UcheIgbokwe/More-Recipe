'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validateReview2 = require('../functions/validateReview');

var _validateReview3 = _interopRequireDefault(_validateReview2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var review = _models2.default.Review;
var recipe = _models2.default.Recipe;
var user = _models2.default.User;

/**
 * 
 * 
 * @export
 * @class Review
 */

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, [{
    key: 'addReview',

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Review
     */
    value: function addReview(req, res) {
      var _validateReview = (0, _validateReview3.default)(req.body),
          errors = _validateReview.errors,
          isvalid = _validateReview.isvalid;

      if (!isvalid) {
        return res.status(400).json(errors);
      }
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe to review');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      recipe.findById(req.params.recipeId).then(function (foundRecipe) {
        if (!foundRecipe) {
          return res.status(404).send('No recipe with id ' + req.params.recipeId);
        }
        if (foundRecipe) {
          review.findOne({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          }).then(function (foundReview) {
            if (!foundReview) {
              var newReview = {
                content: req.body.comment,
                userId: req.decoded.id,
                recipeId: req.params.recipeId
              };
              review.create(newReview).then(function (createdReview) {
                return res.status(201).json({
                  status: 'Success',
                  createdReview: createdReview
                });
              }).catch(function (error) {
                return res.status(500).json({
                  status: 'Fail. Unable to add review',
                  error: error
                });
              });
            }
            if (foundReview) {
              return res.status(403).send('You\'ve posted a review for this recipe already');
            }
          }).catch(function (error) {
            return res.status(500).json({
              status: 'Fail. Unable to add review',
              error: error
            });
          });
        }
      }).catch(function () {
        return res.status(500).send('Internal error ocurred. Please try again later');
      });
      return this;
    }
  }]);

  return Review;
}();

exports.default = Review;