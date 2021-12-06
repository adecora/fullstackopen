import { useState } from 'react'

export const useField = (name, type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    name,
    type,
    value,
    onChange,
    reset
  }
}

export const useTogglable = (initial) => {
  const [value, setValue] = useState(initial)

  const hideWhenVisible = { display: value ? 'none' : '' }
  const showWhenVisible = { display: value ? '' : 'none' }

  const toggleVisibility = () => {
    setValue(!value)
  }

  return {
    value,
    hideWhenVisible,
    showWhenVisible,
    toggleVisibility
  }
}