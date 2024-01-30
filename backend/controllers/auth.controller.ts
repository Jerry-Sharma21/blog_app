import bycryptjs from 'bcryptjs';
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

  const hashedPassword = bycryptjs.hashSync(password, 10);

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
