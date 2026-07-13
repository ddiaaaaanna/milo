const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).send("Invalid email or password");
    return;
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send(token);
  } else {
    res.send("Invalid email or password");
  }
};

module.exports = { loginUser };
