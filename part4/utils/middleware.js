const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')

  request.token = authorization && authorization.toLowerCase().startsWith('bearer')
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (request, response, next) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodeToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  request.user = await User.findById(decodeToken.id)

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}