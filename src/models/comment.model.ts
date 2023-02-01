import {
    Ref,
    getModelForClass,
    index,
    modelOptions,
    prop,
  } from '@typegoose/typegoose';
  
  import { User } from './user.model'
  import { Post } from './post.model'

  @index({ user: 1 })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })
  
  // Export the TODO class to be used as TypeScript type
  export class Comment {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    email: string;
    
    @prop({ required: true })
    body: string;
  
    @prop({ ref: () => User }) // for one
    public user: Ref<User>;
  
    @prop({ ref: () => User }) // for one
    public post: Ref<Post>;
  
  }
  
  // Create the user model from the User class
  const commentModel = getModelForClass(Comment);
  export default commentModel;
  