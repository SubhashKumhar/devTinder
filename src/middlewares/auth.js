import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const autherizedMiddleware = (req, res, next) => {
    const token = "xyz"
    const isAuthorized = token === 'xyz'
    if (isAuthorized) {
        next()
    } else {
        res.status(401).send('Unauthorized user')
    }
}
export const userMiddleware = (req, res, next) => {
    const token = "xyz"
    const isAuthorized = token === 'xyz'
    if (isAuthorized) {
        next()
    } else {
        res.status(401).send('Unauthorized user')
    }
}

export const userAuth = async (req, res, next) => {
    try {
        const cookie = req?.cookies
        if (!cookie?.token) {
            throw new Error('Token is not valid')
        }
        const decode = await jwt.verify(cookie?.token, 'DEV@Tinder@708')
        const { _id } = decode
        const user = await User.findById(_id)

        if (!user) {
            throw new Error('User not found')
        }
        req.user = user
        next()
    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message)
    }
}
