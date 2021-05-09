const jwt = require('jsonwebtoken')
const TOKEN_KEY = 'areallylonggoodkey'
//  This is how we are doing authorization for our API
 const restrict = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const data = jwt.verify(token, TOKEN_KEY)
        // res.locals.user = data
        next()
    } catch (error) {
        res.status(403).send('Unauthorized')
    }
}

module.exports = restrict