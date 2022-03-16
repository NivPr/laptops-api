const jwt = require("jsonwebtoken");
const {config} = require('../config/config.js');



exports.auth = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err_msg:"need to send token to his endpoint url"})
  }
  try{
    // Check if the token valid or expire.
    let decodeToken = jwt.verify(token, config.tokenSecret);
    req.tokenData = decodeToken;
    //End the function and go to the next one
    next()
  }
  catch(err){
    return res.status(401).json({err_msg:"Token invalid or expired"})
  }
}