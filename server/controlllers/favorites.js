import db from '../models/';

const Favorites = db.Favorites;
const Recipes = db.Recipes;

const favoritesController = {
  /**
   * Favorite a recipe
   *
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */

  create(request, response) {
    if (!request.params.id) {
      return response.status(404).json({ error: 'Recipe id is required.' });
    }
    Favorites.findOne({
      where: {
        recipeId: request.params.id,
        userId: request.decoded.id
      }
    })
      .then((favorite) => {
        if (favorite) {
          return response.status(400).json({
            message: 'Recipe already favorited.'
          });
        }
        return Favorites.create({
          recipeId: request.params.id,
          userId: request.decoded.id
        });
      })
      .then(favoriteSuccess => response.status(201).json({
        message: 'Recipe successfully favorited.',
        data: favoriteSuccess
      }))
      .catch(error => response.status(400).json({
        message: 'An error occured during this operation',
        error: error.message
      }));
  },

  getAll(request, response) {
    Favorites.findAll({
      where: { userId: request.params.id },
      include: [{ model: Recipes }]
    })
      .then((isFound) => {
        if (isFound.length === 0) {
          return response.status(404).json({ message: 'No favorites found.' });
        } else
        if (isFound) {
          return response.status(200).json({ message: isFound });
        }
      })
      .catch(error => response.status(400).json({ error: error.message }));
  }
};

export default favoritesController;
