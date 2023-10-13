const JWT = require("jsonwebtoken");
const User = require("../model/User");
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token,"token")

    const data = JWT.verify(token, process.env.Server_Secret);

    const user = await User.findById(data.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
        success:false,
        message:`${error.message}`,
        response:[],
        error:error
    })
  }
};



module.exports = {
  isAuthenticated
};