import { UserModel } from '../user.model';
import { TUser } from './user.interface';

// create User
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
