import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });
import authRouter from './authRoutes/authRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// if (process.env.NODE_ENV === 'production') {
//     app.get('/', (req, res) => {
//         return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
//         });
// };
//app.use('/', express.static(path.join(__dirname, '../src/index.html')))

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/auth', authRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@immersive.wo6r5.mongodb.net/topic?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('db connected!!!!!');
  })
  .catch((err) => {
    console.error(err.message);
  });

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

export default app;
