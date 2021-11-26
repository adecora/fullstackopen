import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const style = type === 'error'
    ? { color: 'red' }
    : type === 'notification'
      ? { color: 'green' }
      : { color: 'blue' }

  return (
    <div className="notification" style={style} >
      {message}
    </div>
  )
}

export default Notification