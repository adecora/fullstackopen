const { UserInputError, AuthenticationError } = require('apollo-server-express')

const Book = require('../../models/book')
const Author = require('../../models/author')

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => {
      return Author.find({})
    },
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },

  Mutation: {
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      try {
        author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    }
  }
}

module.exports = resolvers