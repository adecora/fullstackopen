const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')

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
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (_, args) => {
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    }
  },

  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: { $in: [root] } })
      return authorBooks.length
    }
  },

  Mutation: {
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author })

      await author.save()
      await book.save()

      return book
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name })

      author.born = args.setBornTo
      await author.save()

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })