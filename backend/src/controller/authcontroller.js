const bcrypt = require("bcrypt");
const User = require("../models/User")
const generateToken = require("../utils/generateToken")


const register = async (req, res) => {
   const {name , email, password } = req.body; 

   if(!name || !email || !password ) {
    return res.status(400).json({
        success:false,
        message: "All fields are required"
    })
   }

   const existingUser = await User.findOne({email});

   if ( existingUser) {
    return res.status(409).json({
        success:false,
        message:"user already registered"
    })
   }

   const hashedPassword = await bcrypt.hash(password , 10);

    const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
};

const login = async (req, res) => {

    const {email , password } = req.body;
   

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })

    }
  const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found',
            
            })
        }

  const isMatch = await bcrypt.compare(password , user.password)
  
  
  if(!isMatch){
    return res.status(401).json({
        success:false,
        message:"Invalid credentials",
    })
  }

  const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
             secure: true,
              sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
                 user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
    },
        });

};

const logout = async (req, res) => {
      res.clearCookie("token");

    res.status(200).json({
        success: true,
         secure: true,
    sameSite: "none",
        message: "Logged out successfully"
    });
};

const getCurrentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const forgotPassword = async (req,res) => {
    

}
module.exports = {
    register,
    login,
    logout,
    getCurrentUser
};