import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        updateOne: true,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error('Invalid email' + vale)
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value){
            if(!["men", 'female', 'others'].includes(value)){
                throw new Error('Gender is invalid')
            }
        },
        default: "others"
    },
    skills:{
        type: Array,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User