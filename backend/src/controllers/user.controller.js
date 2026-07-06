const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followersController(req, res,) {

const followerUsername = req.user.username
const followeeUsername = req.params.username

if (followeeUsername == followerUsername){
    return res.status(400).json({
        message:"you cant follow yourself"
    })
}


const isFolloweeExists = await userModel.findOne({

    username : followeeUsername

})

if(!isFolloweeExists){
    return res.status(404).json({
        message:"user is not exist"
    })
}

const isAlreadyFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
})

if(isAlreadyFollowing){
   return res.status(200).json({
        message:`you have already followed ${followeeUsername}`,
        follow: isAlreadyFollowing
    })
}

const followRecord = await followModel.create({

    follower: followerUsername,
    followee: followeeUsername
})

res.status(201).json({ 
    message: `you're now following ${followeeUsername}`,
    follow: followRecord
})

}

async function unfollowUserController(req, res){
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  if(!isUserFollowing){
    return res.status(200).json({
        message:`${followeeUsername} is not followed by you`
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message:`you have unfollowed ${followeeUsername}`,
  })
}


module.exports = {
    followersController,
    unfollowUserController
}