const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const token = auth ? auth.split(' ')[1] : ''
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decoded;
    next()
  } catch(err) {
    next(err)
  }
}