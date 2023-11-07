import User from '../models/userModel.js'
import  { errorHandler } from '../utils/errorHandler.js'
import bycryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 10)
    const newUser = new User({ username, password: hashedPassword, email }) 
    try {
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        
    const validUser = await User.findOne({ email });
    if(!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bycryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'Wrong Password!'))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);

    } catch (error) {
        next(error);
    }
}