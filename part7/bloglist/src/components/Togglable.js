import React from 'react'
import PropTypes from 'prop-types'
import { useTogglable } from '../hooks'
import Button from 'react-bootstrap/Button'

const Togglable = (props) => {
  const togglable = useTogglable(false)

  return (
    <div>
      <div style={{ ...togglable.hideWhenVisible, marginTop: '0.83em' }}>
        <Button variant="secondary" onClick={togglable.toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={togglable.showWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={togglable.toggleVisibility}>
          cancel
        </Button>
      </div>
    </div >
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable