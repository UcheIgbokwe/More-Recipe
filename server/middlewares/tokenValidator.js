import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET_TOKEN;
const User = db.User;

const authourization = {
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: error.message });
        }
        User.findById(decoded.data.id)
          .then((user) => {
            if (!user) {
              return res.json({ message: error.message });
            }
            req.decoded = decoded.data;
            return next();
          })
          .catch(err => res.status(404).json({ error: err.message }));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  },
  verifyUser(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          req.user = user;
          return next();
        }
        return res.status(404).json({ message: 'User not found' });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }
};
export default authourization;
