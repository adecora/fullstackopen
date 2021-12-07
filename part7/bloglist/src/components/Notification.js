import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const variant = notification.type === 'error'
    ? 'danger'
    : notification.type === 'notification'
      ? 'success'
      : 'info'

  return (
    <Alert className="mt-2" variant={variant} >
      {notification.message}
    </Alert>
  )
}

export default Notification