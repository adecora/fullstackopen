describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alejandro',
      username: 'adecora',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is show', function () {
    cy.contains('log in to application')

    cy.get('[name="Username"]')
    cy.get('[name="Password"]')

    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[name="Username"]').type('adecora')
      cy.get('[name="Password"]').type('12345')
      cy.contains('login').click()

      cy.contains('Alejandro logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="Username"]').type('adecora')
      cy.get('[name="Password"]').type('wrong')
      cy.contains('login').click()

      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'adecora',
        password: '12345'
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('[name="Title"]').type('freeCodeCamp')
      cy.get('[name="Author"]').type('Quincy Larson')
      cy.get('[name="Url"]').type('https://www.freecodecamp.org/')
      cy.get('#create-blog').click()

      cy.contains('a new blog freeCodeCamp by Quincy Larson added')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.showAlways')
        .should('contain', 'freeCodeCamp Quincy Larson')

      cy.get('.showWhenDetail')
        .should('contain', 'https://www.freecodecamp.org/')
        .should('contain', 'Alejandro')
    })
  })
})