
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  if (props.notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification.message
})

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification