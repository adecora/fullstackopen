import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const NoteForm = () => {
  const dispatch = useDispatch()

  const { reset: resetTitle, ...title } = useField('Title', 'text')
  const { reset: resetAuthor, ...author } = useField('Author', 'text')
  const { reset: resetUrl, ...url } = useField('Url', 'url')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlog(
        {
          title: title.value,
          author: author.value,
          url: url.value
        }
      )
    )

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default NoteForm