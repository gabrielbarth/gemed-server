import mongoose from '../connection';
import bcrypt from 'bcryptjs';

// interface User {
//   name: string;
//   password: string;
//   createdAt: Date;
// }

const UserSchema = new mongoose.Schema({
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
  const hash = await bcrypt.hash(this.password, 8);
  this.password = hash;

  next();
})

const User = mongoose.model('User', UserSchema);

export default User;