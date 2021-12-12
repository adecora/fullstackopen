import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const reset = () => {
    setValue('')
  }

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}