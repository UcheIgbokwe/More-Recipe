import authorize from '../middlewares/tokenValidator';
import * as User from '../controlllers/users';
import * as Recipe from '../controlllers/recipes';
import * as Review from '../controlllers/reviews';
import * as Vote from '../controlllers/votes';
import * as Favorite from '../controlllers/favorites';

const user = new User.default();
const recipe = new Recipe.default();
const review = new Review.default();
const vote = new Vote.default();
const favorite = new Favorite.default();

const router = (app) => {
  app.get('/', authorize, (req, res) => {
    res.status(200)
      .send('Welcome to  the Users API!');
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

export default router;
