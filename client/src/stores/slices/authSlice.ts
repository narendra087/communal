import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  firstName: string
  lastName: string
  email: string
  address: string
  imgPath: string
  friends: string[]
  occupation: string
  profileViews: number
  impressions: number
}

interface IPost {
  _id: number
  userId: number
  firstName: string
  lastName: string
  address: string
  description: string
  postImgPath: string
  userImgPath: string
  likes: any
  comments: any[]
}

interface IState {
  mode: string,
  user?: IUser,
  token?: string,
  posts: IPost[]
}

const initialState: IState = {
  mode: 'light',
  user: undefined,
  token: undefined,
  posts: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_MODE: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    SET_LOGIN: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    SET_LOGOUT: (state) => {
      state.user = undefined
      state.token = undefined
    },
    SET_FRIENDS: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      }
    },
    SET_POSTS: (state, action) => {
      if (state.user) {
        state.posts = action.payload.posts
      }
    },
    UPDATE_POST: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return action.payload.post
        } else {
          return post
        }
      })
      state.posts = updatedPosts
    }
  }
})

export const {
  SET_MODE,
  SET_LOGIN,
  SET_LOGOUT,
  SET_FRIENDS,
  SET_POSTS,
  UPDATE_POST
} = authSlice.actions

export default authSlice.reducer