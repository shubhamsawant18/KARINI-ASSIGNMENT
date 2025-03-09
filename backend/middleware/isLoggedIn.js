
const jwt = require('jsonwebtoken');


const validateToken = async (req, res, next) => {
  try{
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
     
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401);
          throw new Error("Unauthorized user");
        }
   
        req.user = decoded;
        next();
      });
    }
    else {
      res.status(401);
      throw new Error("Access denied : No token provided");
    }
  }catch(e){
   console.log(e);
   next();
  }
}
module.exports = validateToken;