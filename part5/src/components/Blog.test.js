import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      id: 'blogId',
      title: 'freeCodeCamp',
      author: 'Quincy Larson',
      url: 'https://www.freecodecamp.org/',
      likes: 10,
      user: {
        id: 'userId',
        name: 'Alejandro',
        username: 'adecora'
      }
    }
  })

  test('initial rendering title and author blog info', () => {
    const component = render(
      <Blog
        blog={blog}
        username=""
        updateLike={() => { }}
        removeBlog={() => { }}
      />
    )

    const showDiv = component.container.querySelector('.showAlways')
    expect(showDiv).toBeDefined()
    expect(showDiv).toHaveTextContent('freeCodeCamp Quincy Larson')

    const hideDiv = component.container.querySelector('.showWhenDetail')
    expect(hideDiv).toHaveStyle('display: none')
  })

  test('after cliking the button, url and likes are show', () => {
    const component = render(
      <Blog
        blog={blog}
        username=""
        updateLike={() => { }}
        removeBlog={() => { }}
      />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.showWhenDetail')
    expect(div).not.toHaveStyle('display: none')
  })
})