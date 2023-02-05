module.exports = {
  /* ==================== Log In Error ==================== */
  userLoginError: (e, res) =>
    e._original
      ? res.status(400).json({ message: e.details[0].message })
      : res.status(401).json({ message: e.message }),

  /* ==================== Sign Up Error ==================== */
  userSignUpError: (e, res, next) =>
    e._original
      ? res.status(400).json({ message: e.details[0].message })
      : res.status(409).json({ message: e.message }),

  isUserDataEmpty: (req, res, next) => {
    if (!req.body.email)
      return res.status(401).json({ message: 'Email is required' });
    else if (!req.body.password)
      return res.status(401).json({ message: 'Password is required' });
    else next();
  },
};
