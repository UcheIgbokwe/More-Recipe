import models from '../models';
import validateRecipe from '../functions/validateRecipe';

const recipe = models.Recipe;
/* const user = models.User;
const review = models.Review; */

/**
 * 
 * 
 * @export
 * @class Recipe
 */
export default class Recipe {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  addRecipe(req, res) {
    const { errors, isvalid } = validateRecipe(req.body);
    if (!(isvalid)) {
      return res.status(400)
        .json(errors);
    }
    recipe.findOne({
      where: {
        name: req.body.name.toLowerCase(),
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          return res.status(403)
            .json({
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
          })
            .then((newRecipe) => {
              res.status(201)
                .json({
                  status: 'success',
                  recipe: newRecipe
                });
            })
            .catch((error) => {
              res.status(500)
                .json({
                  status: 'Fail',
                  message: error
                });
            });
        }
      })
      .catch((error) => {
        res.status(500)
          .json({
            status: 'fail',
            error
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
  updateRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to update');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    const name = req.body.name;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    recipe.findOne({
      where: {
        id: req.params.recipeId,
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          const update = {
            name: name.toLowerCase() || foundRecipe.dataValues.name,
            ingredients: ingredients.toLowerCase() || foundRecipe.dataValues.ingredients,
            directions: description.toLowerCase() || foundRecipe.dataValues.description
          };
          foundRecipe.update(update)
            .then(updatedRecipe => res.status(200)
              .json({
                status: 'Update successful',
                recipe: updatedRecipe
              }))
            .catch(error => res.status(500)
              .json({
                status: 'Fail',
                message: error
              }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId}`
            });
        }
      })
      .catch(error => res.status(500)
        .json({
          status: 'Fail',
          error,
        }));
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
  deleteRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to delete');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findOne({
      where: {
        id: req.params.recipeId,
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          recipe.destroy({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          })
            .then(() => res.status(200)
              .json({
                status: 'Success',
                message: 'recipe deleted'
              }))
            .catch(error => res.status(500)
              .send(error));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(error => res.status(500)
        .json({
          status: 'Fail',
          error,
        }));
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
  getAll(req, res) {
    if (!req.query.sort) {
      recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            return res.status(200)
              .json({
                status: 'Success',
                recipes,
              });
          }
          if (!recipes) {
            return res.status(404)
              .send('No recipes found');
          }
        })
        .catch(error => res.status(500)
          .json({
            error,
          }));
    }
    if (req.query.sort) {
      recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            const sorted = recipes.sort((a, b) => b.upvote - a.upvote);
            return res.status(200)
              .json({
                status: 'Succes',
                sorted,
              });
          }
          if (!recipes) {
            return res.status(200)
              .send('Currently no recipes');
          }
        })
        .catch(error => res.status(500)
          .json({
            status: 'Fail',
            error,
          }));
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
  viewOne(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findOne({
      where: { id: req.params.recipeId },
      include: [
        { model: models.User, attributes: ['firstName', 'lastName', 'email'] },
        { model: models.Review, attributes: ['comment'] }
      ]
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .send(`Can't find recipe with id ${req.params.recipeId}`);
        }
        if (foundRecipe) {
          // add reviews
          return res.status(200)
            .json({
              status: 'Success',
              foundRecipe,
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .json({
            status: 'Fail',
            error,
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
  getAllUser(req, res) {
    recipe.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
				 { model: models.Review, attributes: ['comment'] }
      ]
    })
      .then((all) => {
        if (!all) {
          return res.status(404)
            .send('You currently have no recipes');
        }
        if (all) {
          return res.status(200)
            .json({
              status: 'Success',
              recipes: all
            });
        }
      })
      .catch(() => {
        return res.status(500)
          .send('Unable to find all recipes by you');
      });
    return this;
  }
}
