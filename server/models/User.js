import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 16,
    },
    imgPath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
      default: '',
      max: 100,
    },
    occupation: String,
    profileViews: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
export default User