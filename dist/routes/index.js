'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../controlllers/users');

var _users2 = _interopRequireDefault(_users);

var _recipes = require('../controlllers/recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _reviews = require('../controlllers/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _tokenValidator = require('../middlewares/tokenValidator');

var _tokenValidator2 = _interopRequireDefault(_tokenValidator);

var _favorites = require('../controlllers/favorites');

var _favorites2 = _interopRequireDefault(_favorites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(router) {
  router.get('/', function (request, response) {
    response.status(200).send({ message: 'Hello World!' });
  });

  router.post('/users/signup', _users2.default.create);
  router.post('/users/signin', _users2.default.login);

  /**
   * Recipe routes
   */
  router.post('/recipes', _tokenValidator2.default.verifyToken, _recipes2.default.create);
  router.get('/recipes/:id', _recipes2.default.get);
  router.get('/recipes', _recipes2.default.getAll);
  router.delete('/recipes/:id', _tokenValidator2.default.verifyToken, _recipes2.default.delete);
  router.put('/recipes/:id', _tokenValidator2.default.verifyToken, _recipes2.default.update);

  /**
   * Recipe review routes
   */
  router.post('/recipes/:id/reviews', _tokenValidator2.default.verifyToken, _reviews2.default.create);

  /**
   * Recipe favorite routes
   */
  router.post('/users/:id/recipes', _tokenValidator2.default.verifyToken, _favorites2.default.create);
  router.get('/users/:id/recipes', _favorites2.default.getAll);
};

exports.default = routes;