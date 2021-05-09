const { Router } = require('express')
const controllers = require('../controllers/users')

const router = Router()

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)
router.get('/verify', controllers.verify)
router.post('/change-password', controllers.changePassword)
router.put('/users/:id/add-to-watchlist/:showId', controllers.addToWatchlist)
router.delete('/users/:id/remove-from-watchlist/:showId', controllers.deleteFromWatchlist)
// Grab a specific user so we can access their watchlist array and display their shows
router.get('/users/:id', controllers.getUserWatchlist)
module.exports = router