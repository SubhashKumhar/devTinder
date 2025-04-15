import express from 'express'
import connectDB from "./config/database.js"
import User from './models/user.js'
import { validateSignupData, validateLoginData } from './validations/auth.js'
import { createPasswordHash } from './utils/common.js'

import cookieParser from 'cookie-parser';
import { userAuth } from './middlewares/auth.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
// import { autherizedMiddleware, userMiddleware } from "./middlewares/auth.js"

// app.use("/admin", autherizedMiddleware)

// app.get('/user/getAll',userMiddleware, (req, res) => {
//   // res.send('All user')
//   throw new Error()
// })

// app.get('/admin/getAllData', (req, res) => {
//   throw new Error('sfsdfs')
// })
// app.get('/admin/deleteUser', (req, res) => {
//   res.send('Deleted a user')
// })

// app.use('/', (err, req, res, next) => {
//   if(err){
//     res.status(500).send('Something went wrong!')
//   }
// })

// Get all user from database
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch {
    res.status(400).sned('Something went wrong')
  }

})

// get user by email
app.get('/user', async (req, res) => {
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
app.delete('/user', async (req, res) => {
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
app.patch('/user/:_id', async (req, res) => {
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


app.post('/signup', async (req, res) => {

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

app.post('/login', async (req, res) => {
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
// Get profile
app.get('/profile', userAuth, async (req, res) => {
  try {

    res.send(req?.user)

  }
  catch (err) {
    res.status(400).send('ERROR:' + err.message)
  }
})
connectDB().then(() => {
  console.log('Database connection successful')
  app.listen(3000, () => {
    console.log('api server running on port no: 3000')
  })
}).catch(() => {
  console.log('Database connection failed')
})
