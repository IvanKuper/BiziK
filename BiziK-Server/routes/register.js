// Packages & Models Import
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const rateLimit = require("../middlewares/rateLimit");
const { signToken } = require("../utils/token");

// Register Schema Validations
const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).max(1024).email(),
  password: joi
    .string()
    .required()
    .min(8)
    .max(1024)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .messages({
      "string.pattern.base": "Password must include a letter and a number",
    }),
  biz: joi.boolean().required(),
});

router.post("/", rateLimit({ windowMs: 15 * 60 * 1000, max: 8 }), async (req, res) => {
  try {
    // Joi Validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Check if user exist
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) return res.status(400).send("User already exist");

    // Create user
    user = new User(req.body);

    // Encryption to password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Saving user to db
    await user.save();

    res.status(201).send({ token: signToken(user) });
  } catch (error) {
    res.status(400).send("Error in post user");
  }
});

module.exports = router;
