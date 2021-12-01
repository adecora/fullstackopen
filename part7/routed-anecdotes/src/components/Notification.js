import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }


  const inlineStyle = {
    display: 'inline-block',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'red',
    padding: 5,
    marginTop: 5
  }

  return (
    <div style={inlineStyle}>
      {notification}
    </div>
  )
}

export default Notification