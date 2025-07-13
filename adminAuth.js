const jwt = require('jsonwebtoken');
const SECRET = 'admin_secreta';

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não enviado' });

  jwt.verify(token, SECRET, (err, admin) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.admin = admin;
    next();
  });
};
