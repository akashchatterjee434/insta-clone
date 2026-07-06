const { default: mongoose } = require("mongoose")
const mongooose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true, "user name already exist"],
        required: [true, "username is required"]
    },

    email: {
        type: String,
        unique: [true, "this email address is already exist"],
        required: [true, "email address is required"],


    },
    password: {


        type: String,
        required: [true, "password is required"]
    },

    bio: String,

    profileImage: {
        type: String,
        default:"https://ik.imagekit.io/lcloy2d9t/dp.webp",
    },

    
    

})

const userModel = mongoose.model("users",UserSchema)

module.exports = userModel