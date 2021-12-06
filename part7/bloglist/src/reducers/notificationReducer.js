const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timer = null

export const setNotification = (message, type, seconds) => {
  return (dispatch) => {
    if (timer) {
      console.timeEnd('notification screen time')
      clearTimeout(timer)
    }

    console.time('notification screen time')

    timer = setTimeout(() => {
      console.timeEnd('notification screen time')
      timer = null
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type
      }
    })
  }
}

export default notificationReducer