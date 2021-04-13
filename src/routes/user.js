const express = require('express')
const router = express.Router();

const User = require('../models/user')

// Get all users
router.get('/', (req, res) => {
  User.find().then((users) => {
    return res.json({ users })
  })
    .catch((err) => {
      throw err.message
    });
})

// Get a user by ID
router.get('/:userId', (req, res) => {
  console.log(`User id: ${req.params.userId}`)
  User.findById(req.params.userId).then((user) => {
    return res.json({ user })
  })
    .catch((err) => {
      throw err.message
    });
})

// Create new user
router.post('/', (req, res) => {
  let user = new User(req.body)

  user.save().then(userResult => {
    return res.json({ user: userResult })
  }).catch((err) => {
    throw err.message
  })

  console.log(user)
})

// Update a user
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body).then((user) => {
    return res.json({ user })
  }).catch((err) => {
    throw err.message
  })
})

// Delete a user
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete(req.params.userId).then(() => {
    return res.json({
      'message': 'Successfully deleted.',
      '_id': req.params.userId
    })
  })
    .catch((err) => {
      throw err.message
    })
})


module.exports = router

