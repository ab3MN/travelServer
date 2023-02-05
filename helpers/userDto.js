module.exports = {
  userDto: ({ email, _id, avatar }) => ({
    email,
    id: _id,
    avatar,
  }),
};
