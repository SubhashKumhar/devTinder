import express from "express";


import { validateSignupData, validateLoginData } from '../validations/auth.js';

import User from '../models/user.js'

import { createPasswordHash } from '../utils/common.js'

const router = express.Router()
router.post('/signup', async (req, res) => {

    try {
      validateSignupData(req)
      const { firstName, lastName, email, password } = req?.body
      const passwordHash = await createPasswordHash(password)
      const user = new User({
        firstName, lastName, email, password: passwordHash
      })
      await user.save()
      res.send("User Added Successful")
    } catch (err) {
      res.status(400).send('ERROR:' + err?.message)
    }
  
  
  })
  
  router.post('/login', async (req, res) => {
    const data = req?.body
    console.log('data', data);
  
    try {
      const { email, password } = data
      validateLoginData(data)
      const user = await User.findOne({ email })
      console.log('user', user);
  
      if (!user) {
        throw new Error('Enter a valid login details')
      }
      const isPasswordValid = await user.validatePassword(password)
      if (isPasswordValid) {
        // create a JWT token 
        const token = await user.getJWT()
  
        res.cookie('token', token)
        res.send(user)
      } else {
        throw new Error('Enter a valid login detail')
      }
  
    } catch (err) {
      res.status(400).send('ERROR:' + err.message)
    }
  })


  export default router