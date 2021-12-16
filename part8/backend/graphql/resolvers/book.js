const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('../../models/book')
const Author = require('../../models/author')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (_, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author')
      }

      return Book
        .find({ genres: { $in: [args.genre] } })
        .populate('author')
    }
  },

  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author })

      try {
        await author.save()
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers