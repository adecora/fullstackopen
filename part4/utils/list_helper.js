const _ = require('lodash')

const dummy = (blogs) => {
  // Dummy function receive an array of blog post and returns 1
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => total + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const { title, author, likes } = blogs.find(blog => blog.likes === maxLikes)
  return {
    title,
    author,
    likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const reducer = (numberBlogs, blog) => {
    const { author } = blog
    const authorEntry = numberBlogs.find(b => b.author === author)

    if (authorEntry === undefined) {
      numberBlogs.push({
        author,
        blogs: 1
      })
    } else {
      authorEntry.blogs++
    }

    return numberBlogs
  }

  const numberBlogs = blogs.reduce(reducer, [])
  return _.maxBy(numberBlogs, 'blogs')
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}