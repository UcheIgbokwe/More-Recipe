import express from 'express';
import usersController from '../controlllers/users';
import recipesController from '../controlllers/recipes';
import reviewsController from '../controlllers/reviews';
import authorization from '../middlewares/tokenValidator';
import favoritesController from '../controlllers/favorites';

const router = express.Router();

  router.get('/', (request, response) => {
    response.status(200)
      .send({ message: 'Welcome to Recipesforall!' });
  });

  router.post('/users/signup', usersController.create);
  router.post('/users/signin', usersController.login);

  /**
   * Recipe routes
   */
  router.post('/recipes', authorization.verifyToken, recipesController.create);
  router.get('/recipes/:id', recipesController.get);
  router.get('/recipes', recipesController.getAll);
  router.delete('/recipes/:id', authorization.verifyToken, recipesController.delete);
  // router.get('/recipes/?sort=upvotes&order=desc', recipesController.getUpVotes);

  /**
   * Recipe review routes
   */
  router.post('/recipes/:id/reviews', authorization.verifyToken, reviewsController.create);

  /**
   * Recipe favorite routes
   */
  router.post('/users/:id/recipes', authorization.verifyToken, favoritesController.create);
  router.get('/users/:id/recipes', favoritesController.getAll);


export default router;

