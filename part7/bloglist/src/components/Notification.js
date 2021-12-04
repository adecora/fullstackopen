import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)

  if (notification === null) {
    return null
  }

  const style = notification.type === 'error'
    ? { color: 'red' }
    : notification.type === 'notification'
      ? { color: 'green' }
      : { color: 'blue' }

  return (
    <div className="notification" style={style} >
      {notification.message}
    </div>
  )
}

export default Notification