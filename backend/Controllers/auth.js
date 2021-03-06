const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get(
  '/steam',
  passport.authenticate('steam', { session: false }),
  (req, res) => {}
);

router.get(
  '/steam/return',
  passport.authenticate('steam', { session: false }),
  (req, res) => {
    console.log('>>>>> LOGGED IN ', req.user);
    const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY, {
      expiresIn: '2h',
    });
    res.render('authenticated', {
      jwtToken: token,
      clientUrl: process.env.FRONTEND_URL,
      userId: req.user._id,
    });
  }
);

module.exports = router;
