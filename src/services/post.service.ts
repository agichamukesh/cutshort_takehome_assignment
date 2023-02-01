import postModel, { Post } from '../models/post.model';
const { ObjectId } = require('mongodb');


// ToDo service
export const createPost = async (input: Partial<Post>, userId : any) => {
  input.user = userId;
  const toDo = await postModel.create(input);
  return toDo;
};

export const updatePostDoc = async (req : any) => {
  let docId = ObjectId(req.params.id);
  let body = req.body;
  const post = await postModel.findByIdAndUpdate(docId, body, {new: true});
  return post;
};

export const deletePostDoc = async (req: any) => {
  let docId = ObjectId(req.params.id);
  const post = await postModel.findByIdAndDelete(docId);
  return post;
};

export const getCommentDocs = async (req: any) => {
  let docId = ObjectId(req.params.postId);
  const post = await postModel.findById(docId).populate('comments');
  return post;
};

export const getPostDocs = async(userId: any) => {
    let results = await postModel.find({user : userId}).populate('comments');
    return results;
  }