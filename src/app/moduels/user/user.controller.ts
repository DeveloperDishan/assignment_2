import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;
    // it will call from service
    const result = await UserServices.createUserIntoDB(UserData);

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
export const UserController = {
  createUser,
};
