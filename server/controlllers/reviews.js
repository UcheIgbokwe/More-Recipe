import models from '../models';
import validateReview from '../functions/validateReview';

const review = models.Review;
const recipe = models.Recipe;
const user = models.User;

/**
 * 
 * 
 * @export
 * @class Review
 */
export default class Review {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Review
   */
  addReview(req, res) {
    const { errors, isvalid } = validateReview(req.body);
    if (!(isvalid)) {
      return res.status(400)
        .json(errors);
    }
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to review');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .send(`No recipe with id ${req.params.recipeId}`);
        }
        if (foundRecipe) {
          review.findOne({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          })
            .then((foundReview) => {
              if (!foundReview) {
                const newReview = {
                  content: req.body.comment,
                  userId: req.decoded.id,
                  recipeId: req.params.recipeId
                };
                review.create(newReview)
                  .then((createdReview) => {
                    return res.status(201)
                      .json({
                        status: 'Success',
                        createdReview,
                      });
                  })
                  .catch((error) => {
                    return res.status(500)
                      .json({
                        status: 'Fail. Unable to add review',
                        error,
                      });
                  });
              }
              if (foundReview) {
                return res.status(403)
                  .send('You\'ve posted a review for this recipe already');
              }
            })
            .catch((error) => {
              return res.status(500)
                .json({
                  status: 'Fail. Unable to add review',
                  error,
                });
            });
        }
      })
      .catch(() => {
        return res.status(500)
          .send('Internal error ocurred. Please try again later');
      });
    return this;
  }
}
