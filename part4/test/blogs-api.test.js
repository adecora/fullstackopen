const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeAll(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.listWithBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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

test('id property is on blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('added a valid blog', async () => {
  const newBlog = {
    title: 'freeCodeCamp',
    author: 'Quincy Larson',
    url: 'https://www.freecodecamp.org/',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.listWithBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('freeCodeCamp')
})

test('blog wihout likes property, default value to 0', async () => {
  const newBlog = {
    title: 'The Odin Project',
    author: 'Erik Trautman',
    url: 'https://www.theodinproject.com/'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('missing title in blog post request', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    author: 'Quincy Larson',
    url: 'https://www.freecodecamp.org/',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('missing url in blog post request', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: 'freeCodeCamp',
    author: 'Quincy Larson',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})