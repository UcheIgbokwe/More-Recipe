import models from '../models';

const review = models.Review;
const recipe = models.Recipe;
const user = models.User;
const upvote = models.Upvote;
const downvote = models.Downvote;

/**
 * 
 * 
 * @export
 * @class Vote
 */
export default class Vote {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Vote
   */
  upvote(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to review');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    // check recipe by user at downvote
    downvote.findOne({
      where: {
        recipeId: req.params.recipeId,
        $and: { userId: req.decoded.id }
      }
    })
      .then((found) => {
        if (!found) {
          return res.status(404).send('not found');
        }
        return res.status(200).send('found');
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
    // if it exists, delete it
    // reduce it
    return this;
  }
}
