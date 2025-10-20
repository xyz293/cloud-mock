import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const verifyToken = (req, res, next) => {
 const header = req.get('Authorization');
 if (!header) {
    return res.status(401).json({ message: 'No token provided' });
  }
  else {
    const token = header.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.secret);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
};