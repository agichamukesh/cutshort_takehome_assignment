import {
    Ref,
    getModelForClass,
    index,
    modelOptions,
    prop,
  } from '@typegoose/typegoose';

  import { User } from './user.model'

  export enum STATUS {
    todo = 'todo',
    inprogress = 'inprogress',
    completed = 'completed'
  }
  
  @index({ user: 1 })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })
  
  // Export the TODO class to be used as TypeScript type
  export class ToDo {
    @prop({ required: true })
    title: string;
    
    @prop({ ref: () => User }) // for one
    public user: Ref<User>;

    @prop({required: true, type: String, enum: STATUS, default: 'todo'})
    status: STATUS;

  }
  
  // Create the user model from the User class
  const toDOModel = getModelForClass(ToDo);
  export default toDOModel;
  