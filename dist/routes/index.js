'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokenValidator = require('../middlewares/tokenValidator');

var _tokenValidator2 = _interopRequireDefault(_tokenValidator);

var _users = require('../controlllers/users');

var User = _interopRequireWildcard(_users);

var _recipes = require('../controlllers/recipes');

var Recipe = _interopRequireWildcard(_recipes);

var _reviews = require('../controlllers/reviews');

var Review = _interopRequireWildcard(_reviews);

var _votes = require('../controlllers/votes');

var Vote = _interopRequireWildcard(_votes);

var _favorites = require('../controlllers/favorites');

var Favorite = _interopRequireWildcard(_favorites);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = new User.default();
var recipe = new Recipe.default();
var review = new Review.default();
var vote = new Vote.default();
var favorite = new Favorite.default();

var router = function router(app) {
  app.get('/', _tokenValidator2.default, function (req, res) {
    res.status(200).send('Welcome to  the Users API!');
  });
  app.post('/api/v1/users/signup', user.createUser); // user signup route
  app.post('/api/v1/users/signin', user.userLogin); // user sign in route
  // app.post('/api/v1/recipes', authorize, recipe.addRecipe); // auth user adds recipe
  // app.put('/api/v1/recipes/:recipeId', authorize, recipe.updateRecipe); // auth user updates recipe
  // app.delete('/api/v1/recipes/:recipeId', authorize, recipe.deleteRecipe); // auth user deletes recipe
  // app.get('/api/v1/recipes/:recipeId', recipe.viewOne); // user can view a recipe
  // app.get('/api/v1/recipes', recipe.getAll); // user can get all recipes
  // app.get('/api/v1/recipes/user/all', authorize, recipe.getAllUser); // user can get all recipes by them
  // app.post('/api/v1/recipes/:recipeId/review', authorize, review.addReview); // auth user can add review to recipe
  // app.get('/api/v1/recipes?sort=up&order=des', recipe.getAll); // user can get recipe with most upvotes
  // app.put('/api/v1/recipes/:recipeId/favourite', authorize, favorite.addFavourite); // User can add recipe as favourite
  // app.get('/api/v1/users/:userId/recipes', authorize, favorite.getAll); // User can get all favourites
  // app.delete('/api/v1/users/delete', authorize, user.delete); // user delete account
  // app.put('/api/v1/users/update', authorize, user.updateUser); // user update profile
};

exports.default = router;