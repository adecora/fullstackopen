import React from 'react'
import PropTypes from 'prop-types'
import { useTogglable } from '../hooks'

const Togglable = (props) => {
  const togglable = useTogglable(false)

  return (
    <div>
      <div style={{ ...togglable.hideWhenVisible, marginTop: '0.83em' }}>
        <button onClick={togglable.toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={togglable.showWhenVisible}>
        {props.children}
        <button onClick={togglable.toggleVisibility}>
          cancel
        </button>
      </div>
    </div >
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable