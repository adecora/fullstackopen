const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getUserId = async () => {
  const users = await User.find({})
  return users[0] || null
}

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await getUserId()

  const blog = new Blog({
    ...request.body,
    user: user.id
  })

  const blogSaved = await blog.save()

  user.blogs = user.blogs.concat(blogSaved._id)
  await User.findByIdAndUpdate(user._id, user)

  response.status(201).json(blogSaved)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = { title, author, url, likes }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter