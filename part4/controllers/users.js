const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const result = await user.save()
  response.status(201).json(result)
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter