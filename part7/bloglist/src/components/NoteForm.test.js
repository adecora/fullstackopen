import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm />', () => {
  const createBlog = jest.fn()
  const component = render(
    <NoteForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('[name="Title"]')
  const author = component.container.querySelector('[name="Author"]')
  const url = component.container.querySelector('[name="Url"')

  fireEvent.change(title, {
    target: { value: 'freeCodeCamp' }
  })
  fireEvent.change(author, {
    target: { value: 'Quincy Larson' }
  })
  fireEvent.change(url, {
    target: { value: 'https://www.freecodecamp.org/' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('freeCodeCamp')
  expect(createBlog.mock.calls[0][0].author).toBe('Quincy Larson')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.freecodecamp.org/')
})