const initialNotification = {
  message: null,
  timer: null
}

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return initialNotification
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return (dispatch, getState) => {
    const notification = getState().notification

    if (notification.timer !== null) {
      clearTimeout(notification.timer)
    }

    const timer = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, seconds * 1_000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        timer
      }
    })
  }
}

export default notificationReducer