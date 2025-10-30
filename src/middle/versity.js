import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const verifyaccessToken = (req, res, next) => {
 const header = req.get('Authorization');
 const refreshToken = req.get('Refresh-Token');
 if (!header || !refreshToken) {
    return 
  }
  else {
    const token = header.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.accessSecret);
      next();
    } catch (error) {
      return 
    }
  }
};

