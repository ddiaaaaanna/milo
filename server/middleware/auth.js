const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = result.id;
    next();
  } catch (error) {
    res.status(401).send("Not authorised");
  }
};

module.exports = { auth };
