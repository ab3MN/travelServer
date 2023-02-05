const { signUp, logIn } = require('../services/users/userServices');
const { getUserWithToken } = require('../middlewares/users/getUserWithToken');

const {
  userSignUpError,
  userLoginError,
} = require('../middlewares/users/usersErrors');

/* ==================== Sign Up ==================== */
const _signUp = async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    user.save();

    const userWithTokens = await getUserWithToken(res, user);

    return res
      .send({
        ...userWithTokens,
      })
      .status(201);
  } catch (e) {
    userSignUpError(e, res);
    next(e);
  }
};

/* ==================== Log In ==================== */
const _logIn = async (req, res, next) => {
  try {
    const user = await logIn(req.body);
    const userWithTokens = await getUserWithToken(res, user);

    return res.send({
      ...userWithTokens,
    });
  } catch (e) {
    userLoginError(e, res);
    next(e);
  }
};

/* ==================== Auth ==================== */
const _auth = async (req, res, next) => {
  try {
    req.user
      ? res.send(req.user)
      : res.status(401).json({
          message: 'Not authorized',
        });
  } catch (e) {
    next(e);
  }
};

/* ==================== Log Out ==================== */
const _logOut = async (req, res, next) => {
  try {
    if (req.user) {
      require('../services/tokens/tokenServices').deleteToken(req.user.id);
      res.clearCookie('token');
      return res.sendStatus(204);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  _signUp,
  _logIn,
  _auth,
  _logOut,
};
