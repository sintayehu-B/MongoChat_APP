const { info } = require("../logger/logger");
/**
 * The requireUser function checks if there is a user in the request and sends a 403 status code if
 * there isn't.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is an object
 * that is automatically created by the server when a request is received.
 * @param res - The `res` parameter is the response object in Express.js. It represents the HTTP
 * response that will be sent back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * @returns the result of calling the `next()` function.
 */
const requireUser = (req, res, next) => {
  const user = res.locals.user;
  //   info(user);
  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};

module.exports = requireUser;
