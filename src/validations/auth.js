import validator from 'validator'

const validateSignupData = (req) => {
    const {firstName, lastName, email, password} = req?.body
    if(!firstName || !lastName){
        throw new Error('Enter a valid fullname')
    }else if(!email){
        throw new Error('Email is required')
    }else if(!validator.isEmail(email)){
        throw new Error('Enter a valid email address')
    }else if(!password){
        throw new Error('Password is required')
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password')
    }
}
const validateLoginData = (req) => {
    const {email, password} = req
    if(!email){
        throw new Error('Email is required')
    }else if(!validator.isEmail(email)){
        throw new Error('Enter a valid email address')
    }else if(!password){
        throw new Error('Password is required')
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password')
    }
}

export {validateSignupData, validateLoginData};