const authorResolvers = require('./author')
const bookResolvers = require('./book')
const userResolvers = require('./user')

const resolvers = {
  Author: {
    ...authorResolvers.Author
  },

  Query: {
    ...authorResolvers.Query,
    ...bookResolvers.Query,
    ...userResolvers.Query
  },

  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation,
    ...userResolvers.Mutation
  },

  Subscription: {
    ...bookResolvers.Subscription
  }
}

module.exports = resolvers