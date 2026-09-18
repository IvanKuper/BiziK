const jwt = require("jsonwebtoken");

const signToken = (user) =>
  jwt.sign({ _id: user._id, biz: user.biz }, process.env.secretKey, {
    expiresIn: "7d",
  });

module.exports = { signToken };
