const { ApolloServer } = require('apollo-server-express')
const app = require('express')()
const http = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { MONGODB_URI, JWT_SECRET } = require('./utils/config')

const typeDefs = require('./graphql/typeDef')
const resolvers = require('./graphql/resolvers')
const User = require('./models/user')

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

const httpServer = http.createServer(app)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: '/graphql' }
)

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [{
    async serverWillStart() {
      console.log('Sever starting up!')
      return {
        async drainServer() {
          console.log('Closing')
          subscriptionServer.close();
        }
      };
    }
  }]
})

server
  .start()
  .then(() => {
    server.applyMiddleware({ app })

    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is now running on http://localhost:${process.env.PORT}/graphql`)
    })
  })