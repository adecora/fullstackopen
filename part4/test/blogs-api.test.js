const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('when there is initially some blogs saved', () => {

  beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithBlogs.length)
  })

  test('all blogs returned have and id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

})


describe('adding a new blog', () => {

  let token

  beforeAll(async () => {
    await User.deleteMany({})
    const initialUsers = await helper.initialUsers()
    await User.insertMany(initialUsers)
    const user = {
      username: initialUsers[0].username,
      password: initialUsers[0].password
    }

    const response = await api
      .post('/api/login')
      .send(user)

    token = `Bearer ${response.body.token}`
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithBlogs)
  })

  test('succed with valid data', async () => {
    const newBlog = {
      title: 'freeCodeCamp',
      author: 'Quincy Larson',
      url: 'https://www.freecodecamp.org/',
      likes: 500
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('succed without likes property, default value 0', async () => {
    const newBlog = {
      title: 'The Odin Project',
      author: 'Erik Trautman',
      url: 'https://www.theodinproject.com/'
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('fails with status code 400 if missing title', async () => {
    const newBlog = {
      author: 'Quincy Larson',
      url: 'https://www.freecodecamp.org/',
      likes: 500
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)

    expect(response.body.error).toContain('Path `title` is required')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithBlogs.length)
  })

  test('fails with status code 400 if missing url', async () => {
    const newBlog = {
      title: 'freeCodeCamp',
      author: 'Quincy Larson',
      likes: 500
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)

    expect(response.body.error).toContain('Path `url` is required')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithBlogs.length)
  })

  test('fails with status code 401 if no token is provided', async () => {
    const newBlog = {
      title: 'freeCodeCamp',
      author: 'Quincy Larson',
      url: 'https://www.freecodecamp.org/',
      likes: 500
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: null })
      .send(newBlog)
      .expect(401)

    expect(response.body.error).toContain('jwt must be provided')
  })

})


describe('deletion of a blog', () => {

  let initialUsers, token

  beforeEach(async () => {
    await Blog.deleteMany({})

    await User.deleteMany({})
    initialUsers = await helper.initialUsers()
    await User.insertMany(initialUsers)
    const user = {
      username: initialUsers[0].username,
      password: initialUsers[0].password
    }

    const response = await api
      .post('/api/login')
      .send(user)

    token = `Bearer ${response.body.token}`

    for (let blog of helper.listWithBlogs) {
      await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send({
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes
        })

    }
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if no token is provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: null })
      .expect(401)

    expect(response.body.error).toContain('jwt must be provided')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('fails with status code 401 if a user try to delete not his blog', async () => {
    const user = {
      username: initialUsers[1].username,
      password: initialUsers[1].password
    }

    const response = await api
      .post('/api/login')
      .send(user)

    const badUserToken = `Bearer ${response.body.token}`

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: badUserToken })
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

})

describe('update of a blog', () => {

  beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithBlogs)
  })


  test('succeeds updating likes if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 5
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blogToUpdate.likes + 5)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

})

describe('when there is some users saved', () => {

  let initialUsers

  beforeAll(async () => {
    await User.deleteMany({})
    initialUsers = await helper.initialUsers()
    await User.insertMany(initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

})


describe('adding a new user', () => {

  let initialUsers

  beforeEach(async () => {
    await User.deleteMany({})
    initialUsers = await helper.initialUsers()
    await User.insertMany(initialUsers)
  })

  test('succed new user', async () => {
    const newUser = {
      name: 'developer',
      username: 'dev',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with status code 400 if missing username', async () => {
    const newUser = {
      name: 'developer',
      password: '12345'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Path `username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('fails with status code 400 if missing password', async () => {
    const newUser = {
      name: 'developer',
      username: 'dev'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Path `password` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('fails with status code 400 if username is shorter than 3 characters long', async () => {
    const newUser = {
      name: 'developer',
      username: 'de',
      password: '12345'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain(`Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

  test('fails with status code 400 if password is shorter than 3 characters long', async () => {
    const newUser = {
      name: 'developer',
      username: 'dev',
      password: '12'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain(`Path \`password\` (\`${newUser.password}\`) is shorter than the minimum allowed length (3).`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })

})


describe('user login', () => {

  let initialUsers

  beforeAll(async () => {
    await User.deleteMany({})
    initialUsers = await helper.initialUsers()
    await User.insertMany(initialUsers)
  })

  test('succeed login', async () => {
    const loginUser = {
      username: initialUsers[0].username,
      password: initialUsers[0].password
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)

    expect(response.body).toHaveProperty('token')
  })

  test('fails with status code 401 if username is not valid', async () => {
    const loginUser = {
      username: `${initialUsers[0].username}_invalid`,
      password: initialUsers[0].password
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)

    expect(response.body.error).toBe('invalid username')
  })

  test('fails with status code 401 if password is not valid', async () => {
    const loginUser = {
      username: initialUsers[0].username,
      password: `${initialUsers[0].password}_invalid`
    }

    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)

    expect(response.body.error).toBe('invalid password')
  })
})


afterAll(() => {
  mongoose.connection.close()
})