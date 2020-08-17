import mongoose from '../connection';
import bcrypt from 'bcryptjs';
import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  createdAt: Date;
}

const UserSchema : Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next){
  //@ts-ignore
  const hash = await bcrypt.hash(this.password, 8);
  //@ts-ignore
  this.password = hash;

  next();
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;