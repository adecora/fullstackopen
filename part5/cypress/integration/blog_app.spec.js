describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http:localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is show', function () {
    cy.contains('log in to application')

    cy.get('[name="Username"]')
    cy.get('[name="Password"]')

    cy.contains('login')
  })
})