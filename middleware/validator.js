const jwt = require("jsonwebtoken");
const HttpError = require("./../models/httpError");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new HttpError("Token not found!", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    res.locals.userData = {
      name: decodedToken.userName,
      email: decodedToken.email,
    };
    
    next();
  } catch (err) {
    const error = new HttpError("Verification failed!", 403);
    console.log(err);
    return next(error);
  }
};
