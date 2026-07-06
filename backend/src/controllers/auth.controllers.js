const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


async function registerController (req, res){

    const { email, username, password, bio, profileImage } = req.body

    // const isUserExistByEmail = await userModel.findOne({ email })

    // if (isUserExistByEmail) {
    //     return res.status(409).json({
    //         message: " Entered email is already exist",
    //     })
    // }

    // const isUserExistByUserName = await userModel.findOne({ username })

    // if (isUserExistByUserName) {
    //     return res.status(409).json({
    //         message: "Entered username is already exist"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]

    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user is already exists" + (isUserAlreadyExists.email == email ? "email Already exists " : "Username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10) // bycryptjs install krta hain uske baad yeh hash banadeta hain pass ko 10 means kitni br hash main convert kr rha hain
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })
    /* 
    -user ka data hona chahihiye 
    -or data should be unique
    */
    const token = jwt.sign({

        id: user._id,
        username: user.username

    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController (req, res){

    const { username, email, password } = req.body
    /*
    ->username 
    ->password
    
    ->email
    ->password
    */

    const user = await userModel.findOne({
        $or: [
            {

                username: username


            },
            {

                email: email

            }
        ]
    })

    if(!user){
        return res.status(404).json({

            message : "user not found"
        })
    }

 

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){

        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign(
        {id:user._id , username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            email: user.email,
            bio:user.bio
        }
    })
}

module.exports = {
    registerController,
    loginController
}