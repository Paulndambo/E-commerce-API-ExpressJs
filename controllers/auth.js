const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User  = require("../models/user");

const bcrypt = require("bcryptjs");


const register = async (req, res, next) => {
    const userData = req.body

    try {
        const user = await User.create(userData)

        if(!user) {
            return res.status(400).send({"message": "Invalid Data"})
        }

        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({ token })

    } catch(err) {
        return res.send(err.message)
        next()
    }
    
};


const login = async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please Provide Email & Password!!"})
    }

    const user = await User.findOne({email})
    if(!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid Credentials"})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Incorrect Password!!"})
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: {name: `${user.first_name} ${user.last_name}`, email: user.email}, 
        token
    })
};


const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users })
}


module.exports = {
    register,
    login,
    getUsers,
}