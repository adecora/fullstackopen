import React from 'react'
import { useField } from '../hooks'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = () => {
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const { reset: resetName, ...name } = useField('text')
  const { reset: resetBorn, ...born } = useField('born')

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: name.value,
        born: Number(born.value)
      }
    })

    resetName()
    resetBorn()
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input {...name} />
        </div>
        <div>
          born
          <input {...born} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )

}

export default AuthorForm