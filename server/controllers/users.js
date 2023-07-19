import User from "../models/User.js";

// *** READ
export const getUser = async(req, res) => {
  try {
    const { id } = req.params
    
    const user = await User.findById(id)
    if (!user) return res.status(404).json({msg: 'User does not exist.'})
    
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export const getuserFriends = async(req, res) => {
  try {
    const { id } = req.params
    
    const user = await User.findById(id)
    if (!user) return res.status(404).json({msg: 'User does not exist.'})
    
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    
    const formattedFriends = friends.map(
      ({_id, firstName, lastName, occupation, address, imgPath}) => {
        return {_id, firstName, lastName, occupation, address, imgPath}
      }
    )
    
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// *** UPDATE
export const addRemoveFriend = async(req, res) => {
  try {
    const { id, friendId } = req.params
    
    const user = await User.findById(id)
    const friend = await User.findById(friendId)
    
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId)
      friend.friends = friend.friends.filter((id) => id !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }
    
    await user.save()
    await friend.save()
    
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    
    const formattedFriends = friends.map(
      ({_id, firstName, lastName, occupation, address, imgPath}) => {
        return {_id, firstName, lastName, occupation, address, imgPath}
      }
    )
    
    res.status(200).json(formattedFriends)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}