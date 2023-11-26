import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// create User
router.post('/api/users', UserController.createUser);
// get All Users
router.get('/api/users', UserController.getAllUsers);
// get Single User
router.get('/api/users/:userId', UserController.getSingleUserFromDB);
// Get User Order
router.get(
  '/api/users/:userId/orders',
  UserController.getSingleUserOrderFromDB,
);
// User Order Total Price
router.get(
  '/api/users/:userId/orders/total-price',
  UserController.getOrderTotalPriceFromDB,
);
// Put User
router.put('/api/users/:userId', UserController.updateUser);
// Put Order
router.put('/api/users/:userId/orders', UserController.updateOrder);
// delete User From DB
router.delete('/api/users/:userId', UserController.deleteUser);

export const userRoute = router;
