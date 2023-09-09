const { SECRET_KEY_JWT = 'mesto-secret' } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY_JWT);
  } catch (err) {
    next(new AuthError(('Требуется авторизация')));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};
