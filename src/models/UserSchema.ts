import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  userid: string;
  name: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true },
);

const user = model<IUser>('user', userSchema);

export default user;
