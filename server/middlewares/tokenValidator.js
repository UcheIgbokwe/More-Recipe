import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;
const validate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
      // verify token
    jwt.verify(token, secret, ((error, decoded) => {
      if (error) {
        return res.status(401)
          .json({
            error: 'true',
            message: 'failed to authenticaticate token.'
          });
      }
      req.decoded = decoded;
      next();
    }));
  } else {
      // if there is no token
    return res.status(401)
      .json({
        error: 'true',
        message: 'No token provided.'
      });
  }
};

export default validate;

