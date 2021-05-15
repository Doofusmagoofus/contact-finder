const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const user = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      //Check if user exists
      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }
      //Create new instance of user
      user = new User({ name, email, password });
      //Salt to encrypt password
      const salt = await bcrypt.genSalt(10);
      //Create hash version of password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User saved');
    } catch (error) {}
  }
);

module.exports = router;
