var jwt = require('jwt-simple'),
    moment = require('moment');
console.log('auth.js')
module.exports = {
  /* Login Required Middleware */
  ensureAuthenticated: function (req, res, next) {    
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = null;
    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET );
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired.' });
    }
    req.user = payload.sub;
    next();
  },

  /*
  * Generate JSON Web Token
  */
  createJWT: function (user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET);
  }
};
