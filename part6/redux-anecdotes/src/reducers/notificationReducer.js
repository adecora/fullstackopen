const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })

    setTimeout(() => {
      console.log('TimeOut')
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, seconds * 1_000)
  }
}

export default notificationReducer