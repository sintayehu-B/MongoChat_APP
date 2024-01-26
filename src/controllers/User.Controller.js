const User = require("../models/User.model");
const moment = require("moment");
const { info, error_s, warn } = require("../logger/logger");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

/**
 * If a user is found with the same fullName, return false, otherwise return true.
 * @param fullName - The full name of the user.
 * @returns A function that takes a fullName and returns a boolean.
 */
const validate_username = async (fullName) => {
  let user = await User.findOne({ fullName });
  return user ? false : true;
};

/**
 * If a user is found with the email provided, return false, otherwise return true.
 * @param email - The email address to validate
 * @returns A boolean value.
 */
const validate_email = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

/**
 * It takes in a user's details, a role and a response object. It then validates the username and email
 * to ensure they are not taken. If they are not taken, it creates a new user and returns a response
 * object.
 * </code>
 * @param user_details - {
 * @param role - is the role of the user,
 * @param res - response object
 * @returns a promise.
 */
const user_register = async (user_details, role, res, next) => {
  try {
    let username_not_taken = await validate_username(user_details.fullName);
    if (!username_not_taken) {
      return res.status(400).json({
        message: "Username already taken.",
        success: false,
      });
    }
    //Validate email
    let email_not_taken = await validate_email(user_details.email);
    if (!email_not_taken) {
      return res.status(400).json({
        message: "email already taken.",
        success: false,
      });
    }

    //Create the User
    const new_user = new User({
      ...user_details,
      role,
    });

    let resp = await new_user.save();

    return res.status(201).json({
      message: "Registration successful.",
      success: true,
      user: serialize_user(resp),
    });
  } catch (e) {
    error_s(e);
    return res.status(500).json({
      message: `unable to create your account`,
      success: false,
    });
  }
};

/**
 * It takes a user object and returns a new object with only the properties that we want to expose to
 * the client
 * @param user - The user object that is being serialized.
 * @returns The user object is being returned.
 */
const serialize_user = (user) => {
  return {
    userType: user.userType,
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    isActive: user.isActive,
  };
};

/**
 * It takes a userId from the request params, finds the user in the database, and returns the user if
 * found, or an error if not found.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The user object
 */
const readUser = async (req, res, next) => {
  const userId = req.params.id;
  const id = mongoose.isObjectIdOrHexString(userId);

  if (!id) {
    return res.status(404).json("Unidentified ID Given");
  }
  return await User.findById(userId)
    .select("-password")
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

/**
 * It returns a promise that resolves to a user object, or rejects with an error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function to be called if the middleware function does not end the request-response
 * cycle. If the current middleware function does not end the request-response cycle, it must call
 * next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
 * @returns The user object is being returned.
 */
const readAll = async (req, res, next) => {
  return await User.find()
    .select("-password")
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

/**
 * It finds a user by id, then updates the user with the request body, then saves the user, then
 * returns the user.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The user object is being returned.
 */
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const id = mongoose.isObjectIdOrHexString(userId);

  if (!id) {
    return res.status(404).json("Unidentified ID Given");
  }
  return await User.findById(userId).then((user) => {
    if (user) {
      user.set({ ...req.body });

      return user
        .save()
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    }
  });
};

/**
 * It deletes a user from the database by the user's id.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The return statement is returning the promise from the findByIdAndDelete method.
 */
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  const id = mongoose.isObjectIdOrHexString(userId);

  if (!id) {
    return res.status(404).json("Unidentified ID Given");
  }
  return await User.findByIdAndDelete(userId)
    .then((user) => {
      user
        ? res.status(201).json({ message: "Deleted successfully." })
        : res.status(404).json({ message: "Not found." });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

/**
 * It takes in a user's id, old password, new password, and a response object. It then checks if the
 * old password matches the user's password in the database. If it does, it updates the user's password
 * with the new password. If it doesn't, it returns a 403 error
 * @param id - the id of the user
 * @param old_password - The old password of the user
 * @param password - the new password
 * @param res - response object
 * @returns a promise.
 */
const change_password = async (user_details, res) => {
  const { old_password, password } = user_details;
  const id = res.locals.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("Not Found");
    }
    let password_match = await bcrypt.compare(old_password, user.password);
    if (!password_match && password) {
      return res.status(403).json({
        message: `Incorrect Password.`,
        success: false,
      });
    } else {
      user.set({ password });

      await user.save();
      return res.status(201).json({
        message: `Password updated successfully.`,
        success: true,
      });
    }
  } catch (e) {
    error_s(e);
    return res.status(500).json({
      message: `unable to change your password.`,
      success: false,
    });
    // TODO Logging with winston
  }
};

/**
 * It checks if the user is active, if so, it sets the user to inactive and saves it to the database.
 * @param _user - is the user object that is passed to the function.
 * @param res - is the response object
 * @returns The user object is being returned.
 */
const banning_users = async (_user, res) => {
  let { id } = _user;
  try {
    const check = mongoose.isObjectIdOrHexString(id);

    if (!check) {
      return res.status(404).json("Unidentified ID Given");
    }
    const user = await User.findById(id);
    if (user) {
      if (user.isActive === true) {
        user.isActive = false;
        await user.save();
        return res.status(200).json({
          message: `Records updated to false successfully.`,
          success: true,
          user: user,
        });
      }
      user.isActive = true;
      await user.save();
      return res.status(200).json({
        message: `Records updated to true successfully.`,
        success: true,
        user: user,
      });
    }
    return res.status(404).json("User not found");
  } catch (err) {
    error_s(err);
    res.status(400).json({
      message: "Bad request",
    });
  }
};

module.exports = {
  user_register,
  serialize_user,
  readUser,
  readAll,
  updateUser,
  deleteUser,
  change_password,
  banning_users,
};
