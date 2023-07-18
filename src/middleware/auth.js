const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.token; // Get token from request headers
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }

      // Token is valid, save decoded token in request object
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.json({ message: "Internal server error" });
  }
};

module.exports = verifyToken;
