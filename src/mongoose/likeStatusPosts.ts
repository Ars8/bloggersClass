import mongoose from 'mongoose';
import {likeStatusPostsIdType} from "../types/types";


const LikeStatusPostsIdSchema = new mongoose.Schema({
  addedAt: {
    type: String,
    required: [true, 'addedAt is required']
  },
  postId: {
    type: String,
    required: [true, 'postId is required'],
  },
  userId: {
    type: String,
    required: [true, 'userId is required'],
  },
  login: {
    type: String,
    required: [true, 'login is required']
  },
  likeStatus: {
    type: String,
    required: [true, 'likeStatus is required']
  }
})

export const MyModelLikeStatusPostsId =  mongoose.model<likeStatusPostsIdType>("likeStatusPosts", LikeStatusPostsIdSchema, 'LikeStatusPosts')
