import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateLogin = (input) => {
  const errors = {};
  if (validator.isEmpty(input.email)) {
    errors.email = 'Email is empty!';
  }
  if (!(validator.isEmail(input.email))) {
    errors.email = 'Email is invalid!';
  }
  if (validator.isEmpty(input.password)) {
    errors.password = 'Password is empty!';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateLogin;
