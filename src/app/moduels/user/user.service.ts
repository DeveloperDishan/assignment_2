import { UserModel } from '../user.model';
import { TUser } from './user.interface';

// create User
const createUserIntoDB = async (user: TUser): Promise<TUser> => {
  const result = await UserModel.create(user);
  return result;
};

// Get User

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// Get single User by id

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserFromDB = async (
  id: string,
  user: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: user },
    { new: true },
  );
  return result;
};

const deleteUserfromDB = async (id: string): Promise<TUser | null> => {
  const result = await UserModel.findOneAndDelete({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserfromDB,
};
