import { randomUUID } from 'crypto';
import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const message = model<IMessage>('message', messageSchema);

export default message;
