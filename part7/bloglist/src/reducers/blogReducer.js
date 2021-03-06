import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOG':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG': {
      const id = action.data.id
      return state
        .map(blog => blog.id !== id ? blog : action.data)
    }
    case 'DELETE_BLOG': {
      const id = action.data.id
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOG',
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

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.like(id, likes)
      dispatch({
        type: 'UPDATE_BLOG',
        data: returnedBlog
      })
    } catch (error) {
      console.log(error)
      dispatch(
        setNotification(
          `Blog '${id}' was already removed from the server`,
          'error',
          3
        )
      )
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.comment(id, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data: returnedBlog
      })
    } catch (error) {
      console.log(error)
      dispatch(
        setNotification(
          `Blog '${id}' was already removed from the server`,
          'error',
          3
        )
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.statusText, 'error', 3))
    }
  }
}

export default blogReducer