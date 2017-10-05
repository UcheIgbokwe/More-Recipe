import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateReview = (input) => {
  const errors = {};
  if (validator.isEmpty(input.comment)) {
    errors.comment = 'Review comment is empty!';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateReview;
