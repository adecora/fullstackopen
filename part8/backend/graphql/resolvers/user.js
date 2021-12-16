const { UserInputError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../../utils/config')

const User = require('../../models/user')

const resolvers = {
  Query: {
    me: (_, __, context) => context.currentUser
  },

  Mutation: {
    createUser: async (_, args) => {
      const user = new User(args)

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return user
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

module.exports = resolvers