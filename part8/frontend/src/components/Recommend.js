import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { GENRE_BOOKS } from '../queries'

const Recommend = ({ user: { favoriteGenre } }) => {
  const [loadBooks, { loading, data }] = useLazyQuery(GENRE_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    loadBooks({
      variables: { genre: favoriteGenre }
    })
  }, [loadBooks, favoriteGenre])

  useEffect(() => {
    if (data) {
      setBooks(data.recommended)
    }
  }, [data])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{favoriteGenre}</strong></div>
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
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend