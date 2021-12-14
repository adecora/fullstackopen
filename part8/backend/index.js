const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGODB_URI, JWT_SECRET } = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')


console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })


const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (_, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author')
      }

      return Book
        .find({ genres: { $in: [args.genre] } })
        .populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (_, __, context) => context.currentUser
  },

  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root._id })
      return authorBooks.length
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

      return book
    },
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
    },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })