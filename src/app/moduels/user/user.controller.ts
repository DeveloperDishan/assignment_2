import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;

    // data validation useing Zod

    const zodParsedData = UserValidationSchema.parse(UserData);
    // it will call from service
    const result = await UserServices.createUserIntoDB(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUserFromDB = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await UserServices.getSingleUserFromDB(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;
    const userId = req.params.userId;
    const result = await UserServices.updateUserFromDB(userId, UserData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await UserServices.deleteUserfromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;
    const userId = req.params.userId;
    const result = await UserServices.updateOrderFromDB(userId, UserData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result.orders,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUserFromDB,
  updateUser,
  deleteUser,
  updateOrder,
};
