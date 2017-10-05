import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateRecipe = (input) => {
  const errors = {};
  if (validator.isEmpty(input.name)) {
    errors.name = 'Recipe name is empty!';
  }
  if (validator.isEmpty(input.ingredients)) {
    errors.ingredients = 'Ingredients field is empty!';
  }
  if (validator.isEmpty(input.description)) {
    errors.description = 'Add description to cook!';
  }
  if (!validator.isLength(input.name, { min: 5, max: 100 })) {
    errors.name = 'Recipe name must be a minimum of 5 characters';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateRecipe;
