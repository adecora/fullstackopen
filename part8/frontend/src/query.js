import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    authors: allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    books: allBooks {
      id
      author
      genres
      published
      title
    }
  }
`