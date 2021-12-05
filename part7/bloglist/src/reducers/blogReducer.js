import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('blog', state, action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'CREATE_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(blog)

      dispatch({
        type: 'CREATE_BLOG',
        data: returnedBlog
      })
      dispatch(
        setNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'notification',
          3
        )
      )
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error, 'error', 3))
    }
  }
}

export default blogReducer