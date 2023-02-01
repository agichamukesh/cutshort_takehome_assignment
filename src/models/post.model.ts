import {
  Ref,
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';

import { User } from './user.model';
import { Comment } from './comment.model';

@index({ user: 1 })
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the TODO class to be used as TypeScript type
export class Post {
  @prop({ required: true })
  title: string;
  
  @prop({ required: true })
  body: string;

  @prop({ ref: () => User }) // for one
  public user: Ref<User>;

  @prop({ ref: () => Comment}, WhatIsIt.ARRAY)
  public comments: Ref<Comment>[];

}

// Create the user model from the User class
const postModel = getModelForClass(Post);
export default postModel;
