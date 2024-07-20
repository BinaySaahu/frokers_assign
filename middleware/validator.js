const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({message:"Token not found!"});
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    res.locals.userData = {
      name: decodedToken.userName,
      email: decodedToken.email,
    };
    
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({message:"Verification failed!"});
  }
};
