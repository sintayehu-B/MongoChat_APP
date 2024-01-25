const jwt = require("jsonwebtoken");
const { error_s } = require("../logger/logger");
const { accessToken, refreshToken } = require();

function signJwt(object, options) {
  return jwt.sign(object, accessToken || refreshToken, {
    ...(options && options),
    algorithm: "HS256",
  });
}

function verifyJwt(token) {
  console.log({ token });
  try {
    const decoded = jwt.verify(token, accessToken || refreshToken);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    error_s(error.message);
    return {
      valid: false,
      expired: error.message === "Jwt expired",
      decoded: null,
    };
  }
}

module.exports = {
  signJwt,
  verifyJwt,
};
