import { UserModel } from '../user.model';
import { TUser } from './user.interface';

// create User
const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  const sendResult = await UserModel.findOne(
    { userId: result.userId },
    { password: false },
  );
  return sendResult;
};

// Get User

const getAllUserFromDB = async () => {
  const result = await UserModel.find({}, { password: 0 });
  return result;
};

// Get single User by id

const getSingleUserFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id }, { password: false });
  return result;
};

// update
const updateUserFromDB = async (id: number, userData: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: userData },
    { new: true, projection: { password: 0 } },
  );
  return result;
};

// delete
const deleteUserfromDB = async (id: number): Promise<TUser | null> => {
  const result = await UserModel.findOneAndDelete({ userId: id });
  return result;
};

// Order Update
const updateOrderFromDB = async (userId: number, userData: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: userData } },
    { new: true },
  );
  return result;
};

// find Order

const getAllOrdersSingleUser = async (userId: number) => {
  const result = await UserModel.aggregate([
    {
      $match: { userId },
    },
    { $project: { orders: true, _id: false } },
  ]);
  return result;
};

// Sum TotalPrice

const getTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { totalPrice: true, _id: false } },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserfromDB,
  updateOrderFromDB,
  getAllOrdersSingleUser,
  getTotalPrice,
};
