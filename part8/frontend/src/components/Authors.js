import React from 'react'
import AuthorForm from './AuthorForm'

const Authors = ({ result }) => {
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>born</strong>
            </td>
            <td>
              <strong>books</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {result.data.authors.map((author) => (
            <tr key={author.id} >
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm
        authors={result.data.authors.map(a => a.name)}
      />
    </div>
  )
}

export default Authors