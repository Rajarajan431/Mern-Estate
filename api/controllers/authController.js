import User from '../models/userModel.js'
import bycryptjs from 'bcryptjs'

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