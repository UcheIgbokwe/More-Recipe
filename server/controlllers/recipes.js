import dotenv from 'dotenv';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/';

const { Recipes, User } = db;

/**
 * Get secret key from environment variable
 */
dotenv.config();
const secret = process.env.SECRET_TOKEN;

const recipeController = {
  create(request, response) {
    const { body } = request;
    const rules = {
      recipeName: 'required|min:3',
      ingredient: 'required',
      recipeDirection: 'required:min:6'
    };

    const token = request.headers['x-access-token'];
    if (!token) {
      return response.status(401)
        .send({ auth: false, message: 'No token provided.' });
    }

    const decodedId = jwt.verify(token, secret);

    const validation = new Validator(body, rules);
    if (validation.fails()) {
      return response.json({ error: validation.errors.all() });
    }
    User.findById(decodedId.data.id)
      .then((user) => {
        if (!user) {
          response.status(404)
            .json({ errorCode: 404, message: 'User not found.' });
        }
        return Recipes.create({
          userId: decodedId.data.id,
          recipeName: request.body.recipeName,
          ingredientQuantity: request.body.ingredientQuantity,
          ingredient: request.body.ingredient,
          recipeDirection: request.body.recipeDirection,
          recipeImage: request.body.recipeImage
        })
          .then(recipe => response.status(201)
            .json({ message: 'Recipe created successfully ', recipe }))
          .catch(error => response.status(404)
            .send(error.message));
      })
      .catch(error => response.status(404)
        .send(error.message));
  },

  /**
   * Get a single recipe
   * @param {any} request
   * @param {any} response
   * @returns {obj} json
   */
  get(request, response) {
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        return recipe
          .update({ views: recipe.views + 1 });
      })
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        response.status(200)
          .json({ recipe });
      })
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },

  /**
   * Return all recipes;
   * @param {any} request
   * @param {any} response
   * @returns {obj} obj
   */
  getAll(request, response) {
    return Recipes
      .findAll()
      .then(recipes => response.status(200)
        .json({ message: recipes }))
      .catch(error => response.status(400)
        .json(error));
  },

  delete(request, response) {
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found' });
        }
        const token = request.headers['x-access-token'];
        if (!token) {
          return response.status(401)
            .json({ auth: false, message: 'No token provided.' });
        } else
        if (token) {
          const decodedId = jwt.verify(token, secret);
          if (decodedId.data.id === recipe.userId) {
            return recipe
              .destroy()
              .then(() => response.status(200)
                .json({ message: 'Recipe deleted' }))
              .catch(error => response.status(400)
                .json(error));
          }
        }
      })
      .catch(error => response.status(400)
        .json(error));
  },

  update(request, response) {
    const { body } = request;
    return Recipes
      .findById(request.params.id)
      .then((recipe) => {
        if (!recipe) {
          response.status(404)
            .json({ message: 'Recipe not found.' });
        }
        return Recipes
          .update({
            recipeName: body.recipeImage,
            ingredientQuantity: body.ingredientQuantity,
            ingredient: body.ingredient,
            recipeDirection: body.recipeDirection,
            recipeImage: body.recipeImage
          }, { where: { id: request.params.id } });
      })
      .then(updatedRecipe => response.status(200)
        .json({ message: 'Update successful', updatedRecipe }))
      .catch(error => response.status(400)
        .json({ error: error.message }));
  },
};

export default recipeController;
