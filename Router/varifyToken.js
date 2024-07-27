const jwt = require("jsonwebtoken");
// const User = require("../model/User");

const varifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_Sec, (err, user) => {
      if (err) res.status(403).json({ message: "Token is invalid" });
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ msg: "No token, authorization denied" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  varifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  varifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
  });
};
module.exports = {
  varifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
