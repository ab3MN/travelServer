const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const {
  _signUp,
  _logIn,
  _auth,
  _logOut,
} = require('../../controlers/userController');
const { getUserByToken } = require('../../middlewares/users/getUserByToken');

router.post('/signup', jsonParser, _signUp);

router.post('/login', jsonParser, _logIn);

router.get('/auth', getUserByToken);
router.get('/auth', _auth);

router.get('/logout', getUserByToken);
router.get('/logout', _logOut);

module.exports = router;
