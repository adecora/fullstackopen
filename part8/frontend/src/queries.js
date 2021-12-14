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
      author {
        name
        born
        bookCount
      }
      genres
      published
      title
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
    ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
      ) {
        author
        genres
        id
        published
        title
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
    ) {
    editAuthor(
      name: $name 
      setBornTo: $born
    ) {
      name
      born
      id
      bookCount
    }
  }
`