const db = require('../db/connection')
const Show = require('../models/show')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getShows = async (req, res) => {
    try {
        const show = await Show.find()
        res.json(show)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
const getShow = async (req, res) => {
  try {
      const { id } = req.params
      const show = await Show.findById(id)
      if (show) {
          return res.json(show)
      }
      res.status(404).json({ message: 'Show not found!' })
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

const createShow = async (req, res) => {
  try {
      const show = await new Show(req.body)
      await show.save()
      res.status(201).json(show)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}

const updateShow = async (req, res) => {
  const { id } = req.params
  await Show.findByIdAndUpdate(id, req.body, { new: true }, (error, show) => {
      if (error) {
          return res.status(500).json({ error: error.message })
      }
      if (!show) {
          return res.status(404).json({ message: 'Show not found!' })
      }
      res.status(200).json(show)
  })
}

const deleteShow = async (req, res) => {
  try {
      const { id } = req.params;
      const deleted = await Show.findByIdAndDelete(id)
      if (deleted) {
          return res.status(200).send("Show deleted")
      }
      throw new Error("Show not found")
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}


module.exports = {
  getShows,
  getShow,
  createShow,
  updateShow,
  deleteShow
}