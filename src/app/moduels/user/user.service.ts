import { UserModel } from '../user.model';
import { TUser } from './user.interface';

// create User
const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const result = await UserModel.create(userData);
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

// update
const updateUserFromDB = async (
  id: string,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: userData },
    { new: true },
  );
  return result;
};

// delete
const deleteUserfromDB = async (id: string): Promise<TUser | null> => {
  const result = await UserModel.findOneAndDelete({ userId: id });
  return result;
};

const updateOrderFromDB = async (userId: string, userData: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: userData } },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserfromDB,
  updateOrderFromDB,
};
