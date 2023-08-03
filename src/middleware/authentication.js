const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const authorization = req.headers["auth"];

  if (!authorization || authorization == "") {
    return res.status(201).send("Authorization token required");
  }
  try {
    const decode = jwt.verify(authorization, process.env.SECRET_KEY);
    req.user = decode;
  } catch (error) {
    return res.status(500).send("error");
  }
  next();
};
module.exports = authenticate;
