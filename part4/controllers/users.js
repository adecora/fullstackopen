const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const ValidationError = require('../utils/error')


const validatePassword = (password) => {
  if (password === undefined || password.length < 3) {
    return {
      status: 'BAD',
      error: password === undefined
        ? 'Password validation failed: password: Path `password` is required.'
        : `Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (3).`
    }
  }
  return { status: 'OKEY', password }
}


usersRouter.post('/', async (request, response) => {
  const { name, username } = request.body
  const password = validatePassword(request.body.password)

  if (password.status === 'BAD') {
    throw new ValidationError(password.error)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password.password, saltRounds)

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