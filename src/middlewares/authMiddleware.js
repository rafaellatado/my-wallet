import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.sendStatus(401);
  
      req.userId = decoded.userId; 
      next(); 
    });

  } catch (error) {
    return res.sendStatus(500);
  }
}
