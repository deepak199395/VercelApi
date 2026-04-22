const express = require("express");
const router = express.Router();

// Session check route
router.get("/session/check", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Protected route
router.get("/protected", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome back, ${req.session.user.name}`);
  } else {
    res.status(401).send("Unauthorized access");
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.send("Logged out successfully");
  });
});

module.exports = router;
