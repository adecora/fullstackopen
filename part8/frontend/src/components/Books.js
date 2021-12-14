import React, { useState } from 'react'

const Books = ({ result }) => {
  const [genre, setGenre] = useState('all genres')

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = [
    ...new Set([].concat(...result.data.books.map(b => b.genres))),
    'all genres'
  ]

  const data = genre === 'all genres'
    ? result.data.books
    : result.data.books.filter(b => b.genres.includes(genre))

  const changeGenre = ({ target }) => {
    setGenre(target.innerHTML)
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <strong>{genre}</strong></div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>author</strong>
            </td>
            <td>
              <strong>published</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={changeGenre}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books