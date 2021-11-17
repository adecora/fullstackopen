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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}