import bycryptjs from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/user.model';

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  if (
    !userName ||
    !email ||
    !password ||
    userName === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({ message: 'All fields are required' });
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
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
