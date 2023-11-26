import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/moduels/user/user.route';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());

// application routes

app.use('/', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Cheking!');
});
export default app;
