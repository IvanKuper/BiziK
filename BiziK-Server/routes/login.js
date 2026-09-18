// Packages & Models Import
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const rateLimit = require("../middlewares/rateLimit");
const { signToken } = require("../utils/token");

const loginSchema = joi.object({
  email: joi.string().required().min(6).max(1024).email(),
  password: joi.string().required().min(8).max(1024),
});

router.post("/", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), async (req, res) => {
  try {
    // Joi Validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Check if user Exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Check Password (Bcrypt)
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Invalid email or password");

    res.status(200).send({ token: signToken(user) });
  } catch (error) {
    res.status(400).send("Error in post Login");
  }
});

module.exports = router;
