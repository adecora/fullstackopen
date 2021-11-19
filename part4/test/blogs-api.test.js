const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeAll(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithBlogs)
})


describe('when there is initially some blogs saved', () => {

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

  test('succed with valid data', async () => {
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

  test('succed without likes property, default value 0', async () => {
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

  test('fails with status code 400 if missing title', async () => {
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

  test('fails with status code 400 if missing url', async () => {
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

})


describe('deletion of a blog', () => {

  test('suecceeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

})

describe('update of a blog', () => {

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
  })

})

afterAll(() => {
  mongoose.connection.close()
})