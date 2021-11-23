import React from 'react'
const NoteForm = ({
  onSubmit,
  title,
  onChangeTitle,
  author,
  onChangeAuthor,
  url,
  onChangeUrl
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={onChangeTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={onChangeAuthor}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={onChangeUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NoteForm