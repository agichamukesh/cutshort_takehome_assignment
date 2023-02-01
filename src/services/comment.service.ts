import commentModel, { Comment } from '../models/comment.model';
import postModel from '../models/post.model';

const { ObjectId } = require('mongodb');


// ToDo service
export const createComment = async (input: Partial<Comment>, postId: any,userId : any) => {
  input.user = userId;
  input.post = postId;
  const comment = await commentModel.create(input);
  const post = await postModel.findByIdAndUpdate(postId, {$push : {comments : comment._id}}, {new: true});
  return comment;
};