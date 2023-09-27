import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      trim: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      trim: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      trim: true,
    },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    //   trim: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = Number(config.bcrypt_salt_rounds);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<IUser, UserModel>('User', userSchema);
