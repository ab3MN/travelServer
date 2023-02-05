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
const { isUserDataEmpty } = require('../../middlewares/users/usersErrors');

/* ==================== Sign Up ==================== */
router.post('/signup', jsonParser, isUserDataEmpty);
router.post('/signup', jsonParser, _signUp);

/* ==================== Log In ==================== */
router.post('/login', jsonParser, isUserDataEmpty);
router.post('/login', _logIn);

/* ==================== Auth ==================== */
router.get('/auth', getUserByToken);
router.get('/auth', _auth);

/* ==================== Log Out ==================== */
router.get('/logout', getUserByToken);
router.get('/logout', _logOut);

module.exports = router;
