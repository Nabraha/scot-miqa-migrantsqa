const express = require("express");
const router = express.Router();
const usersDb = require("../services/database/users");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  usersDb
    .getAllUsers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

router.get("/:userId", (req, res) => {
  let id = req.params.userId;
  usersDb
    .getUserById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});
router.put(`/change-Profile-Pic`, (req, res) => {
  const { userId, newPicLink } = req.body;
  usersDb
    .changeProfilePic(newPicLink, userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

module.exports = router;
