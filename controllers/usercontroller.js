// const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UniqueConstraintError} = require('sequelize/lib/errors');
const {roles} = require('../roles');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
    
// async function validatePassword(plainPassword, hashedPassword) {
//     return await bcrypt.compare(plainPassword, hashedPassword);
// }
    
exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: error
            })
        }
    }
}

exports.login = async (req, res) => {
    let {email, password} = req.body;
    try {
        let loginUser = await User.findOne({
            where: { email }
        })

        if(loginUser && await bcrypt.compare(password, loginUser.password)) {

            const accessToken = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: '1d'})

            res.status(200).json({
                message: 'Login succeeded!',
                user: loginUser,
                accessToken
            })
        } else {
            res.status(401).json({
                message: 'Login failed.'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
    
exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}