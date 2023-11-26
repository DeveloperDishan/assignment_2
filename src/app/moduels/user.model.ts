import { Schema, model } from 'mongoose';
import { TUser, TOrders } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const orderSchema = new Schema<TOrders>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  age: {
    type: Number,
  },

  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orders: {
    type: [orderSchema],
  },
});

// pre save middlewere hook : will work on create() save()

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const UserModel = model<TUser>('User', userSchema);
