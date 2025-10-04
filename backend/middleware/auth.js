const jwt = require('jsonwebtoken');

const auth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check role permissions
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Token is not valid' });
    }
  };
};

module.exports = auth;
