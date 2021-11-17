const dummy = (blogs) => {
  // Dummy function receive an array of blog post and returns 1
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => total + blog.likes

  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}