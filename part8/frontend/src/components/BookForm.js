import React, { useState } from 'react'
import { useField } from '../hooks'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, GENRE_BOOKS } from '../queries'

const BookForm = ({ user }) => {
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.error(error)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({
        query: GENRE_BOOKS,
        variables: { genre: user.favoriteGenre }
      })

      store.writeQuery({
        query: GENRE_BOOKS,
        variables: { genre: user.favoriteGenre },
        data: {
          ...dataInStore,
          recommended: [...dataInStore.recommended, response.data.addBook]
        }
      })
    }
  })

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetPublished, ...published } = useField('text')
  const { reset: resetGenre, ...genre } = useField('text')

  const [genres, setGenres] = useState([])

  const addGenre = (event) => {
    event.preventDefault()

    setGenres([...genres, genre.value])
    resetGenre()
  }

  const submit = (event) => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      }
    })

    resetTitle()
    resetAuthor()
    resetPublished()
    resetGenre()
    setGenres([])
  }

  return (
    <div>
      <h2>book form</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre}>add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default BookForm