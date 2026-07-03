const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.send("Invalid email or password");
    return;
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (isMatch) {
    res.send("Login is complete");
  } else {
    res.send("Invalid email or password");
  }
};
