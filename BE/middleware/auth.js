import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.user = user;
    next(); 
  });
};

export default authenticateToken;
