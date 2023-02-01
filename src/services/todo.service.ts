import toDoModel, { ToDo } from '../models/todo.model';
const { ObjectId } = require('mongodb');


// ToDo service
export const createToDo = async (input: Partial<ToDo>, userId : any) => {
  input.user = userId;
  const toDo = await toDoModel.create(input);
  return toDo;
};

export const updateToDoDoc = async (req : any) => {
  let docId = ObjectId(req.params.id);
  let body = req.body;
  const toDo = await toDoModel.findByIdAndUpdate(docId, body, {new: true});
  return toDo;
};

export const deleteToDoDoc = async (req: any) => {
  let docId = ObjectId(req.params.id);
  const toDo = await toDoModel.findOneAndDelete(docId);
  return toDo;
};

export const getToDoDocs = async(userId: any) => {
  let results = await toDoModel.find({user : userId});
  return results;
}