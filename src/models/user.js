import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
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
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["men", 'female', 'others'].includes(value)) {
                throw new Error('Gender is invalid')
            }
        },
        default: "others"
    },
    skills: {
        type: Array,
    }
}, { timestamps: true })



userSchema.methods.getJWT = async function () {
    const user = this;
    
    const token = await jwt.sign({ _id: user?._id }, 'DEV@Tinder@708', { expiresIn: '1d' });
    return token;
}

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const passwordHash = user?.password
    const isPasswordValid = await bcrypt.compare(password, passwordHash)
    return isPasswordValid
}
const User = mongoose.model("User", userSchema)

export default User