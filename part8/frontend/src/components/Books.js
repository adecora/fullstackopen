import React from 'react'

const Books = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
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
          {result.data.books.map(book => (
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

export default Books