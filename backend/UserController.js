const User = require("./model/User");
const Register = async (req, res, next) => {
  try { 
    console.log("hi");
        const {email}=req.body;
        const user=await User.findOne({email});
        
        
        if(user) {
          throw new Error("use already existed");
        }
    const response = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: "user is succesfully registered",
      response: response,
      error: {},
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};
const Login = async (req, res, next) => {
  try {
    const data = req.body;
    const { password, email } = data;

    if (!email || !password) throw new Error("please provide email or password");
    const response = await User.findOne({ email }); 
    if (!response) throw new Error("please provide correct email");
    const isPasswordMatch = await response.comparePassword(password);
    if (!isPasswordMatch) throw new Error("please provide correct password");
    const token = response.genToken();

    const { name,notes } = response;
    const user = {
      name,
      email: response.email,
      notes:notes
    };
    const option = {
      expires: new Date(
        Date.now() + process.env.Expire_Cokies * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res.status(200).cookie("token", token, option).json({
      success: true,
      message: "user is succesfully login",
      response: user,
      token: token,
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};
const LogOut = async (req, res, next) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    return res.status(201).cookie("token", null, option).json({
      success: true,
      message: "user is succesfully loggedout",
      error: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
};

const loadUser = async (req, res, next) => {
try{
  const { _id } = req.user;
  const user = await User.findById(_id);

    return res.status(200).json({
      success:true,
      message:"fetch all post",
      response:user
    });
}
catch(error){
  return res.status(400).json({
    success: false,
    message: `${error.message}`,
    response: [],
    error: error,
  });
}
};
const NotesAdd=async(req,res,next)=>{
// try{
//   // const response=await User.create()
// }
}
const NotesDelete=async(req,res,next)=>{
  try{
    const {id}=req.params;
  const {_id}=req.user;
  const user=await User.findById(_id);

 const temp= user.notes.filter(obj=>obj._id!=id);
  user.notes=temp;
  user.save();
  return res.status(200).json({
    success: true,
    message: ``,
    response: [],
    error: {},
  });
  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
}

const NotesCreate=async(req,res,next)=>{
  
  const {title,description}=req.body;
  const { _id } = req.user;
  const user=await User.findById(_id);
      console.log(user,"user")
  if(req.body.id==2){
    user.notes.push(req.body);
  }
  else{
    user.notes.findByIdAndUpdate(id,{title,description});
  }
      user.save();
      return res.status(201).json({
        success: true,
        message: "Note created",
        error: {},
      });
}
const Notefetch=async(req,res,next)=>{
  try{   
    
  
    
  }
  catch(error){
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }

}

const NotesUpdate=async(req,res)=>{
  try{
    const {id}=req.params;
  const {title,description}=req.body
  const {_id}=req.user;
  const user=await User.findById(_id);
    const index=user.notes.findIndex(obj=>obj._id==id)
    user.notes[index]={
      ...user.notes[index],title,description
    }
    user.save();
    
    return res.status(201).json({
      success: true,
      message: "Note created",
      error: {},
    });
  }
  catch(error){
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
      response: [],
      error: error,
    });
  }
}
const GetNotes=async(req,res)=>{
  try{
    const {id}=req.params;
  const {_id}=req.user;
  const user=await User.findById(_id);
    const response=user.notes.filter(obj=>obj._id==id)

    return res.status(200).json({
      success:true,
      response,
      error:{},
      message:"successfully "
    })
    }
    catch(error){
      return res.status(400).json({
        success: false,
        message: `${error.message}`,
        response: [],
        error: error,
      });
    }
    
   
}
module.exports = {
  LogOut,
  NotesAdd,
  NotesDelete,
  NotesCreate,
  Notefetch,
  NotesUpdate,
  GetNotes,
  Login,
  Register,
  loadUser,
};
