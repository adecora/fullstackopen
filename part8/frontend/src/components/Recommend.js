import React from 'react'

const Recommend = ({ user, recommend: { loading, data } }) => {
  const books = data.recommended

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{user.favoriteGenre}</strong></div>
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