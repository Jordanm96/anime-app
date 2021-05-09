const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const db = require('../db/connection')
const Show = require('../models/show')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylonggoodkey'

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
        const user = new User({
            username,
            email,
            password_digest
        })
        // This inserts the user into the DATABASE
        await user.save()

      const payload = {
            id: user.id,
            username: user.username,
            email: user.email
            
        }

        const token = jwt.sign(payload, TOKEN_KEY)
        res.status(201).json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        // IF THE PASSWORDS MATCH
        if (await bcrypt.compare(password, user.password_digest)) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }

            const token = jwt.sign(payload, TOKEN_KEY)
            res.status(201).json({ token })
          } else {
            // IF THE PASSWORD DOES NOT MATCH
            res.status(401).send('Invalid Credentials')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const verify =  async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, TOKEN_KEY)
        if(payload) {
            res.json(payload)
        }
    } catch (e) {
        res.status(401).send('Not Authorized')
    }
}

const changePassword = async (req, res) => { }

const addToWatchlist = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId);
    const user = await User.findById(req.params.id);
    user.watchlist.push(show);
    user.save();
    res.json({ status: "Show added to watchlist"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.watchlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const updatedWatchlist = user.watchlist.filter(show => show._id.toString() !== req.params.showId);
    user.watchlist = updatedWatchlist
    await user.save();
    res.json(user.watchlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
} 

module.exports = {
    signUp, 
    signIn,
    verify,
    changePassword,
    addToWatchlist,
    getUserWatchlist,
    deleteFromWatchlist
}