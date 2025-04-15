import bcrypt from 'bcrypt'

const createPasswordHash = async (password) => {
    console.log('password', password);

    return await bcrypt.hash(password, 10)
}

export { createPasswordHash }