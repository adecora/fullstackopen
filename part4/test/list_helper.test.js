const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)

    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithBlogs)

    expect(result).toBe(36)
  })
})


describe('favorite blog', () => {

  test('of empty list is an empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when a list has only one blog, this is the favorite one', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)

    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is the right one', () => {
    const result = listHelper.favoriteBlog(helper.listWithBlogs)

    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})


describe('most blogs', () => {

  test('of an empty list is an empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when a list has only one blog, this author is the one with most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is the one with most entries', () => {
    const result = listHelper.mostBlogs(helper.listWithBlogs)

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})


describe('most likes', () => {

  test('of an empty list is an empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when a list has only one blog, this author is the one with most likes', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is the one with most total likes', () => {
    const result = listHelper.mostLikes(helper.listWithBlogs)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})