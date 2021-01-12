const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token -->', token);
  if (req.method === 'OPTIONS') {
    return next();
  } else if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided"
    })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      console.log('decodeToken -->', decodeToken);
      if (!err && decodeToken) {
        User.findOne({
            where: {
              id: decodeToken.id
            }
          })
          .then(user => {
            console.log('user -->', user);
            if (!user) throw err;
            console.log('req -->', req);
            req.user = user;
            console.log('next -->', next);
            return next();
          })
          .catch(err => next(err));
      } else {
        req.errors = err;
        return res.status(500).send('Not Authorized');
      }
    });
  }
};

module.exports = validateSession;