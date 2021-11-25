const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    ...request.body,
    user: user.id
  })
  const blogSaved = await blog.save()

  user.blogs = user.blogs.concat(blogSaved._id)
  await User.findByIdAndUpdate(user._id, user)

  response.status(201).json({
    ...blogSaved.toJSON(),
    user: {
      id: user.id,
      name: user.name,
      username: user.username
    }
  })
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await blog.delete()
    return response.status(204).end()
  }

  response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const blog = { title, author, url, likes, user }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { name: 1, username: 1 })

  if (updatedBlog === null) {
    return response.status(404).end()
  }
  response.json(updatedBlog)
})

module.exports = blogsRouter