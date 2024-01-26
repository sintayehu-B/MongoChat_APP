const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { omit } = require("lodash");
async function validate_password({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

async function findUser(query) {
  return User.findOne(query).lean().exec();
}

module.exports = {
  validate_password,
  findUser,
};
