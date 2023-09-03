const base64 = require('base-64');
require('dotenv').config();
var configurations = require('../../conf/config.json');

function _decodeCredentials(header) {
  const encode = header.trim().replace(/Basic\s+/i, '');
  const decode = base64.decode(encode);
  return decode.split(':');
}

function auth(req, res, next) {
  const [username, password] = _decodeCredentials(
    req.headers.authorization || ''
  );
    const user = configurations.users.find((user) => user.username === username);
    if (user && user.password === password) {
      return next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm="user_pages"');
      res.status(401).send('Authentication required!');
    }
}

module.exports = {
  auth,
};
