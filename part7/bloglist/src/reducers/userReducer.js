import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  console.log('user', state, action)
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'SET_USER',
      data: user
    }
  }
}

export const logIn = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error', 3))
    }
  }
}

export const logOut = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'CLEAR_USER'
  }
}

export default userReducer