'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var review = _models2.default.Review;
var recipe = _models2.default.Recipe;
var user = _models2.default.User;
var upvote = _models2.default.Upvote;
var downvote = _models2.default.Downvote;

/**
 * 
 * 
 * @export
 * @class Vote
 */

var Vote = function () {
  function Vote() {
    _classCallCheck(this, Vote);
  }

  _createClass(Vote, [{
    key: 'upvote',

    /**
     * 
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof Vote
     */
    value: function upvote(req, res) {
      if (!req.params.recipeId) {
        return res.status(400).send('Include ID of recipe to review');
      }
      if (isNaN(req.params.recipeId)) {
        return res.status(400).send('Invalid recipeId. recipeId should be a number');
      }
      // check recipe by user at downvote
      downvote.findOne({
        where: {
          recipeId: req.params.recipeId,
          $and: { userId: req.decoded.id }
        }
      }).then(function (found) {
        if (!found) {
          return res.status(404).send('not found');
        }
        return res.status(200).send('found');
      }).catch(function (error) {
        return res.status(500).json(error);
      });
      // if it exists, delete it
      // reduce it
      return this;
    }
  }]);

  return Vote;
}();

exports.default = Vote;