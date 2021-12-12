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