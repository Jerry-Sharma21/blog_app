import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import User from '../models/user.model';
import { errorHandler } from '../utils/error';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userName, email, password } = req.body;

  if (
    !userName ||
    !email ||
    !password ||
    userName === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('SignUp Success');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(400, 'Invalid Credentials'));
      return;
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      next(errorHandler(400, 'Invalid Credentials'));
      return;
    }

    const token = jwt.sign(
      {
        userId: validUser._id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: '1d',
      },
    );

    const userObject = validUser.toObject();
    const { password: pass, ...rest } = userObject;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
