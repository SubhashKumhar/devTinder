export const autherizedMiddleware = (req, res, next) => {
    const token = "xyz"
    const isAuthorized = token === 'xyz'
    if(isAuthorized){
        next()
    }else{
        res.status(401).send('Unauthorized user')
    }
}
export const userMiddleware = (req, res, next) => {
    const token = "xyz"
    const isAuthorized = token === 'xyz'
    if(isAuthorized){
        next()
    }else{
        res.status(401).send('Unauthorized user')
    }
}
