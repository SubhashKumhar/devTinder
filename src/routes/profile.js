import express from "express";
import User from '../models/user.js'
import { userAuth } from '../middlewares/auth.js'

const router = express.Router()

// Get all user from database
router.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch {
        res.status(400).sned('Something went wrong')
    }

})

// get user by email
router.get('/user', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await User.find({ email: userEmail })
        if (users.length === 0) {
            res.status(404).send('User not found')
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send('Something went wrong')
    }
})

// Get users by id and delete
router.delete('/user', async (req, res) => {
    const _id = req.body._id
    try {
        const user = await User.findByIdAndDelete(_id)
        console.log('user', user);
        if (user) {
            res.send('User deleted successful')
        } else {
            res.status(400).send('User not found')
        }
    } catch {
        res.status(400).send('Something went found')
    }
})

// Get users by id and update
router.patch('/user/:_id', async (req, res) => {
    const _id = req.params?._id
    const body = req.body
    try {
        const ALLOWED_UPDATE = ['firstName', 'lastName', 'age', 'gender', 'skills']
        const isAllowedUpdation = Object.keys(body).every((key) => ALLOWED_UPDATE.includes(key))
        console.log('isAllowedUpdation', isAllowedUpdation);

        if (!isAllowedUpdation) {
            throw new Error('updation failed')
        }
        if (body?.skills?.length > 10) {
            throw new Error('skills should not be morethan 10')
        }
        const user = await User.findByIdAndUpdate(_id, body, {
            runValidators: true
        })
        console.log('user', user);
        if (user) {
            res.send('User update successful')
        } else {
            res.status(400).send('User not found')
        }
    } catch (err) {
        res.status(400).send('UPDATE FAILED:' + err?.message)
    }
})



// Get profile
router.get('/profile', userAuth, async (req, res) => {
    try {

        res.send(req?.user)

    }
    catch (err) {
        res.status(400).send('ERROR:' + err.message)
    }
})

export default router