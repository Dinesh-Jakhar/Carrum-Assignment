const bcrypt=require("bcrypt");
const User= require("../models/User");
const jwt=require("jsonwebtoken");
require('dotenv').config();

exports.signup=async(req,res)=>{
    try {
        const {firstname,lastname,email,password,role}=req.body;
        if(!firstname||!lastname||!email||!password||!role){
          return res.status(400).json({
            success:false,
            message:'Please fill all the fields',
        });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Already Exists',
            });
        }
        let hashedPass;
        try{
            hashedPass=await bcrypt.hash(password,10);
        }
        catch{
            return res.status(500).json({
                success:false,
                message:'Error in hashing password',
            });
        }
        const user=await User.create({
            firstname,
            lastname,
            role,
            email,password:hashedPass
        })
        return res.status(200).json({
            success:true,
            message:'User Created',
        })
    } catch (error) {
       // console.error(error);
        return res.status(500).json({
            success:false,
            message:'User didnot Created',
        })
    }
}




exports.login = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Fill all the details',
      });
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not registered',
      });
    }
    

  //   if (user.role !== role) {
  //     console.log(role)
  //     return res.status(403).json({
  //         success: false,
  //         message: 'Incorrect role',
  //     });
  // }
    // Verify password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role:user.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
     // console.log('Token:', token);

      const oldUser = { ...user.toObject(), token }; // Convert Mongoose document to plain object
      oldUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: oldUser,
        message: 'User Logged In',
        role:user.role,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Password Incorrect',
      });
    }
  } catch (error) {
    console.error('Error in login:', error); // Log the error
    return res.status(500).json({
      success: false,
      message: 'Login Failure',
    });
  }
};
