import { ALL_AUTHORS, ALL_BOOKS, GENRE_BOOKS } from '../queries'

const updateCache = (client, user) => {
  return (addedBook) => {
    const includedIn = (set, object) =>
      set.includes(object)

    const authorInStore = client.readQuery({ query: ALL_AUTHORS })
    const bookInStore = client.readQuery({ query: ALL_BOOKS })
    const recommendInStore = client.readQuery(
      { query: GENRE_BOOKS, variables: { genre: user.favoriteGenre } }
    )

    if (!includedIn(
      authorInStore.authors.map(a => a.id),
      addedBook.author.id
    )) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          authors: authorInStore.authors.concat(addedBook.author)
        }
      })
    }

    if (!includedIn(
      bookInStore.books.map(b => b.id),
      addedBook.id
    )) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          books: bookInStore.books.concat(addedBook)
        }
      })
    }

    if (user &&
      !includedIn(
        recommendInStore.recommended.map(b => b.id),
        addedBook.id
      ) &&
      includedIn(
        addedBook.genres,
        user.favoriteGenre
      )
    ) {
      client.writeQuery({
        query: GENRE_BOOKS,
        variables: { genre: user.favoriteGenre },
        data: {
          recommended: recommendInStore.recommended.concat(addedBook)
        }
      })
    }
  }
}

export default updateCache