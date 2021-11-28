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
})