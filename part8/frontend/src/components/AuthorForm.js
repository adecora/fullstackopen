import React, { useState } from 'react'
import { useField } from '../hooks'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const initialName = authors[0]

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState(initialName)
  const { reset: resetBorn, ...born } = useField('text')

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name,
        born: Number(born.value)
      }
    })

    setName(initialName)
    resetBorn()
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          )
          )}
        </select>
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