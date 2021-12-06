import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  console.log('user', state, action)
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initialLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
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
        type: 'LOGIN',
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
    type: 'LOGOUT'
  }
}

export default loginReducer